import { useState, useEffect, useRef } from 'react';
import { Swords, Repeat, LogOut } from 'lucide-react';
import { loadRandomWild } from '../services/pokeapi';
import {
  createFighter,
  resolveAttack,
  chooseEnemyMove,
  speedOf,
  isFainted,
  usableMoves,
  xpReward,
  gainXp,
  catchChance,
  xpToNextLevel,
  STRUGGLE
} from '../game/battle';
import { effectivenessText } from '../data/types';
import HealthBar from './HealthBar';
import TypeBadge from './TypeBadge';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const clone = (fighter) => ({ ...fighter, moves: fighter.moves.map(move => ({ ...move })) });

/**
 * Pantalla de combate contra un Pokémon salvaje
 */
export default function BattleScreen({ team: initialTeam, balls, onFinish }) {
  const [team, setTeam] = useState(() => initialTeam.map(clone));
  const [enemy, setEnemy] = useState(null);
  const [activeIndex, setActiveIndex] = useState(() => initialTeam.findIndex(p => p.hp > 0));
  const [log, setLog] = useState([]);
  const [menu, setMenu] = useState('main'); // main | moves | team
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null); // win | lose | caught | fled
  const [caught, setCaught] = useState(null);
  const [ballsUsed, setBallsUsed] = useState(0);
  const [shake, setShake] = useState(null); // 'player' | 'enemy'
  const [popup, setPopup] = useState(null); // daño flotante: { side, amount }
  const [error, setError] = useState('');
  const loadedRef = useRef(false);

  const active = team[activeIndex];

  // Buscar un Pokémon salvaje al empezar
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const averageLevel = Math.round(initialTeam.reduce((sum, p) => sum + p.level, 0) / initialTeam.length);
    const level = Math.max(2, averageLevel + Math.floor(Math.random() * 3) - 1);

    loadRandomWild()
      .then(species => {
        const wild = createFighter(species, level);
        setEnemy(wild);
        setLog([{ text: `¡Un ${wild.name} salvaje apareció!`, side: 'info' }]);
      })
      .catch(err => {
        console.error('Error cargando el rival:', err);
        setError('No se pudo cargar el combate. Revisa tu conexión a internet.');
      });
  }, [initialTeam]);

  // side: 'me' (lo hace tu Pokémon), 'foe' (lo hace el salvaje) o 'info'
  const addLog = (message, side = 'info') => setLog(prev => [...prev.slice(-5), { text: message, side }]);

  // Un Pokémon ataca al otro; devuelve la vida que le queda al que recibe
  // targetSide dice a quién le toca recibir: 'enemy' (atacas tú) o 'player' (ataca el salvaje)
  const attack = async (attacker, defender, move, targetSide) => {
    const mine = targetSide === 'enemy'; // si el golpe va al rival, quien ataca eres tú
    const side = mine ? 'me' : 'foe';
    const attackerLabel = mine ? `Tu ${attacker.name}` : `El ${attacker.name} salvaje`;
    const defenderLabel = mine ? `El ${defender.name} salvaje` : `Tu ${defender.name}`;

    addLog(`¡${attackerLabel} usó ${move.name}!`, side);
    await delay(700);

    const hit = resolveAttack(attacker, defender, move);
    if (hit.missed) {
      addLog('¡Pero falló!', side);
      await delay(700);
      return defender.hp;
    }

    setShake(targetSide);
    setPopup({ side: targetSide, amount: hit.amount });
    setTimeout(() => setShake(null), 400);
    setTimeout(() => setPopup(null), 1000);

    const remaining = Math.max(0, defender.hp - hit.amount);
    if (hit.critical) addLog('¡Un golpe crítico!', side);
    const text = effectivenessText(hit.effectiveness);
    if (text) addLog(text, side);
    addLog(`${defenderLabel} perdió ${hit.amount} PS.`, side);

    await delay(700);
    return remaining;
  };

  const endBattle = (finalTeam, outcome, caughtPokemon = null) => {
    setResult(outcome);
    setCaught(caughtPokemon);
    setTeam(finalTeam);
  };

  // Turno completo: ataca el más rápido y después el otro
  const playTurn = async (playerMove) => {
    setBusy(true);
    setMenu('main');

    // El turno solo lleva la cuenta de la vida; al estado siempre van objetos nuevos
    const moves = playerMove.pp === Infinity
      ? active.moves
      : active.moves.map(m => (m.id === playerMove.id ? { ...m, ppLeft: m.ppLeft - 1 } : m));

    let myHp = active.hp;
    let foeHp = enemy.hp;
    const meNow = () => ({ ...active, hp: myHp, moves });
    const foeNow = () => ({ ...enemy, hp: foeHp });
    const enemyMove = chooseEnemyMove(enemy, active);

    const playerFirst = speedOf(active) >= speedOf(enemy);
    const order = playerFirst ? ['player', 'enemy'] : ['enemy', 'player'];

    // Si el salvaje es más rápido pega antes que tú: se avisa para que se entienda
    if (!playerFirst) {
      addLog(`¡El ${enemy.name} salvaje es más rápido y ataca primero!`, 'foe');
      await delay(800);
    }

    for (const side of order) {
      if (myHp <= 0 || foeHp <= 0) break;

      if (side === 'player') {
        foeHp = await attack(meNow(), foeNow(), playerMove, 'enemy');
        setEnemy(foeNow());
      } else {
        // myHp es una copia del número de PS, no el estado: el estado se actualiza abajo con un objeto nuevo
        // oxlint-disable-next-line react/immutability
        myHp = await attack(foeNow(), meNow(), enemyMove, 'player');
        setTeam(prev => prev.map((p, i) => (i === activeIndex ? meNow() : p)));
      }
    }

    // ¿Ganó el jugador?
    if (foeHp <= 0) {
      addLog(`¡${enemy.name} se debilitó!`);
      await delay(600);

      const xp = xpReward(enemy);
      const { fighter, levelsGained } = gainXp(meNow(), xp);
      addLog(`${fighter.name} ganó ${xp} puntos de experiencia.`);
      levelsGained.forEach(level => addLog(`¡${fighter.name} subió al nivel ${level}!`));

      endBattle(team.map((p, i) => (i === activeIndex ? fighter : p)), 'win');
      setBusy(false);
      return;
    }

    // ¿Se debilitó el Pokémon del jugador?
    if (myHp <= 0) {
      addLog(`¡${active.name} se debilitó!`);
      await delay(600);

      const updatedTeam = team.map((p, i) => (i === activeIndex ? meNow() : p));
      const next = updatedTeam.findIndex(p => p.hp > 0);

      if (next === -1) {
        addLog('¡No te quedan Pokémon en pie!');
        endBattle(updatedTeam, 'lose');
      } else {
        setTeam(updatedTeam);
        setMenu('team');
        addLog('Elige otro Pokémon.');
      }
      setBusy(false);
      return;
    }

    setBusy(false);
  };

  const switchTo = async (index) => {
    if (index === activeIndex || team[index].hp <= 0) return;
    setBusy(true);
    setMenu('main');
    setActiveIndex(index);
    addLog(`¡Adelante, ${team[index].name}!`);
    await delay(600);
    setBusy(false);
  };

  const throwBall = async () => {
    if (balls - ballsUsed <= 0) {
      addLog('¡No te quedan Poké Balls!');
      return;
    }

    setBusy(true);
    setMenu('main');
    setBallsUsed(used => used + 1);
    addLog('¡Lanzaste una Poké Ball!');
    await delay(900);

    if (Math.random() < catchChance(enemy)) {
      addLog(`¡Atrapaste a ${enemy.name}!`);
      endBattle(team, 'caught', enemy);
      setBusy(false);
      return;
    }

    addLog(`¡Oh no! ${enemy.name} se escapó de la Poké Ball.`);
    await delay(700);

    // El rival aprovecha el turno para atacar
    const enemyMove = chooseEnemyMove(enemy, active);
    const remaining = await attack(enemy, active, enemyMove, 'player');
    const me = { ...active, hp: remaining };
    const updatedTeam = team.map((p, i) => (i === activeIndex ? me : p));
    setTeam(updatedTeam);

    if (isFainted(me)) {
      addLog(`¡${me.name} se debilitó!`);
      const next = updatedTeam.findIndex(p => p.hp > 0);
      if (next === -1) {
        endBattle(updatedTeam, 'lose');
      } else {
        setMenu('team');
      }
    }

    setBusy(false);
  };

  const flee = () => {
    addLog('Huiste del combate.');
    endBattle(team, 'fled');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-800 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-white/15 backdrop-blur rounded-3xl p-8 text-center border-2 border-white/20 max-w-sm">
          <p className="text-5xl mb-3">📡</p>
          <p className="text-white font-bold text-lg mb-4">{error}</p>
          <button
            onClick={() => onFinish({ team, result: 'fled', caught: null, ballsUsed })}
            className="bg-white text-blue-800 font-black px-6 py-3 rounded-2xl shadow-xl hover:scale-105 transition"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  if (!enemy || !active) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-800 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-3">⚡</div>
          <p className="text-white font-bold text-xl">Buscando rival...</p>
        </div>
      </div>
    );
  }

  const ballsLeft = balls - ballsUsed;
  const moves = usableMoves(active).length > 0 ? active.moves : [{ ...STRUGGLE, ppLeft: Infinity }];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-500 via-blue-700 to-indigo-900 p-4 flex flex-col">
      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col">
        {/* Rival */}
        <div className="flex items-start justify-between gap-4">
          <div className="bg-black/30 backdrop-blur rounded-2xl p-3 border-2 border-white/20 flex-1 max-w-[55%]">
            <span className="inline-block bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full mb-1">
              RIVAL SALVAJE
            </span>
            <div className="flex items-center justify-between gap-2">
              <p className="text-white font-black truncate">{enemy.name}</p>
              <span className="text-white/90 text-xs font-bold whitespace-nowrap">Nv. {enemy.level}</span>
            </div>
            <HealthBar hp={enemy.hp} maxHp={enemy.maxHp} />
            <div className="flex gap-1 mt-2 flex-wrap">
              {enemy.types.map(type => (
                <TypeBadge key={type} type={type} small />
              ))}
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <img
              src={enemy.sprites.front}
              alt={enemy.name}
              className={`w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-2xl animate-float ${
                shake === 'enemy' ? 'animate-hit' : ''
              } ${enemy.hp <= 0 ? 'opacity-30 grayscale' : ''}`}
            />
            {popup?.side === 'enemy' && (
              <span className="absolute inset-x-0 top-0 text-center text-lg font-black text-red-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                -{popup.amount}
              </span>
            )}
          </div>
        </div>

        {/* Jugador */}
        <div className="flex items-end justify-between gap-4 mt-2">
          <div className="relative flex-shrink-0">
            <img
              src={active.sprites.back}
              alt={active.name}
              className={`w-36 h-36 sm:w-44 sm:h-44 object-contain drop-shadow-2xl ${
                shake === 'player' ? 'animate-hit' : ''
              } ${active.hp <= 0 ? 'opacity-30 grayscale' : ''}`}
            />
            {popup?.side === 'player' && (
              <span className="absolute inset-x-0 top-0 text-center text-lg font-black text-red-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                -{popup.amount}
              </span>
            )}
          </div>
          <div className="bg-black/30 backdrop-blur rounded-2xl p-3 border-2 border-white/20 flex-1 max-w-[55%]">
            <span className="inline-block bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full mb-1">
              TU POKÉMON
            </span>
            <div className="flex items-center justify-between gap-2">
              <p className="text-white font-black truncate">{active.name}</p>
              <span className="text-white/90 text-xs font-bold whitespace-nowrap">Nv. {active.level}</span>
            </div>
            <HealthBar hp={active.hp} maxHp={active.maxHp} />
            <div className="h-1.5 w-full bg-black/30 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${Math.min(100, (active.xp / xpToNextLevel(active.level)) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Mensajes */}
        <div className="bg-black/40 backdrop-blur rounded-2xl p-3 border-2 border-white/20 mt-3 h-28 overflow-y-auto">
          {log.map((line, i) => (
            <p
              key={i}
              className={`font-medium text-[10px] leading-relaxed ${
                line.side === 'me' ? 'text-green-300' : line.side === 'foe' ? 'text-red-300' : 'text-white'
              }`}
            >
              {line.text}
            </p>
          ))}
        </div>

        {/* Acciones */}
        <div className="mt-3">
          {result ? (
            <div className="bg-white/15 backdrop-blur rounded-2xl p-4 border-2 border-white/20 text-center">
              <p className="text-white font-black text-xs mb-3 leading-relaxed">
                {result === 'win' && '¡Ganaste el combate! 🎉'}
                {result === 'caught' && `¡${caught?.name} es tuyo! 🎊`}
                {result === 'lose' && 'Te quedaste sin Pokémon... 😵'}
                {result === 'fled' && 'Escapaste del combate 💨'}
              </p>
              <button
                onClick={() => onFinish({ team, result, caught, ballsUsed })}
                className="bg-yellow-400 text-yellow-900 font-black px-8 py-3 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition"
              >
                Continuar
              </button>
            </div>
          ) : menu === 'moves' ? (
            <div className="grid grid-cols-2 gap-2">
              {moves.map(move => (
                <button
                  key={move.id}
                  onClick={() => playTurn(move)}
                  disabled={busy || move.ppLeft <= 0}
                  className="bg-white/90 rounded-2xl p-3 text-left shadow-xl hover:scale-[1.02] active:scale-95 transition disabled:opacity-40"
                >
                  <p className="font-black text-gray-800 text-[10px] truncate">{move.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <TypeBadge type={move.type} small />
                    <span className="text-gray-600 text-xs font-bold">
                      {move.ppLeft === Infinity ? '∞' : `${move.ppLeft}/${move.pp}`} PP
                    </span>
                  </div>
                </button>
              ))}
              <button
                onClick={() => setMenu('main')}
                className="col-span-2 bg-black/40 text-white font-bold py-2 rounded-2xl border-2 border-white/20"
              >
                Volver
              </button>
            </div>
          ) : menu === 'team' ? (
            <div className="space-y-2">
              {team.map((pokemon, index) => (
                <button
                  key={pokemon.uid}
                  onClick={() => switchTo(index)}
                  disabled={busy || pokemon.hp <= 0 || index === activeIndex}
                  className="w-full bg-white/90 rounded-2xl p-2 flex items-center gap-3 shadow-lg hover:scale-[1.01] transition disabled:opacity-40"
                >
                  <img src={pokemon.sprites.front} alt={pokemon.name} className="w-12 h-12 object-contain" />
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-black text-gray-800 text-sm truncate">
                      {pokemon.name} <span className="text-gray-500">Nv. {pokemon.level}</span>
                    </p>
                    <div className="h-2 w-full bg-gray-300 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full ${pokemon.hp / pokemon.maxHp > 0.5 ? 'bg-green-500' : pokemon.hp / pokemon.maxHp > 0.2 ? 'bg-yellow-400' : 'bg-red-500'}`}
                        style={{ width: `${Math.max(0, (pokemon.hp / pokemon.maxHp) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-gray-600 text-xs font-bold">
                    {Math.max(0, pokemon.hp)}/{pokemon.maxHp}
                  </span>
                </button>
              ))}
              {active.hp > 0 && (
                <button
                  onClick={() => setMenu('main')}
                  className="w-full bg-black/40 text-white font-bold py-2 rounded-2xl border-2 border-white/20"
                >
                  Volver
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMenu('moves')}
                disabled={busy}
                className="bg-red-500 text-white font-black py-4 rounded-2xl shadow-xl border-2 border-red-300 hover:scale-[1.02] active:scale-95 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Swords className="w-5 h-5" /> Atacar
              </button>
              <button
                onClick={throwBall}
                disabled={busy || ballsLeft <= 0}
                className="bg-white text-red-600 font-black py-4 rounded-2xl shadow-xl border-2 border-white hover:scale-[1.02] active:scale-95 transition disabled:opacity-50"
              >
                ⚪ Poké Ball ({ballsLeft})
              </button>
              <button
                onClick={() => setMenu('team')}
                disabled={busy}
                className="bg-blue-500 text-white font-black py-4 rounded-2xl shadow-xl border-2 border-blue-300 hover:scale-[1.02] active:scale-95 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Repeat className="w-5 h-5" /> Cambiar
              </button>
              <button
                onClick={flee}
                disabled={busy}
                className="bg-gray-700 text-white font-black py-4 rounded-2xl shadow-xl border-2 border-gray-500 hover:scale-[1.02] active:scale-95 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" /> Huir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
