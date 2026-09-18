import { useState, useEffect, useRef } from 'react';
import { Swords, Repeat, LogOut } from 'lucide-react';
import { loadRandomWild, loadSpecies } from '../services/pokeapi';
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
import { VERSION } from '../version';
import HealthBar from './HealthBar';
import TypeBadge from './TypeBadge';
import PixelTrainer from './PixelTrainer';
import PixelBackground from './PixelBackground';
import PixelScene from './PixelScene';
import AttackCutIn from './AttackCutIn';
import { canFloat } from '../data/floaters';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Plataforma donde se planta cada Pokémon, para dar sensación de escenario
const Platform = ({ className = '' }) => (
  <svg viewBox="0 0 24 6" className={className} shapeRendering="crispEdges" aria-hidden="true">
    <rect x="5" y="0" width="14" height="2" fill="#4ade80" opacity="0.95" />
    <rect x="2" y="2" width="20" height="2" fill="#22c55e" opacity="0.95" />
    <rect x="0" y="4" width="24" height="2" fill="#15803d" opacity="0.9" />
  </svg>
);

const clone = (fighter) => ({ ...fighter, moves: fighter.moves.map(move => ({ ...move })) });

/**
 * Pantalla de combate
 * opponent = entrenador de la historia { trainer, pokemonId, level }; si no viene, sale un Pokémon salvaje
 */
export default function BattleScreen({
  team: initialTeam,
  balls,
  opponent,
  wildId,
  storyFighter,
  mode = 'practice',
  scene,
  gender = 'boy',
  outfit = 'clasico',
  onFinish
}) {
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
  const [attacker, setAttacker] = useState(null); // quién está embistiendo: 'player' | 'enemy'
  const [cutIn, setCutIn] = useState(null); // corte de ataque estilo anime
  const [error, setError] = useState('');
  const loadedRef = useRef(false);

  const active = team[activeIndex];
  // En Práctica tu Pokémon nunca se debilita: aguanta siempre con 1 PS
  // En Peleas el daño es de verdad y sí puede debilitarse
  const practice = mode === 'practice';

  // Buscar rival al empezar: el Pokémon del entrenador, o uno salvaje en Práctica
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const averageLevel = Math.round(initialTeam.reduce((sum, p) => sum + p.level, 0) / initialTeam.length);
    const wildLevel = Math.max(2, averageLevel + Math.floor(Math.random() * 3) - 1);

    const loadRival = opponent ? loadSpecies(opponent.pokemonId) : wildId ? loadSpecies(wildId) : loadRandomWild();
    const loadMine = storyFighter ? loadSpecies(storyFighter.pokemonId) : Promise.resolve(null);

    Promise.all([loadRival, loadMine])
      .then(([species, mySpecies]) => {
        // En la Historia peleas con el Pokémon que te prestan, no con tu equipo
        if (mySpecies) {
          setTeam([createFighter(mySpecies, storyFighter.level)]);
          setActiveIndex(0);
        }

        const rival = createFighter(species, opponent ? opponent.level : wildLevel);
        setEnemy(rival);
        setLog([{
          text: opponent
            ? `¡${opponent.trainer} te reta con ${rival.name}!`
            : `¡Un ${rival.name} salvaje apareció!`,
          side: 'info'
        }]);
      })
      .catch(err => {
        console.error('Error cargando el rival:', err);
        setError('No se pudo cargar el combate. Revisa tu conexión a internet.');
      });
  }, [initialTeam, opponent, wildId, storyFighter]);

  // Cómo se nombra al rival según el modo
  const foeLabel = (name) => (opponent ? `El ${name} de ${opponent.trainer}` : `El ${name} salvaje`);

  // side: 'me' (lo hace tu Pokémon), 'foe' (lo hace el salvaje) o 'info'
  const addLog = (message, side = 'info') => setLog(prev => [...prev.slice(-5), { text: message, side }]);

  // Un Pokémon ataca al otro; devuelve la vida que le queda al que recibe
  // targetSide dice a quién le toca recibir: 'enemy' (atacas tú) o 'player' (ataca el salvaje)
  const attack = async (attacker, defender, move, targetSide) => {
    const mine = targetSide === 'enemy'; // si el golpe va al rival, quien ataca eres tú
    const side = mine ? 'me' : 'foe';
    const attackerLabel = mine ? `Tu ${attacker.name}` : foeLabel(attacker.name);
    const defenderLabel = mine ? foeLabel(defender.name) : `Tu ${defender.name}`;

    // Corte estilo anime antes de golpear
    setCutIn({ side: mine ? 'player' : 'enemy', sprite: attacker.sprites.front, name: attacker.name, move });
    await delay(mine ? 1100 : 800);
    setCutIn(null);

    addLog(`¡${attackerLabel} usó ${move.name}!`, side);
    setAttacker(mine ? 'player' : 'enemy');
    setTimeout(() => setAttacker(null), 600);
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

    let remaining = Math.max(0, defender.hp - hit.amount);

    // Si tu Pokémon estaba a vida llena, un solo golpe no puede tumbarlo: aguanta con 1 PS
    const aguanta = targetSide === 'player' && defender.hp >= defender.maxHp && remaining <= 0;
    if (aguanta) remaining = 1;

    if (hit.critical) addLog('¡Un golpe crítico!', side);
    const text = effectivenessText(hit.effectiveness);
    if (text) addLog(text, side);
    addLog(`${defenderLabel} perdió ${hit.amount} PS.`, side);
    if (aguanta) addLog(`¡${defender.name} aguantó el golpe con 1 PS!`, 'info');

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
      addLog(`¡${foeLabel(enemy.name)} es más rápido y ataca primero!`, 'foe');
      await delay(800);
    }

    for (const side of order) {
      if (myHp <= 0 || foeHp <= 0) break;

      if (side === 'player') {
        foeHp = await attack(meNow(), foeNow(), playerMove, 'enemy');
        setEnemy(foeNow());
      } else {
        const remaining = await attack(foeNow(), meNow(), enemyMove, 'player');
        // myHp es una copia del número de PS, no el estado: el estado se actualiza abajo con un objeto nuevo
        // oxlint-disable-next-line react/immutability
        myHp = practice ? Math.max(1, remaining) : remaining;

        if (practice && remaining <= 0) {
          addLog(`¡Tu ${active.name} aguanta con 1 PS! En Práctica no se debilita.`, 'info');
        }

        setTeam(prev => prev.map((p, i) => (i === activeIndex ? meNow() : p)));
      }
    }

    // ¿Ganó el jugador?
    if (foeHp <= 0) {
      addLog(`¡${enemy.name} se debilitó!`);
      await delay(600);

      // La Práctica es entrenamiento libre: no da experiencia ni monedas
      // En Peleas se gana poca experiencia; en la Historia la reparte el juego
      if (practice) {
        addLog('En Práctica no se gana experiencia ni monedas.', 'info');
        endBattle(team.map((p, i) => (i === activeIndex ? meNow() : p)), 'win');
        setBusy(false);
        return;
      }

      const xp = mode === 'wild' ? Math.max(4, Math.round(xpReward(enemy) / 4)) : xpReward(enemy);
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
    // A los Pokémon de otro entrenador no se les puede lanzar una Poké Ball
    if (mode === 'story') {
      addLog('¡No puedes capturar el Pokémon de otro entrenador!');
      return;
    }

    if (balls - ballsUsed <= 0) {
      addLog('¡No te quedan Poké Balls!');
      return;
    }

    setBusy(true);
    setMenu('main');
    setBallsUsed(used => used + 1);
    addLog('¡Lanzaste una Poké Ball!');
    await delay(900);

    if (Math.random() < catchChance(enemy, active.level)) {
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
    // La Poké Ball solo existe en Práctica, así que aquí tu Pokémon tampoco se debilita
    const me = { ...active, hp: Math.max(1, remaining) };
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
    <div className="relative min-h-screen overflow-hidden p-4 flex flex-col">
      <div className="absolute inset-0 animate-camera">
        {scene ? <PixelScene name={scene} className="absolute inset-0 w-full h-full" /> : <PixelBackground />}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/35 to-slate-900/70" />
      {cutIn && <AttackCutIn {...cutIn} gender={gender} outfit={outfit} />}

      {/* Viñeteado, como el encuadre de una cámara */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(2,6,23,0.6) 100%)' }}
      />

      <div className="relative max-w-2xl w-full mx-auto flex-1 flex flex-col">
        {/* Rival */}
        <div className="flex items-start justify-between gap-4">
          <div className="bg-black/30 backdrop-blur p-2 sm:p-3 border-2 border-white/20 flex-1 min-w-0 sm:max-w-[55%]">
            <span className="inline-block bg-red-500 text-white text-[10px] font-black px-2 py-0.5 mb-1 truncate max-w-full">
              {opponent ? opponent.trainer.toUpperCase() : 'RIVAL SALVAJE'}
            </span>
            <p className="text-white font-black text-[10px] truncate leading-loose">{enemy.name}</p>
            <p className="text-white/90 text-[9px] font-bold">Nv. {enemy.level}</p>
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
              className={`w-24 h-24 sm:w-40 sm:h-40 object-contain drop-shadow-2xl ${
                shake === 'enemy'
                  ? 'animate-hit'
                  : attacker === 'enemy'
                    ? 'animate-lungeBack'
                    : canFloat(enemy.speciesId, enemy.types)
                      ? 'animate-float'
                      : ''
              } ${enemy.hp <= 0 ? 'opacity-30 grayscale' : ''}`}
            />
            {popup?.side === 'enemy' && (
              <span className="absolute inset-x-0 top-0 text-center text-lg font-black text-red-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                -{popup.amount}
              </span>
            )}
            {/* Plataforma del rival */}
            <Platform className="w-20 sm:w-28 h-6 sm:h-7 mx-auto -mt-5 sm:-mt-6" />
            <p className="text-center text-[9px] font-black text-red-300 mt-1">RIVAL</p>
          </div>
        </div>

        {/* Jugador */}
        <div className="flex items-end justify-between gap-4 mt-2">
          <div className="flex items-end gap-1 flex-shrink-0">
            {/* Tu entrenador: señala al Pokémon cuando le mandas atacar */}
            <PixelTrainer
              gender={gender}
              outfit={outfit}
              view="back"
              pointing={attacker === 'player'}
              className="w-11 h-16 sm:w-20 sm:h-28 mb-3 sm:mb-4"
            />

            <div className="relative">
              <img
                src={active.sprites.back}
                alt={active.name}
                className={`w-24 h-24 sm:w-40 sm:h-40 object-contain drop-shadow-2xl ${
                  shake === 'player' ? 'animate-hit' : attacker === 'player' ? 'animate-lunge' : ''
                } ${active.hp <= 0 ? 'opacity-30 grayscale' : ''}`}
              />
              {popup?.side === 'player' && (
                <span className="absolute inset-x-0 top-0 text-center text-lg font-black text-red-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  -{popup.amount}
                </span>
              )}
              {/* Tu plataforma, más cerca de la cámara */}
              <Platform className="w-24 sm:w-36 h-7 sm:h-9 mx-auto -mt-5 sm:-mt-7" />
              <p className="text-center text-[9px] font-black text-green-300 mt-1">TÚ</p>
            </div>
          </div>
          <div className="bg-black/30 backdrop-blur p-2 sm:p-3 border-2 border-white/20 flex-1 min-w-0 sm:max-w-[55%]">
            <span className="inline-block bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full mb-1">
              TU POKÉMON
            </span>
            <p className="text-white font-black text-[10px] truncate leading-loose">{active.name}</p>
            <p className="text-white/90 text-[9px] font-bold">Nv. {active.level}</p>
            <HealthBar hp={active.hp} maxHp={active.maxHp} />
            <div className="h-1.5 w-full bg-black/30 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${Math.min(100, (active.xp / xpToNextLevel(active.level)) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-white/40 text-[8px] text-right mt-1">{VERSION}</p>

        {/* Mensajes */}
        <div className="bg-black/40 backdrop-blur rounded-2xl p-3 border-2 border-white/20 mt-1 h-28 overflow-y-auto">
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
              {practice && (
                <p className="text-green-300 text-[9px] leading-loose mb-3">
                  Entrenamiento: sales curado, sin experiencia ni monedas
                </p>
              )}
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
                disabled={busy || ballsLeft <= 0 || Boolean(opponent)}
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
