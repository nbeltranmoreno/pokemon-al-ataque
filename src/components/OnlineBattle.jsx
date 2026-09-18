import { useState, useEffect, useRef } from 'react';
import PokeSprite from './PokeSprite';
import { LogOut, Repeat, Swords } from 'lucide-react';
import { resolveAttack, speedOf, STRUGGLE } from '../game/battle';
import { effectivenessText } from '../data/types';
import { VERSION } from '../version';
import HealthBar from './HealthBar';
import TypeBadge from './TypeBadge';
import PixelTrainer from './PixelTrainer';
import PixelScene from './PixelScene';
import AttackCutIn from './AttackCutIn';
import { canFloat } from '../data/floaters';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Plataforma donde se planta cada Pokémon, igual que en los otros combates
const Platform = ({ className = '' }) => (
  <svg viewBox="0 0 24 6" className={className} shapeRendering="crispEdges" aria-hidden="true">
    <rect x="5" y="0" width="14" height="2" fill="#4ade80" opacity="0.95" />
    <rect x="2" y="2" width="20" height="2" fill="#22c55e" opacity="0.95" />
    <rect x="0" y="4" width="24" height="2" fill="#15803d" opacity="0.9" />
  </svg>
);

// Bolitas: cuántos Pokémon le quedan a cada uno
const TeamDots = ({ team, active, color }) => (
  <div className="flex gap-1">
    {team.map((pokemon, index) => (
      <span
        key={pokemon.uid || index}
        title={pokemon.name}
        className={`w-3 h-3 border-2 ${
          pokemon.hp <= 0 ? 'bg-black/60 border-white/20' : `${color} ${index === active ? 'border-yellow-300' : 'border-white/50'}`
        }`}
      />
    ))}
  </div>
);

/**
 * Combate en línea contra otra persona, con todo el equipo y cambios
 * El que crea la sala (anfitrión) es quien calcula el turno y manda el resultado,
 * así los dos ven exactamente lo mismo, y los dos lo ven con la misma animación
 */
export default function OnlineBattle({
  conn,
  isHost,
  team: myStart,
  foeTeam: foeStart,
  gender = 'boy',
  outfit = 'clasico',
  foeTrainer,
  foeGender = 'boy',
  foeOutfit = 'clasico',
  bet = 0,
  onCoins,
  onExit
}) {
  const [myTeam, setMyTeam] = useState(myStart);
  const [foeTeam, setFoeTeam] = useState(foeStart);
  const [myActive, setMyActive] = useState(0);
  const [foeActive, setFoeActive] = useState(0);
  const [log, setLog] = useState([{ text: '¡Empieza el combate!', side: 'info' }]);
  const [menu, setMenu] = useState('main'); // 'main' | 'moves' | 'team'
  const [esperando, setEsperando] = useState(false); // ya elegiste, falta el rival
  const [mustSwitch, setMustSwitch] = useState(false); // tu Pokémon cayó: saca otro
  const [foeSwitching, setFoeSwitching] = useState(false);
  const [playing, setPlaying] = useState(false); // se está viendo la animación del turno
  const [cutIn, setCutIn] = useState(null); // corte de ataque estilo anime
  const [shake, setShake] = useState(null); // 'player' | 'enemy'
  const [popup, setPopup] = useState(null); // daño flotante: { side, amount }
  const [attacker, setAttacker] = useState(null); // quién embiste
  const [result, setResult] = useState(null); // 'win' | 'lose'
  const [disconnected, setDisconnected] = useState(false);

  const me = myTeam[myActive];
  const foe = foeTeam[foeActive];
  const myAlive = myTeam.filter(pokemon => pokemon.hp > 0).length;
  const foeAlive = foeTeam.filter(pokemon => pokemon.hp > 0).length;

  // Refs para que los mensajes que llegan usen siempre los datos actuales
  const myTeamRef = useRef(myTeam);
  const foeTeamRef = useRef(foeTeam);
  const myActiveRef = useRef(myActive);
  const foeActiveRef = useRef(foeActive);

  useEffect(() => {
    myTeamRef.current = myTeam;
    foeTeamRef.current = foeTeam;
    myActiveRef.current = myActive;
    foeActiveRef.current = foeActive;
  }, [myTeam, foeTeam, myActive, foeActive]);

  const myActionRef = useRef(null);
  const rivalActionRef = useRef(null);
  // Solo el anfitrión: quién tiene que sacar otro Pokémon y a quién ha elegido
  const needRef = useRef({ host: false, guest: false });
  const pendingRef = useRef({ host: null, guest: null });
  // Si llega un turno mientras se ve la animación del anterior, se guarda para después
  const playingRef = useRef(false);
  const queueRef = useRef([]);
  const retryRef = useRef(false);

  const mineKey = isHost ? 'host' : 'guest';

  // La apuesta se cobra una sola vez, cuando ya hay resultado
  const paidRef = useRef(false);
  useEffect(() => {
    if (!result || paidRef.current || !bet || !onCoins) return;
    paidRef.current = true;
    onCoins(result === 'win' ? bet : -bet);
  }, [result, bet, onCoins]);

  const addLine = (line) => {
    setLog(prev => [...prev.slice(-8), { text: line.text, side: line.side === mineKey ? 'me' : line.side === 'info' ? 'info' : 'foe' }]);
  };

  // Poner las vidas que dice el anfitrión
  const applyHps = (hostHps, guestHps) => {
    const mías = isHost ? hostHps : guestHps;
    const suyas = isHost ? guestHps : hostHps;
    setMyTeam(prev => prev.map((pokemon, i) => ({ ...pokemon, hp: mías?.[i] ?? pokemon.hp })));
    setFoeTeam(prev => prev.map((pokemon, i) => ({ ...pokemon, hp: suyas?.[i] ?? pokemon.hp })));
  };

  // Ver el turno paso a paso: corte de ataque, golpe, daño... como en los otros combates
  const playState = async (state) => {
    playingRef.current = true;
    setPlaying(true);
    setEsperando(false);
    myActionRef.current = null;
    rivalActionRef.current = null;

    for (const line of state.lines) {
      const mío = line.side === mineKey;

      if (line.kind === 'attack' && line.cut) {
        setCutIn({
          side: mío ? 'player' : 'enemy',
          sprite: line.cut.sprite,
          name: line.cut.name,
          move: line.cut.move
        });
        await delay(mío ? 1000 : 800);
        setCutIn(null);
        setAttacker(mío ? 'player' : 'enemy');
      }

      if (line.kind === 'damage') {
        applyHps(line.hostHps, line.guestHps);
        const golpeado = (line.target === 'host') === isHost ? 'player' : 'enemy';
        setShake(golpeado);
        setPopup({ side: golpeado, amount: line.amount });
      }

      addLine(line);
      await delay(line.kind === 'damage' ? 800 : 550);

      setShake(null);
      setPopup(null);
      setAttacker(null);
    }

    // Final del turno: vidas, quién está fuera y de quién es el turno
    applyHps(state.hostHps, state.guestHps);
    setMyActive(isHost ? state.hostActive : state.guestActive);
    setFoeActive(isHost ? state.guestActive : state.hostActive);

    const meToca = isHost ? state.needHost : state.needGuest;
    setMustSwitch(meToca);
    setFoeSwitching(isHost ? state.needGuest : state.needHost);
    setMenu(meToca ? 'team' : 'main');
    if (state.result) setResult(state.result === mineKey ? 'win' : 'lose');

    playingRef.current = false;
    setPlaying(false);

    // Si llegó otro turno mientras tanto, se ve ahora
    const siguiente = queueRef.current.shift();
    if (siguiente) {
      playState(siguiente);
    } else if (retryRef.current) {
      // El rival eligió su relevo mientras se veía la animación
      retryRef.current = false;
      tryReplacements();
    }
  };

  const applyState = (state) => {
    if (playingRef.current) {
      queueRef.current.push(state);
      return;
    }
    playState(state);
  };

  // Solo el anfitrión: calcular el turno cuando los dos han elegido
  const resolveTurn = () => {
    const hostTeam = isHost ? myTeamRef.current : foeTeamRef.current;
    const guestTeam = isHost ? foeTeamRef.current : myTeamRef.current;
    const hostAction = isHost ? myActionRef.current : rivalActionRef.current;
    const guestAction = isHost ? rivalActionRef.current : myActionRef.current;

    const hostHps = hostTeam.map(pokemon => pokemon.hp);
    const guestHps = guestTeam.map(pokemon => pokemon.hp);
    let hostActive = isHost ? myActiveRef.current : foeActiveRef.current;
    let guestActive = isHost ? foeActiveRef.current : myActiveRef.current;
    const lines = [];

    // Los cambios van primero: cambiar de Pokémon gasta tu turno
    if (hostAction.kind === 'switch') {
      hostActive = hostAction.index;
      lines.push({ kind: 'switch', text: `¡Adelante, ${hostTeam[hostActive].name}!`, side: 'host' });
    }
    if (guestAction.kind === 'switch') {
      guestActive = guestAction.index;
      lines.push({ kind: 'switch', text: `¡Adelante, ${guestTeam[guestActive].name}!`, side: 'guest' });
    }

    const hostMon = hostTeam[hostActive];
    const guestMon = guestTeam[guestActive];
    const orden = speedOf(hostMon) >= speedOf(guestMon) ? ['host', 'guest'] : ['guest', 'host'];

    for (const quien of orden) {
      const accion = quien === 'host' ? hostAction : guestAction;
      if (accion.kind !== 'move') continue;

      const atacanteHp = quien === 'host' ? hostHps[hostActive] : guestHps[guestActive];
      const defensorHp = quien === 'host' ? guestHps[guestActive] : hostHps[hostActive];
      if (atacanteHp <= 0 || defensorHp <= 0) continue;

      const atacante = { ...(quien === 'host' ? hostMon : guestMon), hp: atacanteHp };
      const defensor = { ...(quien === 'host' ? guestMon : hostMon), hp: defensorHp };
      const move = atacante.moves.find(m => m.id === accion.moveId) || STRUGGLE;

      lines.push({
        kind: 'attack',
        text: `¡${atacante.name} usó ${move.name}!`,
        side: quien,
        cut: { sprite: atacante.sprites.front, name: atacante.name, move: { name: move.name, type: move.type } }
      });

      const hit = resolveAttack(atacante, defensor, move);
      if (hit.missed) {
        lines.push({ kind: 'miss', text: '¡Pero falló!', side: quien });
        continue;
      }

      let quedan = Math.max(0, defensorHp - hit.amount);
      // A vida llena nadie cae de un solo golpe: aguanta con 1 PS (para los dos igual)
      if (defensorHp >= defensor.maxHp && quedan <= 0) quedan = 1;

      if (quien === 'host') {
        guestHps[guestActive] = quedan;
      } else {
        hostHps[hostActive] = quedan;
      }

      if (hit.critical) lines.push({ kind: 'crit', text: '¡Un golpe crítico!', side: quien });
      const texto = effectivenessText(hit.effectiveness);
      if (texto) lines.push({ kind: 'eff', text: texto, side: quien });

      lines.push({
        kind: 'damage',
        text: `${defensor.name} perdió ${defensorHp - quedan} PS.`,
        side: quien,
        amount: defensorHp - quedan,
        target: quien === 'host' ? 'guest' : 'host',
        hostHps: [...hostHps],
        guestHps: [...guestHps]
      });

      if (quedan <= 0) lines.push({ kind: 'faint', text: `¡${defensor.name} se debilitó!`, side: quien });
    }

    // Se pierde cuando caen todos, no solo el que está peleando
    const hostVivos = hostHps.some(hp => hp > 0);
    const guestVivos = guestHps.some(hp => hp > 0);
    const result = !hostVivos ? 'guest' : !guestVivos ? 'host' : null;

    const needHost = !result && hostHps[hostActive] <= 0;
    const needGuest = !result && guestHps[guestActive] <= 0;
    needRef.current = { host: needHost, guest: needGuest };
    pendingRef.current = { host: null, guest: null };

    const state = { hostHps, guestHps, hostActive, guestActive, lines, needHost, needGuest, result };
    conn.send({ type: 'state', state });
    applyState(state);
  };

  // Solo el anfitrión: cuando los que tienen que cambiar ya han elegido, se manda el cambio
  const tryReplacements = () => {
    // Si aún se está viendo la animación, se espera a que termine
    if (playingRef.current) {
      retryRef.current = true;
      return;
    }

    const need = needRef.current;
    const pend = pendingRef.current;
    if (!need.host && !need.guest) return;
    if (need.host && pend.host === null) return;
    if (need.guest && pend.guest === null) return;

    const hostTeam = isHost ? myTeamRef.current : foeTeamRef.current;
    const guestTeam = isHost ? foeTeamRef.current : myTeamRef.current;
    let hostActive = isHost ? myActiveRef.current : foeActiveRef.current;
    let guestActive = isHost ? foeActiveRef.current : myActiveRef.current;
    const lines = [];

    if (need.host) {
      hostActive = pend.host;
      lines.push({ kind: 'switch', text: `¡Adelante, ${hostTeam[hostActive].name}!`, side: 'host' });
    }
    if (need.guest) {
      guestActive = pend.guest;
      lines.push({ kind: 'switch', text: `¡Adelante, ${guestTeam[guestActive].name}!`, side: 'guest' });
    }

    needRef.current = { host: false, guest: false };
    pendingRef.current = { host: null, guest: null };

    const state = {
      hostHps: hostTeam.map(pokemon => pokemon.hp),
      guestHps: guestTeam.map(pokemon => pokemon.hp),
      hostActive,
      guestActive,
      lines,
      needHost: false,
      needGuest: false,
      result: null
    };

    conn.send({ type: 'state', state });
    applyState(state);
  };

  // Escuchar al rival
  useEffect(() => {
    const onData = (data) => {
      if (data?.type === 'action') {
        rivalActionRef.current = data.action;
        setLog(prev => [...prev.slice(-8), { text: 'Tu rival ya ha elegido.', side: 'info' }]);
        if (isHost && myActionRef.current !== null) resolveTurn();
      } else if (data?.type === 'replace') {
        if (isHost) {
          pendingRef.current = { ...pendingRef.current, guest: data.index };
          tryReplacements();
        }
      } else if (data?.type === 'state' && !isHost) {
        applyState(data.state);
      } else if (data?.type === 'bye') {
        setDisconnected(true);
      }
    };

    const onClose = () => setDisconnected(true);

    conn.on('data', onData);
    conn.on('close', onClose);

    return () => {
      conn.off('data', onData);
      conn.off('close', onClose);
    };
    // Los manejadores leen los datos de las refs, así que no hay que volver a registrarlos
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [conn, isHost]);

  // Elegir ataque o cambio en un turno normal
  const sendAction = (action) => {
    if (esperando || playing || foeSwitching || result || disconnected || mustSwitch) return;

    myActionRef.current = action;
    setEsperando(true);
    setMenu('main');
    conn.send({ type: 'action', action });

    if (isHost && rivalActionRef.current !== null) resolveTurn();
  };

  // Sacar otro Pokémon después de que el tuyo se debilite
  const sendReplacement = (index) => {
    setEsperando(true);
    if (isHost) {
      pendingRef.current = { ...pendingRef.current, host: index };
      tryReplacements();
    } else {
      conn.send({ type: 'replace', index });
    }
  };

  const pickPokemon = (index) => {
    if (myTeam[index].hp <= 0 || index === myActive) return;
    if (mustSwitch) {
      sendReplacement(index);
    } else {
      sendAction({ kind: 'switch', index });
    }
  };

  const leave = () => {
    try {
      conn.send({ type: 'bye' });
    } catch {
      // Si ya no hay conexión, da igual
    }
    onExit();
  };

  return (
    <div className="relative min-h-screen overflow-hidden p-4 flex flex-col">
      {/* El mismo escenario que en los otros combates */}
      <div className="absolute inset-0 animate-camera">
        <PixelScene name="liga" className="absolute inset-0 w-full h-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/35 to-slate-900/70" />
      {cutIn && <AttackCutIn {...cutIn} gender={cutIn.side === 'player' ? gender : foeGender} outfit={cutIn.side === 'player' ? outfit : foeOutfit} />}

      {/* Viñeteado, como el encuadre de una cámara */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(2,6,23,0.6) 100%)' }}
      />

      <div className="relative max-w-2xl w-full mx-auto flex-1 flex flex-col">
        {bet > 0 && (
          <p className="text-yellow-300 font-black text-[10px] text-center mb-2 leading-loose">🪙 Apuesta: {bet} monedas</p>
        )}

        {/* Rival */}
        <div className="flex items-start justify-between gap-4">
          <div className="bg-black/40 backdrop-blur p-2 sm:p-3 border-2 border-white/20 flex-1 min-w-0 sm:max-w-[55%]">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="inline-block bg-red-500 text-white text-[9px] font-black px-2 py-0.5 truncate max-w-full">
                🎮 {foeTrainer || 'RIVAL'}
              </span>
              <TeamDots team={foeTeam} active={foeActive} color="bg-red-400" />
            </div>
            <p className="text-white font-black text-[10px] truncate leading-loose">{foe.name}</p>
            <p className="text-white/90 text-[9px] font-bold">Nv. {foe.level}</p>
            <HealthBar hp={foe.hp} maxHp={foe.maxHp} />
            <p className="text-white/60 text-[9px] leading-loose mt-1">
              Le quedan {foeAlive} de {foeTeam.length}
            </p>
            <div className="flex gap-1 mt-2 flex-wrap">
              {foe.types.map(type => (
                <TypeBadge key={type} type={type} small />
              ))}
            </div>
          </div>
          <div className="flex items-start gap-1 flex-shrink-0">
            <div className="relative">
              <PokeSprite
                src={foe.sprites.front}
                alt={foe.name}
                className={`w-24 h-24 sm:w-36 sm:h-36 object-contain drop-shadow-2xl ${
                  shake === 'enemy'
                    ? 'animate-hit'
                    : attacker === 'enemy'
                      ? 'animate-lungeBack'
                      : canFloat(foe.speciesId, foe.types)
                        ? 'animate-float'
                        : ''
                } ${foe.hp <= 0 ? 'opacity-30 grayscale' : ''}`}
              />
              {popup?.side === 'enemy' && (
                <span className="absolute inset-x-0 top-0 text-center text-lg font-black text-red-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  -{popup.amount}
                </span>
              )}
              <Platform className="w-20 sm:w-28 h-6 sm:h-7 mx-auto -mt-5 sm:-mt-6" />
              <p className="text-center text-[9px] font-black text-red-300 mt-1">RIVAL</p>
            </div>
            {/* El entrenador rival, tal como se ha puesto él */}
            <PixelTrainer gender={foeGender} outfit={foeOutfit} className="w-8 h-11 sm:w-12 sm:h-[4.25rem] mt-2" />
          </div>
        </div>

        {/* Tú */}
        <div className="flex items-end justify-between gap-4 mt-2">
          <div className="flex items-end gap-1 flex-shrink-0">
            {/* Tu entrenador: señala cuando ya has elegido */}
            <PixelTrainer
              gender={gender}
              outfit={outfit}
              view="back"
              pointing={esperando || attacker === 'player'}
              className="w-11 h-16 sm:w-20 sm:h-28 mb-3 sm:mb-4"
            />
            <div className="relative">
              <PokeSprite
                src={me.sprites.back}
                alt={me.name}
                className={`w-24 h-24 sm:w-40 sm:h-40 object-contain drop-shadow-2xl ${
                  shake === 'player' ? 'animate-hit' : attacker === 'player' ? 'animate-lunge' : ''
                } ${me.hp <= 0 ? 'opacity-30 grayscale' : ''}`}
              />
              {popup?.side === 'player' && (
                <span className="absolute inset-x-0 top-0 text-center text-lg font-black text-red-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  -{popup.amount}
                </span>
              )}
              <Platform className="w-24 sm:w-36 h-7 sm:h-9 mx-auto -mt-5 sm:-mt-7" />
              <p className="text-center text-[9px] font-black text-green-300 mt-1">TÚ</p>
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur p-2 sm:p-3 border-2 border-white/20 flex-1 min-w-0 sm:max-w-[55%]">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="inline-block bg-green-500 text-white text-[9px] font-black px-2 py-0.5">TU POKÉMON</span>
              <TeamDots team={myTeam} active={myActive} color="bg-green-400" />
            </div>
            <p className="text-white font-black text-[10px] truncate leading-loose">{me.name}</p>
            <p className="text-white/90 text-[9px] font-bold">Nv. {me.level}</p>
            <HealthBar hp={me.hp} maxHp={me.maxHp} />
            <p className="text-white/60 text-[9px] leading-loose mt-1">
              Te quedan {myAlive} de {myTeam.length}
            </p>
          </div>
        </div>

        <p className="text-white/40 text-[8px] text-right mt-1">{VERSION}</p>

        {/* Mensajes */}
        <div className="bg-black/50 backdrop-blur p-3 border-2 border-white/20 mt-1 h-28 overflow-y-auto">
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
          {disconnected ? (
            <div className="bg-white/15 border-4 border-white/30 p-4 text-center">
              <p className="text-white font-black text-xs leading-loose mb-3">Tu rival se fue 👋</p>
              <button
                onClick={onExit}
                className="bg-yellow-400 text-yellow-900 font-black px-6 py-3 border-4 border-yellow-900 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition"
              >
                Volver
              </button>
            </div>
          ) : result ? (
            <div className="bg-white/15 border-4 border-white/30 p-4 text-center">
              <p className="text-white font-black text-xs leading-loose mb-3">
                {result === 'win' ? '¡Ganaste el combate online! 🎉' : 'Perdiste el combate online 😵'}
              </p>
              {bet > 0 && (
                <p className={`font-black text-[10px] leading-loose mb-3 ${result === 'win' ? 'text-yellow-300' : 'text-red-300'}`}>
                  {result === 'win' ? `Te llevas ${bet} monedas` : `Pierdes ${bet} monedas`}
                </p>
              )}
              <button
                onClick={leave}
                className="bg-yellow-400 text-yellow-900 font-black px-6 py-3 border-4 border-yellow-900 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition"
              >
                Volver
              </button>
            </div>
          ) : playing ? (
            <div className="bg-black/40 border-4 border-white/20 p-4 text-center">
              <p className="text-white font-black text-[10px] leading-loose">¡Combate!</p>
            </div>
          ) : esperando || foeSwitching ? (
            <div className="bg-black/40 border-4 border-white/20 p-4 text-center">
              <p className="text-white font-black text-[10px] leading-loose">
                {foeSwitching ? 'Tu rival está sacando otro Pokémon...' : 'Esperando a tu rival...'}
              </p>
              <div className="animate-spin text-3xl mt-2">⚡</div>
            </div>
          ) : mustSwitch || menu === 'team' ? (
            <div className="space-y-2">
              {mustSwitch && (
                <p className="text-yellow-300 font-black text-[10px] text-center leading-loose">
                  {me.name} se debilitó. ¡Saca otro Pokémon!
                </p>
              )}
              {myTeam.map((pokemon, index) => (
                <button
                  key={pokemon.uid || index}
                  onClick={() => pickPokemon(index)}
                  disabled={pokemon.hp <= 0 || index === myActive}
                  className="w-full bg-white/90 p-2 flex items-center gap-3 border-4 border-white/60 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition disabled:opacity-40"
                >
                  <PokeSprite src={pokemon.sprites.front} alt={pokemon.name} className="w-12 h-12 object-contain flex-shrink-0" />
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-black text-gray-800 text-[10px] truncate leading-loose">
                      {pokemon.name} <span className="text-gray-500">Nv. {pokemon.level}</span>
                    </p>
                    <div className="h-2 w-full bg-gray-300 mt-1">
                      <div
                        className={`h-full ${
                          pokemon.hp / pokemon.maxHp > 0.5 ? 'bg-green-500' : pokemon.hp / pokemon.maxHp > 0.2 ? 'bg-yellow-400' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.max(0, (pokemon.hp / pokemon.maxHp) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-gray-600 text-[9px] font-bold flex-shrink-0">
                    {Math.max(0, pokemon.hp)}/{pokemon.maxHp}
                  </span>
                </button>
              ))}
              {!mustSwitch && (
                <>
                  <button
                    onClick={() => setMenu('main')}
                    className="w-full bg-black/40 text-white font-black py-2 border-4 border-white/20"
                  >
                    Volver
                  </button>
                  <p className="text-white/60 text-[9px] text-center leading-loose">
                    Cambiar gasta tu turno: el rival te pega igual.
                  </p>
                </>
              )}
            </div>
          ) : menu === 'moves' ? (
            <div className="grid grid-cols-2 gap-2">
              {me.moves.map(move => (
                <button
                  key={move.id}
                  onClick={() => sendAction({ kind: 'move', moveId: move.id })}
                  className="bg-white/90 p-3 text-left border-4 border-white/60 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition"
                >
                  <p className="font-black text-gray-800 text-[10px] truncate">{move.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <TypeBadge type={move.type} small />
                    <span className="text-gray-600 text-[9px] font-bold">{move.power} pot.</span>
                  </div>
                </button>
              ))}
              <button
                onClick={() => setMenu('main')}
                className="col-span-2 bg-black/40 text-white font-black py-2 border-4 border-white/20"
              >
                Volver
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMenu('moves')}
                className="bg-red-500 text-white font-black py-4 border-4 border-red-300 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition flex items-center justify-center gap-2"
              >
                <Swords className="w-5 h-5" /> Atacar
              </button>
              <button
                onClick={() => setMenu('team')}
                disabled={myAlive <= 1}
                className="bg-blue-500 text-white font-black py-4 border-4 border-blue-300 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition disabled:opacity-40 flex items-center justify-center gap-2"
              >
                <Repeat className="w-5 h-5" /> Cambiar
              </button>
            </div>
          )}

          {!result && !disconnected && (
            <button
              onClick={leave}
              className="w-full mt-2 bg-gray-700 text-white font-black py-3 border-4 border-gray-400 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Salir del combate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
