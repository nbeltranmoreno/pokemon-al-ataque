import { TYPE_HEX, TYPE_NAMES } from '../data/types';
import PokeSprite from './PokeSprite';
import PixelTrainer from './PixelTrainer';

// Chispas que suben alrededor, como el aura de energía
const SPARKS = [8, 18, 26, 38, 52, 62, 72, 84, 92];

/**
 * Corte de ataque épico: fondo oscuro, aura de energía del color del tipo,
 * rayos girando, el Pokémon iluminado por detrás y el cartel con el ataque
 */
export default function AttackCutIn({ side, sprite, name, move, gender = 'boy', outfit = 'clasico' }) {
  const mine = side === 'player';
  const color = TYPE_HEX[move.type] || '#38bdf8';

  return (
    <div className="absolute inset-0 z-50 overflow-hidden bg-slate-950">
      {/* Aura de energía */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 50% 55%, ${color}cc 0%, ${color}55 28%, transparent 62%)` }}
      />

      {/* Rayos girando detrás */}
      <div
        className="absolute inset-0 animate-burst opacity-60"
        style={{
          background: `repeating-conic-gradient(from 0deg at 50% 55%, ${color}00 0deg 8deg, ${color}99 8deg 10deg)`
        }}
      />

      {/* Líneas de velocidad */}
      <div
        className="absolute inset-0 animate-speed opacity-70"
        style={{
          backgroundImage: mine
            ? `repeating-linear-gradient(105deg, ${color}66 0 5px, transparent 5px 26px)`
            : `repeating-linear-gradient(75deg, ${color}66 0 5px, transparent 5px 26px)`
        }}
      />

      {/* Chispas subiendo */}
      {SPARKS.map((left, index) => (
        <span
          key={left}
          className="absolute bottom-0 w-1 h-3 animate-rise"
          style={{
            left: `${left}%`,
            background: color,
            animationDelay: `${index * 0.18}s`,
            boxShadow: `0 0 6px ${color}`
          }}
        />
      ))}

      {/* Destello de entrada */}
      <div className="absolute inset-0 bg-white animate-flash" />

      {/* Oscuro arriba y abajo, como un plano de cine */}
      <div className="absolute inset-x-0 top-0 h-6 bg-slate-950" />
      <div className="absolute inset-x-0 bottom-0 h-6 bg-slate-950" />

      <div className="relative h-full flex flex-col items-center justify-center gap-3 px-4">
        <div className={`flex items-end gap-1 animate-zoomPush ${mine ? '' : 'flex-row-reverse'}`}>
          <PixelTrainer
            gender={gender}
            outfit={outfit}
            pointing
            className="w-20 h-28 sm:w-24 sm:h-[8.5rem] animate-zoomIn drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"

          />
          <PokeSprite
            src={sprite}
            alt=""
            className="w-56 h-56 sm:w-72 sm:h-72 object-contain animate-shakeHard"
            style={{ filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 18px ${color}) drop-shadow(0 4px 0 rgba(0,0,0,0.6))` }}
          />
        </div>

        {/* Cartel con el nombre, con barra de color al lado */}
        <div className="flex items-stretch shadow-[6px_6px_0_rgba(0,0,0,0.7)]">
          <div className="w-2" style={{ background: color }} />
          <div className="bg-slate-950/90 border-y-4 border-r-4 border-white/70 px-4 py-3 text-center">
            <p className="text-white/70 text-[8px] leading-loose">{mine ? 'TU POKÉMON' : 'RIVAL'}</p>
            <p className="text-white font-black text-[11px] leading-loose">{name}</p>
            <p className="font-black text-sm leading-loose" style={{ color }}>
              {move.name}
            </p>
            <p className="text-white/60 text-[8px] leading-loose">{TYPE_NAMES[move.type] || move.type}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
