import { useState, useEffect, useRef, useMemo } from 'react';
import PokeSprite from './PokeSprite';
import { ArrowLeft, Copy, Users, Swords } from 'lucide-react';
import Peer from 'peerjs';
import { healFighter } from '../game/battle';
import OnlineBattle from './OnlineBattle';
import PixelBackground from './PixelBackground';
import PixelTrainer from './PixelTrainer';
import { useLang } from '../i18n';

// Prefijo para que los códigos no choquen con los de otras webs que usan PeerJS
const PREFIX = 'pokealataque-';
const LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const makeCode = () => Array.from({ length: 5 }, () => LETTERS[Math.floor(Math.random() * LETTERS.length)]).join('');

/**
 * Modo online: los dos navegadores se conectan directamente entre sí (WebRTC)
 * Uno crea la sala y dice el código, el otro lo escribe
 */
export default function OnlineScreen({ team, username, gender = 'boy', outfit = 'clasico', coins = 0, onCoins, onPlayed, onBack }) {
  const { t } = useLang();
  const [mode, setMode] = useState(null); // 'host' | 'guest'
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [conn, setConn] = useState(null);
  const [foeTeam, setFoeTeam] = useState(null);
  const [foeTrainer, setFoeTrainer] = useState('');
  const [foeGender, setFoeGender] = useState('boy');
  const [foeOutfit, setFoeOutfit] = useState('clasico');
  const [bet, setBet] = useState(0); // monedas que pones tú
  const [foeBet, setFoeBet] = useState(0); // las que pone el rival
  const peerRef = useRef(null);

  // Tu equipo entero, curado para que el combate sea justo
  const miEquipo = useMemo(() => team.map(healFighter), [team]);
  const me = miEquipo[0] || null;

  useEffect(() => () => peerRef.current?.destroy(), []);

  // Intercambiar Pokémon en cuanto haya conexión
  const setupConnection = (connection) => {
    const sayHello = () =>
      connection.send({ type: 'hello', team: miEquipo, fighter: me, trainer: username, gender, outfit, bet });

    if (connection.open) {
      sayHello();
    } else {
      connection.on('open', sayHello);
    }

    connection.on('data', (data) => {
      if (data?.type === 'hello') {
        // Si el rival tiene el juego viejo, solo manda un Pokémon
        const suEquipo = Array.isArray(data.team) && data.team.length > 0 ? data.team : data.fighter ? [data.fighter] : [];
        setFoeTeam(suEquipo);
        setFoeTrainer(data.trainer || 'Rival');
        setFoeGender(data.gender === 'girl' ? 'girl' : 'boy');
        setFoeOutfit(data.outfit || 'clasico');
        setFoeBet(Math.max(0, Number(data.bet) || 0));
        setConn(connection);
        setStatus('');
      }
    });

    connection.on('error', (err) => {
      console.error('Error de conexión:', err);
      setError('Se perdió la conexión. Inténtalo otra vez.');
    });
  };

  const createRoom = () => {
    const newCode = makeCode();
    setMode('host');
    setCode(newCode);
    setError('');
    setStatus('Creando sala...');

    const peer = new Peer(PREFIX + newCode);
    peerRef.current = peer;

    peer.on('open', () => setStatus('Dile el código a tu amigo y espera aquí'));
    peer.on('connection', (connection) => {
      setStatus('¡Alguien se ha conectado!');
      setupConnection(connection);
    });
    peer.on('error', (err) => {
      console.error('Error creando sala:', err);
      setError('No se pudo crear la sala. Vuelve atrás y prueba otra vez.');
    });
  };

  const joinRoom = () => {
    const clean = input.trim().toUpperCase();
    if (clean.length < 4) {
      setError('Escribe el código que te ha dado tu amigo.');
      return;
    }

    setMode('guest');
    setError('');
    setStatus('Conectando...');

    const peer = new Peer();
    peerRef.current = peer;

    peer.on('open', () => setupConnection(peer.connect(PREFIX + clean)));
    peer.on('error', (err) => {
      console.error('Error entrando en la sala:', err);
      setError('No se encontró esa sala. Revisa el código y que tu amigo la tenga abierta.');
    });
  };

  const backToLobby = () => {
    peerRef.current?.destroy();
    peerRef.current = null;
    setConn(null);
    setFoeTeam(null);
    setMode(null);
    setCode('');
    setInput('');
    setStatus('');
  };

  // Ya conectados: a pelear
  if (conn && foeTeam && foeTeam.length > 0 && me) {
    return (
      <OnlineBattle
        conn={conn}
        isHost={mode === 'host'}
        team={miEquipo}
        foeTeam={foeTeam}
        gender={gender}
        outfit={outfit}
        foeTrainer={foeTrainer}
        foeGender={foeGender}
        foeOutfit={foeOutfit}
        bet={Math.min(bet, foeBet, coins)}
        onCoins={onCoins}
        onPlayed={onPlayed}
        onExit={backToLobby}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden p-4">
      <PixelBackground name="mar" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/45 via-slate-900/65 to-slate-900/85" />

      <div className="relative max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={mode ? backToLobby : onBack}
            className="w-12 h-12 bg-white/20 flex items-center justify-center border-4 border-white/40 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition flex-shrink-0"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-base font-black text-white">🌐 {t('Online')}</h1>
        </div>

        {error && (
          <div className="bg-red-500/30 border-4 border-red-300/50 text-white p-3 text-[10px] leading-loose mb-4">
            {t(error)}
          </div>
        )}

        {/* Con qué Pokémon peleas */}
        {me && (
          <div className="bg-white/10 border-4 border-white/30 p-3 mb-5">
            <div className="flex items-center gap-3 mb-2">
              <PixelTrainer gender={gender} outfit={outfit} className="w-10 h-14 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-white/70 text-[9px] leading-loose">{t('Peleas con tu equipo')}</p>
                <p className="text-white font-black text-[10px] leading-loose">
                  {t('{0} Pokémon, todos curados', miEquipo.length)}
                </p>
                <p className="text-white/60 text-[9px] leading-loose">
                  {t('Si uno se debilita, sacas otro. Pierde el primero que se queda sin ninguno.')}
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {miEquipo.map(pokemon => (
                <div key={pokemon.uid} className="bg-black/30 border-2 border-white/20 p-1 text-center w-[4.5rem]">
                  <PokeSprite src={pokemon.sprites.front} alt={pokemon.name} className="w-12 h-12 object-contain mx-auto" />
                  <p className="text-white text-[8px] font-black truncate leading-loose">{pokemon.name}</p>
                  <p className="text-white/60 text-[8px]">{t('Nv. {0}', pokemon.level)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!mode && (
          <div className="space-y-3">
            {/* Apuesta: el que gana se lleva las monedas del otro */}
            <div className="bg-white/10 border-4 border-white/30 p-3">
              <p className="text-white/80 text-[10px] leading-loose mb-1">
                {t('¿Cuántas monedas apuestas? Puedes poner 0.')}
              </p>
              <p className="text-white/60 text-[9px] leading-loose mb-2">
                {t('Tienes 🪙 {0}. El que gana se lleva las del otro. Si apostáis distinto, vale la más baja.', coins)}
              </p>
              <input
                type="number"
                min="0"
                max={coins}
                value={bet}
                onChange={(e) => setBet(Math.max(0, Math.min(coins, Number(e.target.value) || 0)))}
                className="w-full bg-black/30 border-4 border-white/30 text-white px-4 py-3 mb-2 outline-none focus:border-yellow-300 text-center"
              />
              <div className="flex gap-2">
                {[0, 10, 25, 50].map(value => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setBet(Math.min(coins, value))}
                    disabled={value > coins}
                    className={`flex-1 border-4 py-2 text-[10px] font-black text-white transition disabled:opacity-40 ${
                      bet === Math.min(coins, value) ? 'bg-yellow-300/30 border-yellow-300' : 'bg-white/10 border-white/20'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={createRoom}
              className="w-full bg-yellow-400 text-yellow-900 font-black py-4 border-4 border-yellow-900 shadow-[6px_6px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition flex items-center justify-center gap-3"
            >
              <Swords className="w-5 h-5" />
              {t('Crear sala')}
            </button>

            <div className="bg-white/10 border-4 border-white/30 p-3">
              <p className="text-white/80 text-[10px] leading-loose mb-2">{t('¿Te han dado un código?')}</p>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
                placeholder={t('CÓDIGO')}
                maxLength={5}
                className="w-full bg-black/30 border-4 border-white/30 text-white placeholder-white/40 px-4 py-3 mb-2 outline-none focus:border-yellow-300 text-center tracking-widest"
              />
              <button
                onClick={joinRoom}
                className="w-full bg-sky-400 text-sky-900 font-black py-3 border-4 border-sky-900 shadow-[4px_4px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                {t('Unirse')}
              </button>
            </div>

            <p className="text-white/60 text-[9px] leading-loose text-center">
              {t('Los dos tenéis que tener el juego abierto a la vez y conexión a internet.')}
            </p>
          </div>
        )}

        {mode === 'host' && (
          <div className="bg-white/15 border-4 border-white/30 p-5 text-center">
            <p className="text-white/80 text-[10px] leading-loose mb-2">{t('Tu código de sala')}</p>
            <p className="text-yellow-300 font-black text-2xl tracking-widest mb-3">{code}</p>
            <button
              onClick={() => navigator.clipboard?.writeText(code)}
              className="bg-white/20 text-white font-black px-4 py-2 border-4 border-white/40 active:translate-y-1 transition flex items-center justify-center gap-2 mx-auto mb-4"
            >
              <Copy className="w-4 h-4" />
              {t('Copiar')}
            </button>
            <p className="text-white text-[10px] leading-loose">{t(status)}</p>
            <div className="animate-spin text-3xl mt-3">⚡</div>
          </div>
        )}

        {mode === 'guest' && (
          <div className="bg-white/15 border-4 border-white/30 p-5 text-center">
            <p className="text-white font-black text-[10px] leading-loose">{t(status)}</p>
            <div className="animate-spin text-3xl mt-3">⚡</div>
          </div>
        )}
      </div>
    </div>
  );
}
