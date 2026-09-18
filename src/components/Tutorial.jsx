import { useState } from 'react';
import { spriteUrl } from '../services/pokeapi';
import PixelItem from './PixelItem';
import PixelTrainer from './PixelTrainer';

const back = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;

const Bar = ({ percent, color }) => (
  <div className="h-3 w-full bg-black/40 border-2 border-white/40">
    <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
  </div>
);

// Cada paso enseña una escena animada con una frase corta
const STEPS = [
  {
    caption: 'Eliges un ataque y tu entrenador manda: el Pokémon golpea. El más rápido pega primero.',
    scene: (
      <div className="relative w-full h-40">
        <img src={spriteUrl(1)} alt="" className="w-20 h-20 absolute top-0 right-6 animate-counter" />
        <span className="absolute top-0 right-24 text-red-400 font-black text-sm animate-pulse">-13</span>
        <PixelTrainer gender="boy" pointing className="w-12 h-[4.25rem] absolute bottom-0 left-0" />
        <img src={back(4)} alt="" className="w-24 h-24 absolute bottom-0 left-12 animate-attack" />
        <span className="absolute bottom-6 left-36 text-2xl animate-attack">💥</span>
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
              <img src={spriteUrl(item.id)} alt="" className="w-16 h-16" />
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
    caption: 'La Historia es un cuento: pasas escenas y, de vez en cuando, hay combate.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-2">
        <div className="flex gap-2">
          <img src={spriteUrl(25)} alt="" className="w-16 h-16 animate-float" />
          <img src={spriteUrl(10)} alt="" className="w-16 h-16 animate-float" style={{ animationDelay: '0.4s' }} />
        </div>
        <div className="bg-black/70 border-4 border-white/50 px-3 py-2 w-56">
          <p className="text-white text-[9px] leading-loose">Algo se mueve en la hierba...</p>
        </div>
        <p className="text-yellow-300 text-[9px] font-black animate-pulse">▶ Continuar</p>
      </div>
    )
  },
  {
    caption: 'En la Historia peleas con el Pokémon que te prestan, no con el tuyo.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <img src={spriteUrl(7)} alt="" className="w-20 h-20" />
            <p className="text-green-300 text-[9px] font-black">PRESTADO</p>
          </div>
          <p className="text-white text-lg">⚔️</p>
          <div className="text-center">
            <img src={spriteUrl(74)} alt="" className="w-20 h-20" />
            <p className="text-red-300 text-[9px] font-black">LÍDER</p>
          </div>
        </div>
        <p className="text-white/70 text-[9px]">Tu equipo se queda descansando</p>
      </div>
    )
  },
  {
    caption: 'En Práctica eliges tú al rival, y tus Pokémon no se debilitan.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-2">
        <div className="grid grid-cols-4 gap-1">
          {[1, 4, 7, 25, 39, 52, 54, 63].map(id => (
            <div key={id} className="bg-white/10 border-2 border-white/20 p-0.5">
              <img src={spriteUrl(id)} alt="" className="w-10 h-10" />
            </div>
          ))}
        </div>
        <p className="text-yellow-300 text-[9px] font-black animate-pulse">Toca uno para pelear</p>
      </div>
    )
  },
  {
    caption: 'Con poca vida, la Poké Ball lo atrapa mucho más fácil.',
    scene: (
      <div className="relative w-full h-40 flex items-center justify-between px-6">
        <PixelItem id="pokeball" className="w-10 h-10 animate-ball" />
        <div className="text-center">
          <img src={spriteUrl(25)} alt="" className="w-20 h-20 mx-auto" />
          <div className="w-24 mx-auto mt-1">
            <Bar percent={15} color="bg-red-500" />
          </div>
          <p className="text-red-300 text-[9px] font-black mt-1">¡Casi sin vida!</p>
        </div>
      </div>
    )
  },
  {
    caption: 'Ganando en la Historia consigues monedas para la Tienda.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-3">
        <p className="text-yellow-300 font-black text-xs">🪙 160 monedas</p>
        <div className="flex gap-2">
          {['pokeball', 'pocion', 'superpocion', 'revivir', 'caramelo'].map(id => (
            <div key={id} className="bg-white/10 border-2 border-white/30 p-1">
              <PixelItem id={id} className="w-8 h-8" />
            </div>
          ))}
        </div>
        <p className="text-white/70 text-[9px]">Lo comprado va a tu Inventario</p>
      </div>
    )
  },
  {
    caption: 'En "Mi equipo" curas, usas objetos y ves la experiencia de cada uno.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-2">
        <div className="w-52 space-y-2">
          {[4, 1, 7].map(id => (
            <div key={id} className="flex items-center gap-2">
              <img src={spriteUrl(id)} alt="" className="w-10 h-10" />
              <div className="flex-1 space-y-1">
                <Bar percent={100} color="bg-green-500" />
                <div className="h-1.5 w-full bg-black/40 border border-white/30">
                  <div className="h-full bg-cyan-400 animate-fill" />
                </div>
              </div>
              <PixelItem id="pocion" className="w-6 h-6" />
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    caption: 'En Online creas una sala, pasas el código a un amigo y peleáis en directo.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-6">
          <PixelTrainer gender="boy" className="w-12 h-[4.25rem]" />
          <p className="text-white text-lg">⚔️</p>
          <PixelTrainer gender="girl" className="w-12 h-[4.25rem]" />
        </div>
        <div className="bg-black/50 border-4 border-yellow-300 px-4 py-2">
          <p className="text-yellow-300 font-black text-sm tracking-widest">K7MPX</p>
        </div>
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
        <div className="flex justify-center gap-1.5 my-4 flex-wrap">
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
