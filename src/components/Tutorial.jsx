import { useState } from 'react';
import PokeSprite from './PokeSprite';
import { spriteUrl } from '../services/pokeapi';
import PixelItem from './PixelItem';
import PixelTrainer from './PixelTrainer';
import { useLang } from '../i18n';

const back = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;

const Bar = ({ percent, color }) => (
  <div className="h-3 w-full bg-black/40 border-2 border-white/40">
    <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
  </div>
);

const Moneda = ({ children }) => (
  <p className="text-yellow-300 font-black text-[10px] leading-loose">{children}</p>
);

// Cada paso enseña una escena animada con una frase corta
const STEPS = [
  {
    caption: 'Eliges un ataque y tu entrenador manda: el Pokémon golpea. El más rápido pega primero.',
    scene: (
      <div className="relative w-full h-40">
        <PokeSprite src={spriteUrl(1)} alt="" className="w-20 h-20 absolute top-0 right-6 animate-counter" />
        <span className="absolute top-0 right-24 text-red-400 font-black text-sm animate-pulse">-13</span>
        <PixelTrainer gender="boy" pointing className="w-12 h-[4.25rem] absolute bottom-0 left-0" />
        <PokeSprite src={back(4)} alt="" className="w-24 h-24 absolute bottom-0 left-12 animate-attack" />
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
              <PokeSprite src={spriteUrl(item.id)} alt="" className="w-16 h-16" />
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
    caption: 'La Historia es un cuento: pasas escenas y, de vez en cuando, hay combate. Ganando consigues medallas.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-2">
        <div className="flex gap-2">
          <PokeSprite src={spriteUrl(25)} alt="" className="w-16 h-16 animate-float" />
          <PokeSprite src={spriteUrl(10)} alt="" className="w-16 h-16 animate-float" style={{ animationDelay: '0.4s' }} />
        </div>
        <div className="bg-black/70 border-4 border-white/50 px-3 py-2 w-56">
          <p className="text-white text-[9px] leading-loose">Algo se mueve en la hierba...</p>
        </div>
        <div className="flex gap-1">
          {['🪨', '🍃', '💧', '⚡', '🔥', '👑'].map((medal, i) => (
            <span
              key={medal}
              className={`w-6 h-6 flex items-center justify-center border-2 text-xs ${
                i < 2 ? 'bg-yellow-300/40 border-yellow-200' : 'bg-black/30 border-white/20 opacity-50'
              }`}
            >
              {medal}
            </span>
          ))}
        </div>
      </div>
    )
  },
  {
    caption: 'En la Historia peleas con el Pokémon que te prestan, no con el tuyo. Tu equipo se queda descansando.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <PokeSprite src={spriteUrl(7)} alt="" className="w-20 h-20" />
            <p className="text-green-300 text-[9px] font-black">PRESTADO</p>
          </div>
          <p className="text-white text-lg">⚔️</p>
          <div className="text-center">
            <PokeSprite src={spriteUrl(74)} alt="" className="w-20 h-20" />
            <p className="text-red-300 text-[9px] font-black">LÍDER</p>
          </div>
        </div>
        <Moneda>🪙 +60</Moneda>
      </div>
    )
  },
  {
    caption: 'En Práctica eliges tú al rival. Es solo entrenar: nadie se debilita, y no ganas experiencia, ni monedas, ni capturas.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-2">
        <div className="grid grid-cols-4 gap-1">
          {[1, 4, 7, 25, 39, 52, 54, 63].map(id => (
            <div key={id} className="bg-white/10 border-2 border-white/20 p-0.5">
              <PokeSprite src={spriteUrl(id)} alt="" className="w-10 h-10" />
            </div>
          ))}
        </div>
        <p className="text-yellow-300 text-[9px] font-black animate-pulse">▶</p>
      </div>
    )
  },
  {
    caption: 'En Peleas va en serio: el daño se queda, tu Pokémon puede debilitarse, y ganas experiencia y monedas.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <PokeSprite src={spriteUrl(4)} alt="" className="w-16 h-16" />
            <div className="w-20 mx-auto">
              <Bar percent={30} color="bg-yellow-400" />
            </div>
          </div>
          <p className="text-white text-lg">⚔️</p>
          <div className="text-center">
            <PokeSprite src={spriteUrl(19)} alt="" className="w-16 h-16" />
          </div>
        </div>
        <Moneda>🪙 +15</Moneda>
      </div>
    )
  },
  {
    caption: 'Para capturar, toca ⚪ Poké Ball dentro de una Pelea. En Práctica y en la Historia no se puede.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <PokeSprite src={spriteUrl(25)} alt="" className="w-14 h-14" />
          <div className="w-20">
            <Bar percent={15} color="bg-red-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 w-56">
          <div className="bg-red-500 text-white text-[9px] font-black py-2 text-center border-2 border-red-300">⚔️</div>
          <div className="bg-white text-red-600 text-[9px] font-black py-1 text-center border-4 border-yellow-300 animate-pulse flex items-center justify-center gap-1">
            <PixelItem id="pokeball" className="w-5 h-5" />
          </div>
          <div className="bg-blue-500 text-white text-[9px] font-black py-2 text-center border-2 border-blue-300">🔁</div>
          <div className="bg-gray-700 text-white text-[9px] font-black py-2 text-center border-2 border-gray-400">🏃</div>
        </div>
      </div>
    )
  },
  {
    caption: 'Cae más fácil si le queda poca vida y si tu Pokémon tiene más nivel. Si la Poké Ball falla, el salvaje te ataca y puede debilitarte.',
    scene: (
      <div className="w-full h-40 flex items-center justify-center gap-4">
        <PixelItem id="pokeball" className="w-10 h-10 animate-ball" />
        <div className="text-center">
          <PokeSprite src={spriteUrl(25)} alt="" className="w-20 h-20 mx-auto" />
          <div className="w-24 mx-auto mt-1">
            <Bar percent={12} color="bg-red-500" />
          </div>
          <p className="text-yellow-300 text-[9px] font-black mt-1 animate-pulse">⚪ ✔</p>
        </div>
      </div>
    )
  },
  {
    caption: 'Las monedas se ganan así: 60 por cada entrenador de la Historia, 15 por ganar una Pelea, vendiendo Pokémon en "Mi equipo" y apostando en Online.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-2">
        <p className="text-yellow-300 font-black text-sm">🪙 1240</p>
        <div className="w-60 space-y-1">
          {[
            ['📖', '+60'],
            ['⚔️', '+15'],
            ['🪙', '+229'],
            ['🌐', '+50']
          ].map(([donde, cuanto]) => (
            <div key={donde} className="flex items-center justify-between bg-black/40 border-2 border-white/20 px-2 py-1">
              <span className="text-white text-[10px] leading-loose">{donde}</span>
              <span className="text-yellow-300 text-[9px] font-black">{cuanto}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    caption: 'En la Tienda compras objetos. Los Pokémon solo se curan con objetos: ya no hay curación gratis.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-3">
        <div className="flex gap-2">
          {['pokeball', 'pocion', 'superpocion', 'curatotal', 'revivir', 'caramelo'].map(id => (
            <div key={id} className="bg-white/10 border-2 border-white/30 p-1">
              <PixelItem id={id} className="w-7 h-7" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <PokeSprite src={spriteUrl(4)} alt="" className="w-10 h-10" />
          <PixelItem id="pocion" className="w-6 h-6 animate-pulse" />
          <div className="w-20">
            <Bar percent={100} color="bg-green-500" />
          </div>
        </div>
      </div>
    )
  },
  {
    caption: 'En "Mi equipo" usas los objetos, ves la experiencia, cambias con los guardados y vendes Pokémon con el botón 🪙.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-2">
        <div className="w-60 space-y-2">
          {[4, 1, 7].map(id => (
            <div key={id} className="flex items-center gap-2">
              <PokeSprite src={spriteUrl(id)} alt="" className="w-10 h-10" />
              <div className="flex-1 space-y-1">
                <Bar percent={100} color="bg-green-500" />
                <div className="h-1.5 w-full bg-black/40 border border-white/30">
                  <div className="h-full bg-cyan-400 animate-fill" />
                </div>
              </div>
              <span className="bg-yellow-400 text-yellow-900 text-[9px] font-black px-1.5 py-1 border-2 border-yellow-200">
                🪙
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    caption: 'En la Tienda de Pokémon los buenos se abren con tu experiencia de entrenador (la suma de los niveles de todos tus Pokémon) y se pagan con monedas.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-2">
        <p className="text-yellow-300 font-black text-[10px] leading-loose">⭐ 120 · 🪙 1240</p>
        <div className="grid grid-cols-4 gap-1">
          {[
            [25, 200, true],
            [94, 1200, true],
            [149, 2400, false],
            [150, 5000, false]
          ].map(([id, precio, abierto]) => (
            <div key={id} className="bg-white/10 border-2 border-white/20 p-1 text-center">
              <PokeSprite
                src={spriteUrl(id)}
                alt=""
                className={`w-10 h-10 mx-auto ${abierto ? '' : 'brightness-0 opacity-50'}`}
              />
              <p className={`text-[8px] font-black ${abierto ? 'text-yellow-300' : 'text-white/50'}`}>
                {abierto ? `🪙 ${precio}` : '🔒'}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    caption: 'En "Mi colección" ves todos los que tienes y la lista de los que has ido atrapando.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-2">
        <div className="grid grid-cols-5 gap-1">
          {[1, 4, 7, 25, 39, 52, 54, 63, 74, 92].map(id => (
            <div key={id} className="bg-white/10 border-2 border-white/20 p-0.5">
              <PokeSprite src={spriteUrl(id)} alt="" className="w-9 h-9" />
            </div>
          ))}
        </div>
        <p className="text-white/70 text-[9px] leading-loose">📒</p>
      </div>
    )
  },
  {
    caption: 'En Online creas una sala, le pasas el código a un amigo y peleáis con los equipos enteros: si uno cae, sacas otro. Podéis apostar monedas.',
    scene: (
      <div className="w-full h-40 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <PixelTrainer gender="boy" className="w-12 h-[4.25rem]" />
            <div className="flex gap-1 justify-center mt-1">
              {[1, 2, 3].map(i => (
                <span key={i} className="w-2.5 h-2.5 bg-green-400 border-2 border-white/50" />
              ))}
            </div>
          </div>
          <p className="text-white text-lg">⚔️</p>
          <div className="text-center">
            <PixelTrainer gender="girl" className="w-12 h-[4.25rem]" />
            <div className="flex gap-1 justify-center mt-1">
              {[1, 2, 3].map(i => (
                <span key={i} className={`w-2.5 h-2.5 border-2 border-white/50 ${i === 1 ? 'bg-black/60' : 'bg-red-400'}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="bg-black/50 border-4 border-yellow-300 px-4 py-1">
          <p className="text-yellow-300 font-black text-sm tracking-widest">K7MPX</p>
        </div>
        <Moneda>🪙 50</Moneda>
      </div>
    )
  }
];

/**
 * Tutorial visual: cada paso enseña una escena animada con una frase corta
 * Se muestra la primera vez que se juega y desde el menú
 */
export default function Tutorial({ onClose }) {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const last = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-md w-full bg-white/10 border-4 border-white/40 shadow-[8px_8px_0_rgba(0,0,0,0.5)] p-4">
        {/* Escena */}
        <div className="bg-black/30 border-4 border-white/20 p-2 mb-4">{current.scene}</div>

        <p className="text-white text-[10px] leading-loose text-center min-h-[64px]">{t(current.caption)}</p>

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
              {t('Atrás')}
            </button>
          )}
          <button
            onClick={() => (last ? onClose() : setStep(step + 1))}
            className="flex-1 bg-yellow-400 text-yellow-900 font-black py-3 border-4 border-yellow-900 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition"
          >
            {last ? t('¡A jugar!') : t('Siguiente')}
          </button>
        </div>

        {!last && (
          <button onClick={onClose} className="w-full text-white/60 hover:text-white mt-3 text-[10px]">
            {t('Saltar tutorial')}
          </button>
        )}
      </div>
    </div>
  );
}
