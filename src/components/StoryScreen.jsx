import { useState } from 'react';
import { ArrowLeft, Swords, Play } from 'lucide-react';
import { STORY, MEDALS, medalsWon } from '../data/story';
import { spriteUrl } from '../services/pokeapi';
import PixelScene from './PixelScene';
import PixelDialog from './PixelDialog';
import { canFloat } from '../data/floaters';

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
export default function StoryScreen({ stage, onAdvance, onFight, onRestart, onBack, creator = false }) {
  const [askRestart, setAskRestart] = useState(false);
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
          <div className="space-y-3">
            <button
              onClick={onRestart}
              className="w-full bg-amber-500 text-white font-black py-3 border-4 border-amber-900 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition"
            >
              Jugar la historia otra vez
            </button>
            <button
              onClick={onBack}
              className="w-full bg-white text-amber-800 font-black py-3 border-4 border-amber-900 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition"
            >
              Volver al menú
            </button>
          </div>
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

        {creator && (
          <span className="bg-fuchsia-500 text-white text-[8px] font-black px-2 py-1 flex-shrink-0">CREADOR</span>
        )}

        <button
          onClick={() => setAskRestart(true)}
          className="ml-auto bg-black/30 text-white font-black px-3 py-2 border-4 border-white/40 active:translate-y-1 transition text-[9px] flex-shrink-0"
          title="Empezar la historia otra vez"
        >
          🔄
        </button>
      </div>

      {askRestart && (
        <PixelDialog
          icon="📖"
          tone="info"
          title="¿Empezar de nuevo?"
          confirmText="Sí, desde el principio"
          onConfirm={() => {
            setAskRestart(false);
            onRestart();
          }}
          onCancel={() => setAskRestart(false)}
        >
          La historia volverá a la primera escena y perderás las medallas conseguidas. Tu equipo, tus monedas y tus
          objetos se quedan como están.
        </PixelDialog>
      )}

      {/* Escena */}
      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col justify-center py-6">
        {/* Viñeta del cuento: el dibujo del sitio con los Pokémon encima */}
        <div className="relative h-52 sm:h-72 border-4 border-white/50 shadow-[6px_6px_0_rgba(0,0,0,0.5)] overflow-hidden mb-4">
          <div className="absolute inset-0 animate-camera">
            <PixelScene name={step.bg} className="absolute inset-0 w-full h-full" />
          </div>
          {/* Los Pokémon pisan el suelo: los sprites traen hueco transparente abajo,
              así que se bajan un poco y la sombra se pone justo en los pies */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-4 pb-1">
            {(step.sprites || [step.pokemonId]).filter(Boolean).map((id, index, todos) => {
              const flota = canFloat(id);

              return (
                <div key={`${id}-${index}`} className="flex flex-col items-center">
                  <img
                    src={spriteUrl(id)}
                    alt=""
                    className={`object-contain ${flota ? 'animate-float' : ''} ${
                      todos.length === 1 ? 'w-36 h-36 sm:w-48 sm:h-48' : 'w-24 h-24 sm:w-32 sm:h-32'
                    }`}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      // Los que no vuelan se bajan hasta apoyar los pies
                      transform: flota ? undefined : 'translateY(11%)'
                    }}
                  />
                  <div className={`w-14 h-1.5 bg-black/55 ${flota ? '-mt-2' : '-mt-1'}`} />
                  <div className="w-9 h-1 bg-black/35" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Cuadro de texto, con el nombre de quien habla */}
        <div>
          {step.speaker && (
            <div className="inline-flex items-stretch">
              <div className="w-1.5 bg-yellow-300" />
              <p className="bg-black/85 border-t-4 border-r-4 border-white/50 px-3 py-1 text-yellow-300 font-black text-[10px] leading-loose">
                {step.speaker}
              </p>
            </div>
          )}
          <div className="bg-black/75 border-4 border-white/50 shadow-[6px_6px_0_rgba(0,0,0,0.5)] p-4">
            {step.type === 'battle' && (
              <p className="text-red-300 font-black text-[10px] leading-loose mb-2">⚔️ {step.trainer}</p>
            )}
            <p className="text-white text-[10px] leading-loose">{step.text}</p>
          </div>
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

            {/* Solo el creador puede saltarse el combate */}
            {creator && (
              <button
                onClick={onAdvance}
                className="w-full mt-2 bg-fuchsia-600 text-white font-black py-3 border-4 border-fuchsia-200 shadow-[4px_4px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition text-[10px]"
                title="Solo lo ves tú"
              >
                ⭐ Saltar este combate
              </button>
            )}
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
