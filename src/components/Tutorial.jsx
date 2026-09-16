import { useState } from 'react';

const STEPS = [
  {
    emoji: '⚔️',
    title: 'Combates por turnos',
    text: 'Elige un ataque y tu Pokémon golpeará. Si el rival es más rápido, él pega primero en ese turno.'
  },
  {
    emoji: '🔥',
    title: 'Los tipos mandan',
    text: 'Fuego gana a planta, agua gana a fuego, planta gana a agua. Mira el color del tipo en cada ataque.'
  },
  {
    emoji: '⚪',
    title: 'Captura Pokémon',
    text: 'En Práctica puedes lanzar Poké Balls. Cuanta menos vida le quede al salvaje, más fácil es atraparlo.'
  },
  {
    emoji: '⭐',
    title: 'Sube de nivel',
    text: 'Ganar combates da experiencia. Al subir de nivel tu Pokémon aguanta más y pega más fuerte.'
  },
  {
    emoji: '💚',
    title: 'Cura a tu equipo',
    text: 'Si tus Pokémon se debilitan, entra en "Mi equipo" y pulsa "Curar a todo el equipo".'
  },
  {
    emoji: '📖',
    title: 'Modo Historia',
    text: 'Vence a los 8 entrenadores, uno detrás de otro, hasta ganar al Campeón.'
  }
];

/**
 * Tutorial que se muestra la primera vez que se juega (y desde el menú)
 */
export default function Tutorial({ onClose }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const last = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 border-4 border-white/40 shadow-[8px_8px_0_rgba(0,0,0,0.5)] p-5">
        <p className="text-center text-5xl mb-4">{current.emoji}</p>
        <h2 className="text-white font-black text-xs text-center leading-loose mb-3">{current.title}</h2>
        <p className="text-white/85 text-[10px] leading-loose text-center min-h-[60px]">{current.text}</p>

        {/* Puntos de avance */}
        <div className="flex justify-center gap-2 my-5">
          {STEPS.map((_, i) => (
            <span key={i} className={`w-3 h-3 border-2 border-white/60 ${i === step ? 'bg-yellow-300' : 'bg-transparent'}`} />
          ))}
        </div>

        <div className="flex gap-2">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 bg-white/20 text-white font-black py-3 border-4 border-white/40 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition"
            >
              Atrás
            </button>
          )}
          <button
            onClick={() => (last ? onClose() : setStep(step + 1))}
            className="flex-1 bg-yellow-400 text-yellow-900 font-black py-3 border-4 border-yellow-900 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition"
          >
            {last ? '¡A jugar!' : 'Siguiente'}
          </button>
        </div>

        {!last && (
          <button onClick={onClose} className="w-full text-white/60 hover:text-white mt-4 text-[10px]">
            Saltar tutorial
          </button>
        )}
      </div>
    </div>
  );
}
