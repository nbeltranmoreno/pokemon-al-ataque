import { useState } from 'react';
import { healFighter, levelUpFighter } from '../game/battle';
import { getItem } from '../data/items';

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
  storyStage: 0,
  tutorialSeen: false,
  username: ''
};

const readSave = () => {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? { ...emptySave, ...JSON.parse(raw) } : emptySave;
  } catch {
    return emptySave;
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

  // Al elegir equipo se conservan el tutorial visto y el nombre de usuario
  const startWithTeam = (team) =>
    update(prev => ({ ...emptySave, tutorialSeen: prev.tutorialSeen, username: prev.username, team }));

  const setUsername = (username) => update({ username });

  // Guardar el resultado de un combate: equipo, capturas, marcador, monedas e historia
  const finishBattle = ({ team, result, caught, ballsUsed = 0, story = false }) => {
    update(prev => {
      const won = result === 'win' || result === 'caught';
      const next = {
        ...prev,
        // En Práctica el equipo sale del combate como entró: sin daño y con los PP llenos
        team: story ? team : team.map(healFighter),
        balls: Math.max(0, prev.balls - ballsUsed),
        wins: prev.wins + (won ? 1 : 0),
        losses: prev.losses + (result === 'lose' ? 1 : 0),
        // Monedas solo en la Historia; la Práctica no da dinero
        coins: prev.coins + (story ? (won ? 60 : 5) : 0)
      };

      if (won) {
        next.balls = Math.min(MAX_BALLS, next.balls + 1);
      }

      // En la historia solo se avanza al ganar el combate del entrenador
      if (story && result === 'win') {
        next.storyStage = prev.storyStage + 1;
      }

      // El Pokémon capturado se une curado
      if (caught) {
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
      if (!item || prev.coins < item.price) return prev;

      const next = { ...prev, coins: prev.coins - item.price };

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

  const markTutorialSeen = () => update({ tutorialSeen: true });

  const resetGame = () => update(prev => ({ ...emptySave, tutorialSeen: true, username: prev.username }));

  return {
    save,
    startWithTeam,
    setUsername,
    finishBattle,
    healTeam,
    swapWithBox,
    buyItem,
    useItem,
    markTutorialSeen,
    resetGame
  };
};
