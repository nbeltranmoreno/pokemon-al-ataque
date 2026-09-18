import { useState } from 'react';
import { healFighter, levelUpFighter, gainXp } from '../game/battle';
import { getItem } from '../data/items';
import { sellPrice } from '../game/prices';
import { idleBlocks, nextCoinMark, COINS_PER_BLOCK, COIN_EVERY } from '../game/idle';
import { contadoresDelDia, buscarMision, sePuedeCobrar, hoy } from '../data/misiones';
import { precioHoy } from '../data/ofertas';

const SAVE_KEY = 'pokemonAlAtaque_partida_v1';
const MAX_TEAM = 6;
const MAX_BALLS = 20;

const emptySave = {
  team: [],
  box: [],
  wins: 0,
  losses: 0,
  balls: 10,
  coins: 50,
  inventory: {},
  caughtLog: [],
  storyStage: 0,
  tutorialSeen: false,
  username: '',
  gender: 'boy',
  creatorMode: false,
  outfit: 'clasico',
  lastCoinAt: 0, // desde cuándo se cuentan las monedas del reloj
  misiones: null, // lo que llevas hecho hoy
  storyGate: null, // descanso de la Historia: { stage, dia }
  logrosCobrados: [], // logros ya pagados
  vendidos: 0,
  comprasTotal: 0,
  diasJugados: 0,
  probadoIngles: false
};

const readSave = () => {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    const guardado = raw ? { ...emptySave, ...JSON.parse(raw) } : emptySave;
    // La primera vez el reloj de las monedas empieza ahora
    return guardado.lastCoinAt ? guardado : { ...guardado, lastCoinAt: Date.now() };
  } catch {
    return { ...emptySave, lastCoinAt: Date.now() };
  }
};

/**
 * Estado de la partida: equipo, capturados, monedas, inventario y progreso
 * Se guarda en el navegador, así que la partida sigue al volver
 */
export const useGame = () => {
  const [save, setSave] = useState(readSave);

  const update = (changes) => {
    setSave(prev => {
      const next = typeof changes === 'function' ? changes(prev) : { ...prev, ...changes };
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(next));
      } catch {
        // Si el navegador no deja guardar, al menos se juega esta sesión
      }
      return next;
    });
  };

  // Al elegir equipo se conservan el tutorial visto y el entrenador
  const startWithTeam = (team) =>
    update(prev => ({
      ...emptySave,
      lastCoinAt: Date.now(),
      tutorialSeen: prev.tutorialSeen,
      username: prev.username,
      gender: prev.gender,
      outfit: prev.outfit,
      team
    }));

  const setTrainer = (username, gender, outfit) => update({ username, gender, outfit });

  // Apuntar algo en las misiones de hoy (si cambió el día, se reinician)
  const apuntar = (prev, cambios) => {
    const dia = contadoresDelDia(prev.misiones);
    return { ...prev, misiones: { ...dia, ...cambios(dia) } };
  };

  // Al abrir el juego: marcar que hoy has entrado y contar los días distintos
  const registrarEntrada = () =>
    update(prev => {
      const esOtroDia = !prev.misiones || prev.misiones.dia !== hoy();
      if (!esOtroDia && prev.misiones.entradas > 0) return prev;

      const siguiente = apuntar(prev, () => ({ entradas: 1 }));
      return esOtroDia ? { ...siguiente, diasJugados: (prev.diasJugados || 0) + 1 } : siguiente;
    });

  // Cobrar el premio de una misión terminada
  const cobrarMision = (id) =>
    update(prev => {
      const mision = buscarMision(id);
      if (!mision || !sePuedeCobrar(prev, mision)) return prev;

      const conPremio = { ...prev, coins: prev.coins + mision.premio };
      if (mision.tipo === 'logro') {
        return { ...conPremio, logrosCobrados: [...(prev.logrosCobrados || []), id] };
      }

      const dia = contadoresDelDia(prev.misiones);
      return { ...conPremio, misiones: { ...dia, cobradas: [...dia.cobradas, id] } };
    });

  // Se ha jugado un combate online
  const notarOnline = () => update(prev => apuntar(prev, dia => ({ online: dia.online + 1 })));

  // Se ha probado el juego en inglés
  const notarIngles = () => update(prev => (prev.probadoIngles ? prev : { ...prev, probadoIngles: true }));

  // Monedas del reloj: 5 por cada 10 minutos que hayan pasado
  const payIdleCoins = () =>
    update(prev => {
      const bloques = idleBlocks(prev.lastCoinAt);
      if (bloques <= 0) return prev;

      // Los minutos también cuentan para la misión de tener el juego abierto
      const conMinutos = apuntar(prev, dia => ({ minutos: dia.minutos + (bloques * COIN_EVERY) / 60000 }));

      return {
        ...conMinutos,
        coins: prev.coins + bloques * COINS_PER_BLOCK,
        lastCoinAt: nextCoinMark(prev.lastCoinAt)
      };
    });

  // Guardar el resultado de un combate: equipo, capturas, marcador, monedas e historia
  // mode: 'story' (Historia), 'practice' (entrenamiento) o 'wild' (peleas de verdad)
  const finishBattle = ({ team, result, caught, ballsUsed = 0, mode = 'practice', xpAward = 0 }) => {
    update(prev => {
      const won = result === 'win' || result === 'caught';
      const next = {
        ...prev,
        // Historia: peleas con un Pokémon prestado, tu equipo no cambia
        // Práctica: sale exactamente como entró (ni se cura ni se hace daño)
        // Peleas: el daño y los PP gastados se quedan
        team: mode === 'story' || mode === 'practice' ? prev.team : team,
        balls: Math.max(0, prev.balls - ballsUsed),
        wins: prev.wins + (won ? 1 : 0),
        losses: prev.losses + (result === 'lose' ? 1 : 0),
        // Monedas: muchas en la Historia, unas pocas en Peleas, ninguna en Práctica
        coins: prev.coins + (mode === 'story' ? (won ? 60 : 5) : mode === 'wild' ? (won ? 15 : 2) : 0)
      };

      if (won) {
        next.balls = Math.min(MAX_BALLS, next.balls + 1);
      }

      // Para las misiones de hoy
      const dia = contadoresDelDia(prev.misiones);
      next.misiones = {
        ...dia,
        peleas: dia.peleas + (mode === 'wild' && won ? 1 : 0),
        capturas: dia.capturas + (caught ? 1 : 0),
        escenas: dia.escenas + (mode === 'story' && result === 'win' ? 1 : 0)
      };

      // Ganar en la Historia avanza el cuento y da experiencia a todo tu equipo
      if (mode === 'story' && result === 'win') {
        next.storyStage = prev.storyStage + 1;
        next.team = prev.team.map(pokemon => gainXp(pokemon, xpAward).fighter);
      }

      // El Pokémon capturado se une curado y queda apuntado en el historial
      if (caught) {
        next.caughtLog = [
          {
            speciesId: caught.speciesId,
            name: caught.name,
            level: caught.level,
            sprite: caught.sprites.front,
            at: Date.now()
          },
          ...(prev.caughtLog || [])
        ].slice(0, 200);

        if (next.team.length < MAX_TEAM) {
          next.team = [...next.team, healFighter(caught)];
        } else {
          next.box = [...next.box, healFighter(caught)];
        }
      }

      return next;
    });
  };

  const healTeam = () => update(prev => ({ ...prev, team: prev.team.map(healFighter) }));

  // Intercambiar un Pokémon del equipo por otro de la caja
  const swapWithBox = (teamUid, boxUid) => {
    update(prev => {
      const fromTeam = prev.team.find(p => p.uid === teamUid);
      const fromBox = prev.box.find(p => p.uid === boxUid);
      if (!fromTeam || !fromBox) return prev;

      return {
        ...prev,
        team: prev.team.map(p => (p.uid === teamUid ? fromBox : p)),
        box: prev.box.map(p => (p.uid === boxUid ? fromTeam : p))
      };
    });
  };

  // Comprar en la tienda: las Poké Balls van al contador, lo demás al inventario
  const buyItem = (itemId) => {
    update(prev => {
      const item = getItem(itemId);
      // Los días de oferta se paga menos
      const precio = item ? precioHoy(item.price) : 0;
      if (!item || prev.coins < precio) return prev;

      const next = { ...prev, coins: prev.coins - precio, comprasTotal: (prev.comprasTotal || 0) + 1 };

      if (item.effect === 'balls') {
        next.balls = Math.min(MAX_BALLS, prev.balls + item.amount);
      } else {
        next.inventory = { ...prev.inventory, [itemId]: (prev.inventory[itemId] || 0) + 1 };
      }

      return next;
    });
  };

  // Usar un objeto del inventario sobre un Pokémon del equipo
  const useItem = (itemId, uid) => {
    update(prev => {
      const item = getItem(itemId);
      const pokemon = prev.team.find(p => p.uid === uid);
      if (!item || !pokemon || !(prev.inventory[itemId] > 0)) return prev;

      let updated = null;

      if (item.effect === 'heal' && pokemon.hp > 0 && pokemon.hp < pokemon.maxHp) {
        updated = { ...pokemon, hp: Math.min(pokemon.maxHp, pokemon.hp + item.amount) };
      } else if (item.effect === 'full' && pokemon.hp > 0) {
        updated = healFighter(pokemon);
      } else if (item.effect === 'revive' && pokemon.hp <= 0) {
        updated = { ...pokemon, hp: Math.ceil(pokemon.maxHp / 2) };
      } else if (item.effect === 'levelup') {
        updated = levelUpFighter(pokemon);
      }

      // Si el objeto no servía para ese Pokémon, no se gasta
      if (!updated) return prev;

      return {
        ...prev,
        team: prev.team.map(p => (p.uid === uid ? updated : p)),
        inventory: { ...prev.inventory, [itemId]: prev.inventory[itemId] - 1 }
      };
    });
  };

  // Vender un Pokémon: paga según lo bueno que sea. Siempre queda al menos uno en el equipo
  const sellPokemon = (uid) => {
    update(prev => {
      const enEquipo = prev.team.find(p => p.uid === uid);
      const pokemon = enEquipo || prev.box.find(p => p.uid === uid);
      if (!pokemon) return prev;
      if (enEquipo && prev.team.length <= 1) return prev;

      return {
        ...prev,
        team: prev.team.filter(p => p.uid !== uid),
        box: prev.box.filter(p => p.uid !== uid),
        coins: prev.coins + sellPrice(pokemon),
        vendidos: (prev.vendidos || 0) + 1
      };
    });
  };

  // Comprar un Pokémon en la tienda: se paga y se une al equipo
  const buyPokemon = (fighter, price) => {
    update(prev => {
      // El precio que se ve en la tienda ya lleva el descuento del día
      const precio = precioHoy(price);
      if (prev.coins < precio) return prev;

      const next = { ...prev, coins: prev.coins - precio };
      if (next.team.length < MAX_TEAM) {
        next.team = [...next.team, fighter];
      } else {
        next.box = [...next.box, fighter];
      }
      next.caughtLog = [
        {
          speciesId: fighter.speciesId,
          name: fighter.name,
          level: fighter.level,
          sprite: fighter.sprites.front,
          at: Date.now()
        },
        ...(prev.caughtLog || [])
      ].slice(0, 200);
      return next;
    });
  };

  // Sumar o quitar monedas (apuestas de los combates Online)
  const addCoins = (amount) => update(prev => ({ ...prev, coins: Math.max(0, prev.coins + amount) }));

  // Desbloqueo secreto del modo creador (tocando la versión varias veces)
  const toggleCreatorMode = () => update(prev => ({ ...prev, creatorMode: !prev.creatorMode }));

  // Añadir un Pokémon a la colección (lo usa el botón del creador)
  const addPokemon = (fighter) => {
    update(prev => {
      const next = { ...prev };
      if (next.team.length < MAX_TEAM) {
        next.team = [...next.team, fighter];
      } else {
        next.box = [...next.box, fighter];
      }
      next.caughtLog = [
        {
          speciesId: fighter.speciesId,
          name: fighter.name,
          level: fighter.level,
          sprite: fighter.sprites.front,
          at: Date.now()
        },
        ...(prev.caughtLog || [])
      ].slice(0, 200);
      return next;
    });
  };

  // Empezar el descanso de la Historia: hasta mañana no se sigue
  const startStoryRest = (stage) => update(prev => ({ ...prev, storyGate: { stage, dia: hoy() } }));

  // Volver a empezar el cuento desde la primera escena
  const restartStory = () => update({ storyStage: 0, storyGate: null });

  // Pasar a la siguiente escena del cuento
  const advanceStory = () =>
    update(prev => {
      const conEscena = apuntar(prev, dia => ({ escenas: dia.escenas + 1 }));
      return { ...conEscena, storyStage: prev.storyStage + 1 };
    });

  // Borrar la partida entera (al cerrar sesión se empieza de cero)
  const wipeSave = () => {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      // Si el navegador no deja tocar el almacenamiento, al menos se limpia la sesión actual
    }
    setSave(emptySave);
  };

  const markTutorialSeen = () => update({ tutorialSeen: true });

  const resetGame = () =>
    update(prev => ({
      ...emptySave,
      tutorialSeen: true,
      username: prev.username,
      gender: prev.gender,
      outfit: prev.outfit,
      lastCoinAt: Date.now()
    }));

  return {
    save,
    startWithTeam,
    setTrainer,
    payIdleCoins,
    registrarEntrada,
    cobrarMision,
    notarOnline,
    notarIngles,
    finishBattle,
    healTeam,
    swapWithBox,
    buyItem,
    useItem,
    advanceStory,
    startStoryRest,
    restartStory,
    addPokemon,
    buyPokemon,
    addCoins,
    sellPokemon,
    toggleCreatorMode,
    markTutorialSeen,
    wipeSave,
    resetGame
  };
};
