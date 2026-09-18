import { useState } from 'react';
import { Swords, Users, RotateCcw, BookOpen, Globe, HelpCircle, ShoppingCart, LogOut } from 'lucide-react';
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
import OnlineScreen from './components/OnlineScreen';
import Tutorial from './components/Tutorial';
import PixelEgg from './components/PixelEgg';
import PixelTrainer from './components/PixelTrainer';
import PixelBackground from './components/PixelBackground';
import { VERSION } from './version';

const menuButton = 'w-full font-black py-4 border-4 shadow-[6px_6px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition flex items-center justify-center gap-3 disabled:opacity-50';

export default function App() {
  const { save, startWithTeam, setTrainer, finishBattle, healTeam, swapWithBox, buyItem, useItem, advanceStory, restartStory, markTutorialSeen, wipeSave, resetGame } = useGame();
  const { user, logout } = useAuth();
  const [screen, setScreen] = useState('menu');
  const [opponent, setOpponent] = useState(null); // entrenador de la historia; null = combate salvaje
  const [wildId, setWildId] = useState(null); // Pokémon salvaje elegido en Práctica; null = al azar
  const [showTutorial, setShowTutorial] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [started, setStarted] = useState(false);

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
        scene={opponent?.bg}
        gender={save.gender}
        outfit={save.outfit}
        onFinish={outcome => {
          finishBattle({
            ...outcome,
            story: Boolean(opponent),
            xpAward: opponent ? 20 + opponent.level * 12 : 0
          });
          setScreen(opponent ? 'story' : 'practice');
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

  if (screen === 'team') {
    return (
      <TeamScreen
        save={save}
        onHeal={healTeam}
        onSwap={swapWithBox}
        onUseItem={useItem}
        onBack={() => setScreen('menu')}
      />
    );
  }

  const canFight = save.team.some(pokemon => pokemon.hp > 0);

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
            {save.wins} victorias · {save.losses} derrotas
          </p>
          <p className="text-white/80 font-medium text-[10px] leading-loose">
            🪙 {save.coins} monedas · ⚪ {save.balls} Poké Balls
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <PixelTrainer gender={save.gender} outfit={save.outfit} className="w-7 h-9" />
            <p className="text-yellow-300 font-black text-[10px] leading-loose">{save.username}</p>
          </div>
          <p className="text-white/40 text-[8px] mt-1">{VERSION}</p>
          <p className="text-white/80 font-medium text-[10px] leading-loose">
            Historia: {medalsWon(save.storyStage)} de {MEDALS.length} medallas
          </p>
        </header>

        {/* Equipo en miniatura */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {save.team.map(pokemon => (
            <div
              key={pokemon.uid}
              className={`bg-white/15 border-4 border-white/30 p-1 ${pokemon.hp <= 0 ? 'opacity-40 grayscale' : ''}`}
            >
              <img src={pokemon.sprites.front} alt={pokemon.name} className="w-14 h-14 object-contain" />
              <p className="text-white text-[9px] font-bold text-center">Nv. {pokemon.level}</p>
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
            Historia
          </button>

          <button
            onClick={() => setScreen('practice')}
            disabled={!canFight}
            className={`${menuButton} bg-yellow-400 text-yellow-900 border-yellow-900`}
          >
            <Swords className="w-5 h-5" />
            Práctica
          </button>

          <button
            onClick={() => setScreen('online')}
            className={`${menuButton} bg-sky-400 text-sky-900 border-sky-900`}
          >
            <Globe className="w-5 h-5" />
            Online
          </button>

          {!canFight && (
            <p className="text-white text-center font-bold bg-black/40 border-4 border-white/20 py-3 text-[10px] leading-loose">
              Tu equipo está debilitado. Cúralo en &quot;Mi equipo&quot;.
            </p>
          )}

          <button
            onClick={() => setScreen('shop')}
            className={`${menuButton} bg-fuchsia-500 text-white border-fuchsia-900`}
          >
            <ShoppingCart className="w-5 h-5" />
            Tienda
          </button>

          <button
            onClick={() => setScreen('team')}
            className={`${menuButton} bg-white/20 backdrop-blur text-white border-white/40`}
          >
            <Users className="w-5 h-5" />
            Mi equipo
          </button>

          <button
            onClick={() => setShowTutorial(true)}
            className={`${menuButton} bg-white/10 text-white border-white/30`}
          >
            <HelpCircle className="w-5 h-5" />
            Cómo se juega
          </button>

          <button
            onClick={async () => {
              if (!window.confirm('Al cerrar sesión se borra la partida: equipo, medallas, monedas y objetos. ¿Seguro?')) return;
              await logout();
              wipeSave();
              setStarted(false);
            }}
            className={`${menuButton} bg-white/10 text-white border-white/30`}
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>

          <button
            onClick={() => setShowReset(true)}
            className={`${menuButton} bg-red-900 text-white border-red-300`}
          >
            <PixelEgg className="w-5 h-6" />
            Empezar de cero
          </button>
        </div>
      </div>

      {/* Aviso antes de borrar la partida */}
      {showReset && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="max-w-sm w-full bg-red-700 border-4 border-yellow-300 shadow-[8px_8px_0_rgba(0,0,0,0.6)] p-5 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-4xl animate-pulse">⚠️</span>
              <PixelEgg className="w-10 h-12 animate-float" />
            </div>
            <h2 className="text-yellow-300 font-black text-sm leading-loose mb-3">¡CUIDADO!</h2>
            <p className="text-white text-[10px] leading-loose mb-2">
              Esto va a reiniciar el juego.
            </p>
            <p className="text-white/80 text-[10px] leading-loose mb-5">
              Perderás tu equipo, tus Pokémon capturados y las {STORY.length} medallas de la historia. No se puede
              deshacer.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  resetGame();
                  setShowReset(false);
                  setScreen('menu');
                }}
                className="w-full bg-yellow-300 text-red-900 font-black py-3 border-4 border-yellow-100 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Sí, reiniciar
              </button>
              <button
                onClick={() => setShowReset(false)}
                className="w-full bg-white/20 text-white font-black py-3 border-4 border-white/40 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition"
              >
                No, volver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
