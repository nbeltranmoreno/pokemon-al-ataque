import { useState, useEffect, useRef } from 'react';
import { LogOut } from 'lucide-react';
import { resolveAttack, speedOf, STRUGGLE } from '../game/battle';
import { effectivenessText } from '../data/types';
import HealthBar from './HealthBar';
import TypeBadge from './TypeBadge';
import PixelTrainer from './PixelTrainer';
import { canFloat } from '../data/floaters';

/**
 * Combate en línea contra otra persona
 * El que crea la sala (anfitrión) es quien calcula el daño y manda el resultado,
 * así los dos ven exactamente lo mismo
 */
export default function OnlineBattle({
  conn,
  isHost,
  me: myStart,
  foe: foeStart,
  gender = 'boy',
  outfit = 'clasico',
  foeTrainer,
  foeGender = 'boy',
  foeOutfit = 'clasico',
  bet = 0,
  onCoins,
  onExit
}) {
  const [me, setMe] = useState(myStart);
  const [foe, setFoe] = useState(foeStart);
  const [log, setLog] = useState([{ text: '¡Empieza el combate!', side: 'info' }]);
  const [chosen, setChosen] = useState(null);
  const [result, setResult] = useState(null); // 'win' | 'lose'
  const [disconnected, setDisconnected] = useState(false);

  // Refs para que los mensajes que llegan usen siempre los datos actuales
  const meRef = useRef(me);
  const foeRef = useRef(foe);

  useEffect(() => {
    meRef.current = me;
    foeRef.current = foe;
  }, [me, foe]);

  const myMoveRef = useRef(null);
  const rivalMoveRef = useRef(null);

  const mineKey = isHost ? 'host' : 'guest';

  // La apuesta se cobra una sola vez, cuando ya hay resultado
  const paidRef = useRef(false);
  useEffect(() => {
    if (!result || paidRef.current || !bet || !onCoins) return;
    paidRef.current = true;
    onCoins(result === 'win' ? bet : -bet);
  }, [result, bet, onCoins]);

  // Aplicar el resultado de un turno (lo calcula siempre el anfitrión)
  const applyState = (state) => {
    setMe(prev => ({ ...prev, hp: isHost ? state.hostHp : state.guestHp }));
    setFoe(prev => ({ ...prev, hp: isHost ? state.guestHp : state.hostHp }));
    setLog(prev => [
      ...prev.slice(-6),
      ...state.lines.map(line => ({ text: line.text, side: line.side === mineKey ? 'me' : 'foe' }))
    ]);
    setChosen(null);
    myMoveRef.current = null;
    rivalMoveRef.current = null;
    if (state.result) setResult(state.result === mineKey ? 'win' : 'lose');
  };

  // Solo el anfitrión: calcular el turno cuando los dos han elegido
  const resolveTurn = () => {
    const hostMon = isHost ? meRef.current : foeRef.current;
    const guestMon = isHost ? foeRef.current : meRef.current;
    const hostMoveId = isHost ? myMoveRef.current : rivalMoveRef.current;
    const guestMoveId = isHost ? rivalMoveRef.current : myMoveRef.current;

    const hostMove = hostMon.moves.find(m => m.id === hostMoveId) || STRUGGLE;
    const guestMove = guestMon.moves.find(m => m.id === guestMoveId) || STRUGGLE;

    let hostHp = hostMon.hp;
    let guestHp = guestMon.hp;
    const lines = [];

    const order = speedOf(hostMon) >= speedOf(guestMon) ? ['host', 'guest'] : ['guest', 'host'];

    for (const who of order) {
      if (hostHp <= 0 || guestHp <= 0) break;

      const attacker = who === 'host' ? { ...hostMon, hp: hostHp } : { ...guestMon, hp: guestHp };
      const defender = who === 'host' ? { ...guestMon, hp: guestHp } : { ...hostMon, hp: hostHp };
      const move = who === 'host' ? hostMove : guestMove;

      lines.push({ text: `¡${attacker.name} usó ${move.name}!`, side: who });

      const hit = resolveAttack(attacker, defender, move);
      if (hit.missed) {
        lines.push({ text: '¡Pero falló!', side: who });
        continue;
      }

      if (who === 'host') {
        guestHp = Math.max(0, guestHp - hit.amount);
      } else {
        hostHp = Math.max(0, hostHp - hit.amount);
      }

      if (hit.critical) lines.push({ text: '¡Un golpe crítico!', side: who });
      const text = effectivenessText(hit.effectiveness);
      if (text) lines.push({ text, side: who });
      lines.push({ text: `${defender.name} perdió ${hit.amount} PS.`, side: who });
    }

    const state = {
      hostHp,
      guestHp,
      lines,
      result: hostHp <= 0 ? 'guest' : guestHp <= 0 ? 'host' : null
    };

    applyState(state);
    conn.send({ type: 'state', state });
  };

  // Escuchar al rival
  useEffect(() => {
    const onData = (data) => {
      if (data?.type === 'move') {
        rivalMoveRef.current = data.moveId;
        setLog(prev => [...prev.slice(-6), { text: 'Tu rival ya eligió su ataque.', side: 'info' }]);
        if (isHost && myMoveRef.current !== null) resolveTurn();
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

  const chooseMove = (move) => {
    if (chosen || result || disconnected) return;

    setChosen(move.id);
    myMoveRef.current = move.id;
    conn.send({ type: 'move', moveId: move.id });

    if (isHost && rivalMoveRef.current !== null) resolveTurn();
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
    <div className="min-h-screen bg-gradient-to-b from-sky-600 via-blue-800 to-indigo-900 p-4">
      <div className="max-w-2xl mx-auto">
        {bet > 0 && (
          <p className="text-yellow-300 font-black text-[10px] text-center mb-2 leading-loose">🪙 Apuesta: {bet} monedas</p>
        )}

        {/* Rival */}
        <div className="flex items-start justify-between gap-4">
          <div className="bg-black/30 border-4 border-white/20 p-2 sm:p-3 flex-1 min-w-0 sm:max-w-[55%]">
            <span className="inline-block bg-red-500 text-white text-[9px] font-black px-2 py-0.5 mb-1 truncate max-w-full">
              🎮 {foeTrainer || 'RIVAL'}
            </span>
            <p className="text-white font-black text-[10px] truncate leading-loose">{foe.name}</p>
            <p className="text-white/90 text-[9px] font-bold">Nv. {foe.level}</p>
            <HealthBar hp={foe.hp} maxHp={foe.maxHp} />
            <div className="flex gap-1 mt-2 flex-wrap">
              {foe.types.map(type => (
                <TypeBadge key={type} type={type} small />
              ))}
            </div>
          </div>
          <div className="flex items-start gap-1 flex-shrink-0">
            <div>
              <img
                src={foe.sprites.front}
                alt={foe.name}
                className={`w-20 h-20 sm:w-32 sm:h-32 object-contain ${canFloat(foe.speciesId, foe.types) ? 'animate-float' : ''} ${foe.hp <= 0 ? 'opacity-30 grayscale' : ''}`}
              />
              <div className="w-20 h-2 bg-red-500 border-2 border-red-200 mx-auto -mt-5" />
            </div>
            {/* El entrenador rival, tal como se ha puesto él */}
            <PixelTrainer gender={foeGender} outfit={foeOutfit} className="w-8 h-11 sm:w-10 sm:h-14 mt-2" />
          </div>
        </div>

        {/* Tú */}
        <div className="flex items-end justify-between gap-4 mt-2">
          <div className="flex items-end gap-1 flex-shrink-0">
            {/* Tu entrenador: señala cuando ya has elegido ataque */}
            <PixelTrainer gender={gender} outfit={outfit} view="back" pointing={Boolean(chosen)} className="w-11 h-16 sm:w-16 sm:h-[5.5rem] mb-3" />
            <div>
              <img
                src={me.sprites.back}
                alt={me.name}
                className={`w-20 h-20 sm:w-36 sm:h-36 object-contain ${me.hp <= 0 ? 'opacity-30 grayscale' : ''}`}
              />
              <div className="w-24 h-2 bg-green-500 border-2 border-green-200 mx-auto -mt-5" />
              <p className="text-center text-[9px] font-black text-green-300 mt-1">TÚ</p>
            </div>
          </div>
          <div className="bg-black/30 border-4 border-white/20 p-2 sm:p-3 flex-1 min-w-0 sm:max-w-[55%]">
            <span className="inline-block bg-green-500 text-white text-[9px] font-black px-2 py-0.5 mb-1">TU POKÉMON</span>
            <p className="text-white font-black text-[10px] truncate leading-loose">{me.name}</p>
            <p className="text-white/90 text-[9px] font-bold">Nv. {me.level}</p>
            <HealthBar hp={me.hp} maxHp={me.maxHp} />
          </div>
        </div>

        {/* Mensajes */}
        <div className="bg-black/40 border-4 border-white/20 p-3 mt-3 h-28 overflow-y-auto">
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
          ) : chosen ? (
            <div className="bg-black/30 border-4 border-white/20 p-4 text-center">
              <p className="text-white font-black text-[10px] leading-loose">Esperando a tu rival...</p>
              <div className="animate-spin text-3xl mt-2">⚡</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {me.moves.map(move => (
                <button
                  key={move.id}
                  onClick={() => chooseMove(move)}
                  className="bg-white/90 p-3 text-left border-4 border-white/60 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition"
                >
                  <p className="font-black text-gray-800 text-[10px] truncate">{move.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <TypeBadge type={move.type} small />
                    <span className="text-gray-600 text-[9px] font-bold">{move.power} pot.</span>
                  </div>
                </button>
              ))}
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
