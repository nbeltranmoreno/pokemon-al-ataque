import { ArrowLeft, Lock, Check, Swords } from 'lucide-react';
import { STORY } from '../data/story';

/**
 * Modo historia: lista de entrenadores, se desbloquean uno a uno
 */
export default function StoryScreen({ stage, canFight, onFight, onBack }) {
  const finished = stage >= STORY.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-700 via-orange-800 to-red-900 p-4">
      <div className="max-w-md mx-auto pb-10">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white/20 flex items-center justify-center border-4 border-white/40 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition flex-shrink-0"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-base font-black text-white">📖 Historia</h1>
        </div>

        {finished && (
          <div className="bg-yellow-400 text-yellow-900 border-4 border-yellow-900 shadow-[6px_6px_0_rgba(0,0,0,0.5)] p-4 text-center mb-6">
            <p className="text-sm font-black leading-loose">👑 ¡Eres el Campeón!</p>
            <p className="text-[10px] mt-2 leading-loose">Has vencido a todos los entrenadores</p>
          </div>
        )}

        <div className="space-y-3">
          {STORY.map((step, index) => {
            const done = index < stage;
            const current = index === stage;
            const locked = index > stage;

            return (
              <div
                key={step.id}
                className={`border-4 p-3 flex items-center gap-3 ${
                  current
                    ? 'bg-white/25 border-yellow-300 shadow-[6px_6px_0_rgba(0,0,0,0.4)]'
                    : done
                      ? 'bg-white/10 border-green-400/60'
                      : 'bg-black/20 border-white/20 opacity-60'
                }`}
              >
                <span className="text-2xl flex-shrink-0">{step.medal}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-black text-[10px] truncate leading-loose">{step.trainer}</p>
                  <p className="text-white/70 text-[10px]">Nivel {step.level}</p>
                </div>

                {done && <Check className="w-6 h-6 text-green-300 flex-shrink-0" strokeWidth={4} />}
                {locked && <Lock className="w-5 h-5 text-white/50 flex-shrink-0" />}
                {current && (
                  <button
                    onClick={() => onFight(step)}
                    disabled={!canFight}
                    className="bg-yellow-400 text-yellow-900 font-black px-4 py-3 border-4 border-yellow-900 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition disabled:opacity-40 flex items-center gap-2 flex-shrink-0"
                  >
                    <Swords className="w-4 h-4" /> Luchar
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {!canFight && (
          <p className="text-white bg-black/40 border-4 border-white/20 p-3 text-center text-[10px] leading-loose mt-6">
            Tu equipo está debilitado. Cúralo en &quot;Mi equipo&quot;.
          </p>
        )}
      </div>
    </div>
  );
}
