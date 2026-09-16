import { useState } from 'react';
import { Swords, Users, RotateCcw } from 'lucide-react';
import { useGame } from './hooks/useGame';
import TeamSelect from './components/TeamSelect';
import BattleScreen from './components/BattleScreen';
import TeamScreen from './components/TeamScreen';

export default function App() {
  const { save, startWithTeam, finishBattle, healTeam, swapWithBox, resetGame } = useGame();
  const [screen, setScreen] = useState('menu');

  // Sin equipo todavía: elegir los Pokémon iniciales
  if (save.team.length === 0) {
    return <TeamSelect onReady={team => startWithTeam(team)} />;
  }

  if (screen === 'battle') {
    return (
      <BattleScreen
        team={save.team}
        balls={save.balls}
        onFinish={outcome => {
          finishBattle(outcome);
          setScreen('menu');
        }}
      />
    );
  }

  if (screen === 'team') {
    return (
      <TeamScreen
        save={save}
        onHeal={healTeam}
        onSwap={swapWithBox}
        onBack={() => setScreen('menu')}
      />
    );
  }

  const canFight = save.team.some(pokemon => pokemon.hp > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-rose-700 to-red-900 p-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-black text-white drop-shadow-[4px_4px_0_rgba(0,0,0,0.6)] leading-loose">
            Pokémon
            <br />
            <span className="text-yellow-300">Al Ataque</span>
          </h1>
          <p className="text-white/80 font-medium mt-4 text-[10px] leading-loose">
            {save.wins} victorias · {save.losses} derrotas · {save.balls} Poké Balls
          </p>
        </header>

        {/* Equipo en miniatura */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {save.team.map(pokemon => (
            <div
              key={pokemon.uid}
              className={`bg-white/15 backdrop-blur rounded-2xl p-2 border-2 border-white/20 ${
                pokemon.hp <= 0 ? 'opacity-40 grayscale' : ''
              }`}
            >
              <img src={pokemon.sprites.front} alt={pokemon.name} className="w-14 h-14 object-contain" />
              <p className="text-white text-[11px] font-bold text-center">Nv. {pokemon.level}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setScreen('battle')}
            disabled={!canFight}
            className="w-full bg-yellow-400 text-yellow-900 font-black py-5 border-4 border-yellow-900 shadow-[6px_6px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition text-sm flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <Swords className="w-7 h-7" />
            ¡Combatir!
          </button>

          {!canFight && (
            <p className="text-white text-center font-bold bg-black/30 rounded-xl py-2">
              Tu equipo está debilitado. Cúralo en "Mi equipo".
            </p>
          )}

          <button
            onClick={() => setScreen('team')}
            className="w-full bg-white/20 backdrop-blur text-white font-black py-4 border-4 border-white/40 shadow-[6px_6px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition flex items-center justify-center gap-3"
          >
            <Users className="w-6 h-6" />
            Mi equipo
          </button>

          <button
            onClick={() => {
              if (window.confirm('¿Seguro que quieres empezar de cero? Perderás tu equipo y tus capturas.')) {
                resetGame();
              }
            }}
            className="w-full text-white/70 hover:text-white font-bold py-2 flex items-center justify-center gap-2 text-sm transition"
          >
            <RotateCcw className="w-4 h-4" />
            Empezar de cero
          </button>
        </div>
      </div>
    </div>
  );
}
