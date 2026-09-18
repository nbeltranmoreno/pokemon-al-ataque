import { ArrowLeft, Swords, Play } from 'lucide-react';
import { STORY, MEDALS, medalsWon } from '../data/story';
import { spriteUrl } from '../services/pokeapi';
import PixelScene from './PixelScene';

const BACKGROUNDS = {
  pueblo: 'from-sky-400 via-sky-600 to-green-700',
  ruta: 'from-amber-300 via-lime-600 to-green-800',
  bosque: 'from-green-500 via-green-800 to-emerald-950',
  cueva: 'from-slate-500 via-slate-700 to-slate-950',
  mar: 'from-cyan-300 via-blue-600 to-blue-950',
  volcan: 'from-orange-400 via-red-700 to-rose-950',
  torre: 'from-fuchsia-500 via-purple-800 to-indigo-950',
  liga: 'from-yellow-300 via-amber-600 to-orange-900'
};

/**
 * Historia en forma de cuento: escenas con dibujo y texto que se van pasando,
 * y de vez en cuando un combate con el Pokémon que presta la historia
 */
export default function StoryScreen({ stage, onAdvance, onFight, onBack }) {
  const step = STORY[stage];
  const won = medalsWon(stage);

  // Final de la historia
  if (!step) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-300 via-amber-600 to-orange-900 p-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <p className="text-5xl mb-4 animate-float">👑</p>
          <h1 className="text-lg font-black text-white drop-shadow-[4px_4px_0_rgba(0,0,0,0.6)] leading-loose mb-3">
            ¡Eres el Campeón!
          </h1>
          <p className="text-white/90 text-[10px] leading-loose mb-5">
            Has terminado la historia con las {MEDALS.length} medallas.
          </p>
          <div className="flex justify-center gap-2 flex-wrap mb-6">
            {MEDALS.map(medal => (
              <span key={medal} className="w-10 h-10 bg-white/20 border-4 border-yellow-300 flex items-center justify-center text-lg">
                {medal}
              </span>
            ))}
          </div>
          <button
            onClick={onBack}
            className="bg-white text-amber-800 font-black px-6 py-3 border-4 border-amber-900 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition"
          >
            Volver al menú
          </button>
        </div>
      </div>
    );
  }

  const background = BACKGROUNDS[step.bg] || BACKGROUNDS.ruta;

  return (
    <div className={`min-h-screen bg-gradient-to-b ${background} p-4 flex flex-col`}>
      {/* Barra de arriba: volver y medallas */}
      <div className="max-w-2xl w-full mx-auto flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-black/30 flex items-center justify-center border-4 border-white/40 active:translate-y-1 transition flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex gap-1 flex-wrap">
          {MEDALS.map((medal, index) => (
            <span
              key={medal}
              className={`w-7 h-7 flex items-center justify-center border-2 text-xs ${
                index < won ? 'bg-yellow-300/40 border-yellow-200' : 'bg-black/30 border-white/20 opacity-50'
              }`}
            >
              {medal}
            </span>
          ))}
        </div>
      </div>

      {/* Escena */}
      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col justify-center py-6">
        {/* Viñeta del cuento: el dibujo del sitio con los Pokémon encima */}
        <div className="relative h-44 sm:h-56 border-4 border-white/50 shadow-[6px_6px_0_rgba(0,0,0,0.5)] overflow-hidden mb-4">
          <PixelScene name={step.bg} className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 flex items-end justify-center gap-3 pb-3">
            {(step.sprites || [step.pokemonId]).filter(Boolean).map((id, index) => (
              <img
                key={`${id}-${index}`}
                src={spriteUrl(id)}
                alt=""
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] animate-float"
                style={{ animationDelay: `${index * 0.4}s` }}
              />
            ))}
          </div>
        </div>

        {/* Cuadro de texto */}
        <div className="bg-black/70 border-4 border-white/50 shadow-[6px_6px_0_rgba(0,0,0,0.5)] p-4">
          {step.type === 'battle' && (
            <p className="text-red-300 font-black text-[10px] leading-loose mb-2">⚔️ {step.trainer}</p>
          )}
          <p className="text-white text-[10px] leading-loose">{step.text}</p>
        </div>

        {/* Botón para seguir o para pelear */}
        {step.type === 'battle' ? (
          <div className="mt-4">
            <div className="bg-white/15 border-4 border-white/30 p-3 flex items-center gap-3 mb-3">
              <img src={spriteUrl(step.myPokemonId)} alt="" className="w-14 h-14 object-contain flex-shrink-0" />
              <p className="text-white text-[9px] leading-loose">
                Peleas con el Pokémon que te presta la historia, nivel {step.myLevel}. Tu equipo se queda descansando.
              </p>
            </div>
            <button
              onClick={() => onFight(step)}
              className="w-full bg-red-500 text-white font-black py-4 border-4 border-red-900 shadow-[6px_6px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition flex items-center justify-center gap-2"
            >
              <Swords className="w-5 h-5" />
              ¡Luchar!
            </button>
          </div>
        ) : (
          <button
            onClick={onAdvance}
            className="w-full mt-4 bg-yellow-400 text-yellow-900 font-black py-4 border-4 border-yellow-900 shadow-[6px_6px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Continuar
          </button>
        )}

        <p className="text-white/60 text-[9px] text-center mt-3">
          Escena {stage + 1} de {STORY.length}
        </p>
      </div>
    </div>
  );
}
