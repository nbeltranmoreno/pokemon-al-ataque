import { useState } from 'react';

// Sprites de PokéAPI (los mismos que usa el juego)
const front = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
const back = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;

const Bar = ({ percent, color, className = '' }) => (
  <div className={`h-3 w-full bg-black/40 border-2 border-white/40 ${className}`}>
    <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
  </div>
);

// Cada paso es una escena animada con una frase corta
const STEPS = [
  {
    caption: 'Eliges un ataque y tu Pokémon golpea. El más rápido pega primero.',
    scene: (
      <div className="relative w-full h-40">
        <img src={front(1)} alt="" className="w-20 h-20 absolute top-0 right-6 animate-counter" />
        <span className="absolute top-0 right-24 text-red-400 font-black text-sm animate-pulse">-13</span>
        <img src={back(4)} alt="" className="w-24 h-24 absolute bottom-0 left-4 animate-attack" />
        <span className="absolute bottom-6 left-28 text-2xl animate-attack">💥</span>
      </div>
    )
  },
  {
    caption: 'Cada tipo gana a otro: fuego a planta, planta a agua, agua a fuego.',
    scene: (
      <div className="w-full h-40 flex items-center justify-center gap-1">
        {[
          { id: 4, type: 'FUEGO', color: 'bg-orange-500' },
          { id: 1, type: 'PLANTA', color: 'bg-green-500' },
          { id: 7, type: 'AGUA', color: 'bg-blue-500' }
        ].map((item, index) => (
          <div key={item.id} className="flex items-center gap-1">
            <div className="text-center">
              <img src={front(item.id)} alt="" className="w-16 h-16" />
              <span className={`${item.color} text-white text-[8px] font-black px-1 py-0.5 block`}>{item.type}</span>
            </div>
            {index < 2 && (
              <div className="text-center">
                <p className="text-yellow-300 font-black text-[10px] animate-pulse">x2</p>
                <p className="text-white text-lg">▶</p>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  },
  {
    caption: 'Con poca vida, la Poké Ball lo atrapa mucho más fácil.',
    scene: (
      <div className="relative w-full h-40 flex items-center justify-between px-6">
        <span className="text-3xl animate-ball">⚪</span>
        <div className="text-center">
          <img src={front(25)} alt="" className="w-20 h-20 mx-auto" />
          <div className="w-24 mx-auto mt-1">
            <Bar percent={15} color="bg-red-500" />
          </div>
          <p className="text-red-300 text-[9px] font-black mt-1">¡Casi sin vida!</p>
        </div>
      </div>
    )
  },
  {
    caption: 'Al ganar subes de nivel: más vida y más fuerza.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-2">
        <img src={front(6)} alt="" className="w-24 h-24 animate-float" />
        <div className="flex items-center gap-3">
          <span className="text-white/60 font-black text-[10px]">Nv. 5</span>
          <span className="text-yellow-300 text-lg animate-pulse">▶</span>
          <span className="text-yellow-300 font-black text-xs">Nv. 6</span>
        </div>
        <div className="w-40">
          <div className="h-3 w-full bg-black/40 border-2 border-white/40">
            <div className="h-full bg-cyan-400 animate-fill" />
          </div>
        </div>
      </div>
    )
  },
  {
    caption: 'En "Mi equipo" curas a todos tus Pokémon gratis.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-3">
        <span className="text-3xl animate-pulse">💚</span>
        <div className="w-48 space-y-2">
          {[4, 1, 7].map(id => (
            <div key={id} className="flex items-center gap-2">
              <img src={front(id)} alt="" className="w-10 h-10" />
              <div className="flex-1">
                <div className="h-3 w-full bg-black/40 border-2 border-white/40">
                  <div className="h-full bg-green-500 animate-fill" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    caption: 'Gana a los 8 entrenadores de la Historia y serás el Campeón.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-3">
        <div className="grid grid-cols-4 gap-2">
          {['🍃', '🐭', '🌿', '🪨', '💧', '🔥', '🔮', '👑'].map((medal, index) => (
            <div
              key={medal}
              className={`w-10 h-10 flex items-center justify-center border-2 text-lg ${
                index < 2 ? 'bg-green-500/30 border-green-300' : 'bg-black/30 border-white/30 opacity-60'
              }`}
            >
              {medal}
            </div>
          ))}
        </div>
        <img src={front(149)} alt="" className="w-16 h-16 animate-float" />
      </div>
    )
  }
];

/**
 * Tutorial visual: cada paso enseña una escena animada con una frase corta
 * Se muestra la primera vez que se juega y desde el menú
 */
export default function Tutorial({ onClose }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const last = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-md w-full bg-white/10 border-4 border-white/40 shadow-[8px_8px_0_rgba(0,0,0,0.5)] p-4">
        {/* Escena */}
        <div className="bg-black/30 border-4 border-white/20 p-2 mb-4">{current.scene}</div>

        <p className="text-white text-[10px] leading-loose text-center min-h-[48px]">{current.caption}</p>

        {/* Puntos de avance */}
        <div className="flex justify-center gap-2 my-4">
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
          <button onClick={onClose} className="w-full text-white/60 hover:text-white mt-3 text-[10px]">
            Saltar tutorial
          </button>
        )}
      </div>
    </div>
  );
}
