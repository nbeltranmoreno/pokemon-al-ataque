import { useState, useEffect } from 'react';
import PokeSprite from './components/PokeSprite';
import { Swords, Users, BookOpen, Globe, HelpCircle, ShoppingCart, LogOut, Sparkles, Target } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import UsernameSetup from './components/UsernameSetup';
import StartScreen from './components/StartScreen';
import { useGame } from './hooks/useGame';
import { xpToNextLevel } from './game/battle';
import { STORY, MEDALS, medalsWon } from './data/story';
import TeamSelect from './components/TeamSelect';
import BattleScreen from './components/BattleScreen';
import TeamScreen from './components/TeamScreen';
import StoryScreen from './components/StoryScreen';
import PracticeSelect from './components/PracticeSelect';
import ShopScreen from './components/ShopScreen';
import PokeShopScreen from './components/PokeShopScreen';
import MissionsScreen from './components/MissionsScreen';
import OnlineScreen from './components/OnlineScreen';
import Tutorial from './components/Tutorial';
import CaughtLog from './components/CaughtLog';
import CreatorPicker from './components/CreatorPicker';
import PixelEgg from './components/PixelEgg';
import PixelTrainer from './components/PixelTrainer';
import PixelBackground from './components/PixelBackground';
import PixelDialog from './components/PixelDialog';
import { isCreator } from './data/creator';
import { VERSION } from './version';
import { COINS_PER_BLOCK, idleBlocks, msToNextCoins } from './game/idle';
import { useLang } from './i18n';
import { misionesListas } from './data/misiones';
import LangButton from './components/LangButton';

const menuButton = 'w-full font-black py-4 border-4 shadow-[6px_6px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition flex items-center justify-center gap-3 disabled:opacity-50';

export default function App() {
  const { save, startWithTeam, setTrainer, payIdleCoins, registrarEntrada, cobrarMision, notarOnline, notarIngles, finishBattle, healTeam, swapWithBox, buyItem, useItem, advanceStory, restartStory, addPokemon, buyPokemon, addCoins, sellPokemon, toggleCreatorMode, markTutorialSeen, wipeSave, resetGame } = useGame();
  const { user, logout } = useAuth();
  const { t, lang } = useLang();
  const [screen, setScreen] = useState('menu');
  const [opponent, setOpponent] = useState(null); // entrenador de la historia; null = combate salvaje
  const [wildId, setWildId] = useState(null); // Pokémon salvaje elegido en Práctica; null = al azar
  const [battleMode, setBattleMode] = useState('practice'); // 'practice' (entrenar) o 'wild' (peleas de verdad)
  const [showTutorial, setShowTutorial] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [started, setStarted] = useState(false);
  const [taps, setTaps] = useState(0); // toques en la versión para desbloquear el modo creador
  const [ahora, setAhora] = useState(() => Date.now()); // para ir contando los minutos que faltan
  const [regalo, setRegalo] = useState(0); // monedas del reloj recién cobradas

  // Cada poco se mira el reloj: si han pasado 10 minutos, caen 5 monedas
  useEffect(() => {
    const mirar = () => {
      setAhora(Date.now());
      const ganadas = idleBlocks(save.lastCoinAt) * COINS_PER_BLOCK;
      if (ganadas > 0) {
        payIdleCoins();
        setRegalo(ganadas);
      }
    };

    mirar();
    const reloj = setInterval(mirar, 15000);
    return () => clearInterval(reloj);
    // save.lastCoinAt cambia al cobrar, así que el reloj se reengancha solo
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [save.lastCoinAt]);

  // Al abrir el juego se apunta que hoy has entrado
  useEffect(() => {
    registrarEntrada();
    // Solo hace falta al empezar
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Quien prueba el juego en inglés se lleva su logro
  useEffect(() => {
    if (lang === 'en') notarIngles();
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // El cartelito de las monedas se va solo
  useEffect(() => {
    if (!regalo) return;
    const tiempo = setTimeout(() => setRegalo(0), 5000);
    return () => clearTimeout(tiempo);
  }, [regalo]);

  const minutosParaMonedas = Math.max(1, Math.ceil(msToNextCoins(save.lastCoinAt, ahora) / 60000));

  // Portada: un botón para entrar
  if (!started) {
    return (
      <StartScreen
        user={user}
        username={save.username}
        hasGame={save.team.length > 0}
        onStart={() => setStarted(true)}
      />
    );
  }

  // Cuenta y nombre de entrenador
  if (!user) {
    return <Login />;
  }

  if (!save.username) {
    return <UsernameSetup onSave={setTrainer} />;
  }

  const creator = isCreator(user) || save.creatorMode;

  // Solo quien empieza de nuevo elige equipo
  if (save.team.length === 0) {
    return <TeamSelect onReady={team => startWithTeam(team)} />;
  }

  // Tutorial: la primera vez sale solo, y también desde el menú
  if (showTutorial || !save.tutorialSeen) {
    return (
      <Tutorial
        onClose={() => {
          setShowTutorial(false);
          markTutorialSeen();
        }}
      />
    );
  }

  if (screen === 'battle') {
    return (
      <BattleScreen
        team={save.team}
        balls={save.balls}
        opponent={opponent}
        wildId={wildId}
        storyFighter={opponent ? { pokemonId: opponent.myPokemonId, level: opponent.myLevel } : null}
        mode={opponent ? 'story' : battleMode}
        scene={opponent?.bg}
        gender={save.gender}
        outfit={save.outfit}
        onFinish={outcome => {
          finishBattle({
            ...outcome,
            mode: opponent ? 'story' : battleMode,
            xpAward: opponent ? 20 + opponent.level * 12 : 0
          });
          setScreen(opponent ? 'story' : battleMode === 'wild' ? 'menu' : 'practice');
          setOpponent(null);
          setWildId(null);
        }}
      />
    );
  }

  if (screen === 'story') {
    return (
      <StoryScreen
        stage={Math.min(save.storyStage, STORY.length)}
        onAdvance={advanceStory}
        onRestart={restartStory}
        creator={creator}
        onFight={step => {
          setOpponent(step);
          setScreen('battle');
        }}
        onBack={() => setScreen('menu')}
      />
    );
  }

  if (screen === 'practice') {
    return (
      <PracticeSelect
        onChoose={id => {
          setOpponent(null);
          setWildId(id);
          setScreen('battle');
        }}
        onRandom={() => {
          setOpponent(null);
          setWildId(null);
          setScreen('battle');
        }}
        onBack={() => setScreen('menu')}
      />
    );
  }

  if (screen === 'online') {
    return (
      <OnlineScreen
        team={save.team}
        username={save.username}
        gender={save.gender}
        outfit={save.outfit}
        coins={save.coins}
        onCoins={addCoins}
        onPlayed={notarOnline}
        onBack={() => setScreen('menu')}
      />
    );
  }

  // Pantalla del creador: solo para su cuenta
  if (screen === 'creator' && creator) {
    return <CreatorPicker onAdd={addPokemon} onBack={() => setScreen('menu')} />;
  }

  if (screen === 'history') {
    return (
      <CaughtLog
        team={save.team}
        box={save.box}
        caughtLog={save.caughtLog}
        onBack={() => setScreen('menu')}
      />
    );
  }

  if (screen === 'shop') {
    return (
      <ShopScreen
        coins={save.coins}
        balls={save.balls}
        inventory={save.inventory}
        onBuy={buyItem}
        onBack={() => setScreen('menu')}
      />
    );
  }

  if (screen === 'missions') {
    return <MissionsScreen save={save} onCobrar={cobrarMision} onBack={() => setScreen('menu')} />;
  }

  if (screen === 'pokeshop') {
    return <PokeShopScreen save={save} onBuy={buyPokemon} onBack={() => setScreen('menu')} />;
  }

  if (screen === 'team') {
    return (
      <TeamScreen
        save={save}
        onSwap={swapWithBox}
        onUseItem={useItem}
        onSell={sellPokemon}
        onRescue={healTeam}
        onBack={() => setScreen('menu')}
      />
    );
  }

  const canFight = save.team.some(pokemon => pokemon.hp > 0);
  const listas = misionesListas(save); // misiones terminadas sin cobrar

  return (
    <div className="relative min-h-screen overflow-hidden p-4 flex items-center justify-center">
      <PixelBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/25 via-slate-900/55 to-slate-900/85" />

      <div className="relative max-w-md w-full py-6">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-black text-white drop-shadow-[4px_4px_0_rgba(0,0,0,0.6)] leading-loose">
            Pokémon
            <br />
            <span className="text-yellow-300">Al Ataque</span>
          </h1>
          <p className="text-white/80 font-medium mt-4 text-[10px] leading-loose">
            {t('{0} victorias · {1} derrotas', save.wins, save.losses)}
          </p>
          <p className="text-white/80 font-medium text-[10px] leading-loose">
            {t('🪙 {0} monedas · ⚪ {1} Poké Balls', save.coins, save.balls)}
          </p>
          <p className="text-yellow-300/90 font-medium text-[9px] leading-loose">
            {t('⏱ +{0} 🪙 gratis cada 10 minutos · las siguientes en {1} min', COINS_PER_BLOCK, minutosParaMonedas)}
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <PixelTrainer gender={save.gender} outfit={save.outfit} className="w-8 h-11" />
            <p className="text-yellow-300 font-black text-[10px] leading-loose">{save.username}</p>
            {creator && <span className="bg-fuchsia-500 text-white text-[8px] font-black px-2 py-0.5">{t('CREADOR')}</span>}
          </div>
          <p className="text-white/50 text-[8px] leading-loose truncate">{user.email}</p>
          <LangButton className="mt-2" />
          <p
            className="text-white/40 text-[8px] mt-1 cursor-pointer select-none"
            onClick={() => {
              const next = taps + 1;
              setTaps(next);
              if (next >= 7) {
                setTaps(0);
                toggleCreatorMode();
              }
            }}
          >
            {VERSION}
          </p>
          <p className="text-white/80 font-medium text-[10px] leading-loose">
            {t('Historia: {0} de {1} medallas', medalsWon(save.storyStage), MEDALS.length)}
          </p>
        </header>

        {/* Equipo en miniatura */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {save.team.map(pokemon => (
            <div
              key={pokemon.uid}
              className={`bg-white/15 border-4 border-white/30 p-1 ${pokemon.hp <= 0 ? 'opacity-40 grayscale' : ''}`}
            >
              <PokeSprite src={pokemon.sprites.front} alt={pokemon.name} className="w-14 h-14 object-contain" />
              <p className="text-white text-[9px] font-bold text-center">{t('Nv. {0}', pokemon.level)}</p>
              {/* Experiencia hacia el siguiente nivel */}
              <div className="h-1.5 w-full bg-black/40 border border-white/30">
                <div
                  className="h-full bg-cyan-400"
                  style={{ width: `${Math.min(100, (pokemon.xp / xpToNextLevel(pokemon.level)) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setScreen('story')}
            className={`${menuButton} bg-amber-400 text-amber-900 border-amber-900`}
          >
            <BookOpen className="w-5 h-5" />
            {t('Historia')}
          </button>

          <button
            onClick={() => {
              setBattleMode('practice');
              setScreen('practice');
            }}
            disabled={!canFight}
            className={`${menuButton} bg-yellow-400 text-yellow-900 border-yellow-900`}
          >
            <Swords className="w-5 h-5" />
            {t('Práctica')}
          </button>

          <button
            onClick={() => {
              setBattleMode('wild');
              setOpponent(null);
              setWildId(null);
              setScreen('battle');
            }}
            disabled={!canFight}
            className={`${menuButton} bg-orange-500 text-white border-orange-900`}
          >
            <Swords className="w-5 h-5" />
            {t('Peleas')}
          </button>

          <button
            onClick={() => setScreen('online')}
            className={`${menuButton} bg-sky-400 text-sky-900 border-sky-900`}
          >
            <Globe className="w-5 h-5" />
            {t('Online')}
          </button>

          {/* Botones del creador: aquí arriba, junto a los modos de juego */}
          {creator && (
            <>
              <button
                onClick={() => setScreen('creator')}
                className={`${menuButton} bg-fuchsia-600 text-white border-fuchsia-200`}
                title={t('Solo lo ves tú')}
              >
                <Sparkles className="w-5 h-5" />
                {t('Coger Pokémon')}
              </button>

              <button
                onClick={healTeam}
                className={`${menuButton} bg-fuchsia-600 text-white border-fuchsia-200`}
                title={t('Solo lo ves tú')}
              >
                <Sparkles className="w-5 h-5" />
                {t('Curar equipo al instante')}
              </button>
            </>
          )}

          {!canFight && (
            <p className="text-white text-center font-bold bg-black/40 border-4 border-white/20 py-3 text-[10px] leading-loose">
              {t('Tu equipo está debilitado. Compra Pociones o Revivir en la Tienda y úsalos en "Mi equipo".')}
            </p>
          )}

          <button
            onClick={() => setScreen('missions')}
            className={`${menuButton} bg-lime-400 text-lime-900 border-lime-900 relative`}
          >
            <Target className="w-5 h-5" />
            {t('Misiones')}
            {listas > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black w-6 h-6 flex items-center justify-center border-2 border-white">
                {listas}
              </span>
            )}
          </button>

          <button
            onClick={() => setScreen('shop')}
            className={`${menuButton} bg-fuchsia-500 text-white border-fuchsia-900`}
          >
            <ShoppingCart className="w-5 h-5" />
            {t('Tienda')}
          </button>

          <button
            onClick={() => setScreen('pokeshop')}
            className={`${menuButton} bg-emerald-500 text-white border-emerald-900`}
          >
            <ShoppingCart className="w-5 h-5" />
            {t('Tienda de Pokémon')}
          </button>

          <button
            onClick={() => setScreen('team')}
            className={`${menuButton} bg-white/20 backdrop-blur text-white border-white/40`}
          >
            <Users className="w-5 h-5" />
            {t('Mi equipo')}
          </button>

          <button
            onClick={() => setScreen('history')}
            className={`${menuButton} bg-white/20 backdrop-blur text-white border-white/40`}
          >
            <BookOpen className="w-5 h-5" />
            {t('Mi colección')}
          </button>

          <button
            onClick={() => setShowTutorial(true)}
            className={`${menuButton} bg-white/10 text-white border-white/30`}
          >
            <HelpCircle className="w-5 h-5" />
            {t('Cómo se juega')}
          </button>

          <button
            onClick={() => setShowLogout(true)}
            className={`${menuButton} bg-white/10 text-white border-white/30`}
          >
            <LogOut className="w-5 h-5" />
            {t('Cerrar sesión')}
          </button>

          <button
            onClick={() => setShowReset(true)}
            className={`${menuButton} bg-red-900 text-white border-red-300`}
          >
            <PixelEgg className="w-5 h-6" />
            {t('Empezar de cero')}
          </button>
        </div>
      </div>

      {/* Las monedas del reloj, cuando caen */}
      {regalo > 0 && (
        <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
          <p className="bg-yellow-400 text-yellow-900 font-black text-[10px] leading-loose px-4 py-2 border-4 border-yellow-900 shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
            {t('¡+{0} monedas por seguir jugando!', regalo)}
          </p>
        </div>
      )}

      {/* Aviso antes de borrar la partida */}
      {showReset && (
        <PixelDialog
          icon={
            <>
              <span className="text-4xl animate-pulse">⚠️</span>
              <PixelEgg className="w-10 h-12 animate-float" />
            </>
          }
          title={t('¡CUIDADO!')}
          confirmText={t('Sí, reiniciar')}
          onConfirm={() => {
            resetGame();
            setShowReset(false);
            setScreen('menu');
          }}
          onCancel={() => setShowReset(false)}
        >
          {t('Esto va a reiniciar el juego. Perderás tu equipo, tus Pokémon capturados y las {0} medallas de la historia. No se puede deshacer.', MEDALS.length)}
        </PixelDialog>
      )}

      {/* Aviso antes de cerrar sesión */}
      {showLogout && (
        <PixelDialog
          icon="👋"
          title={t('¿Cerrar sesión?')}
          confirmText={t('Sí, cerrar sesión')}
          onConfirm={async () => {
            setShowLogout(false);
            await logout();
            wipeSave();
            setStarted(false);
          }}
          onCancel={() => setShowLogout(false)}
        >
          {t('Al cerrar sesión se borra la partida de este dispositivo: equipo, medallas, monedas y objetos. El siguiente que entre empezará desde cero.')}
        </PixelDialog>
      )}
    </div>
  );
}
