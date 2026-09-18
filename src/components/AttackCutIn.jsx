import TypeBadge from './TypeBadge';
import PixelTrainer from './PixelTrainer';

/**
 * Corte de ataque estilo anime: fondo de color con líneas de velocidad,
 * el Pokémon en grande con su entrenador y el nombre del ataque
 */
export default function AttackCutIn({ side, sprite, name, move, gender = 'boy', outfit = 'clasico' }) {
  const mine = side === 'player';

  return (
    <div className="absolute inset-0 z-50 overflow-hidden">
      {/* Fondo de color: azul si atacas tú, rojo si ataca el rival */}
      <div className={`absolute inset-0 ${mine ? 'bg-sky-900' : 'bg-red-900'}`} />

      {/* Líneas de velocidad en movimiento */}
      <div
        className="absolute inset-0 animate-speed"
        style={{
          backgroundImage: mine
            ? 'repeating-linear-gradient(105deg, rgba(186,230,253,0.35) 0 6px, transparent 6px 24px)'
            : 'repeating-linear-gradient(75deg, rgba(254,202,202,0.35) 0 6px, transparent 6px 24px)'
        }}
      />
      <div
        className="absolute inset-0 animate-speedSlow"
        style={{
          backgroundImage: mine
            ? 'repeating-linear-gradient(105deg, rgba(255,255,255,0.18) 0 3px, transparent 3px 40px)'
            : 'repeating-linear-gradient(75deg, rgba(255,255,255,0.18) 0 3px, transparent 3px 40px)'
        }}
      />

      {/* Destello del centro */}
      <div
        className="absolute inset-0"
        style={{
          background: mine
            ? 'radial-gradient(circle at 45% 50%, rgba(224,242,254,0.45) 0%, transparent 60%)'
            : 'radial-gradient(circle at 55% 50%, rgba(254,226,226,0.45) 0%, transparent 60%)'
        }}
      />

      <div className="relative h-full flex flex-col items-center justify-center gap-2 px-4">
        <div className={`flex items-end gap-2 ${mine ? '' : 'flex-row-reverse'}`}>
          <PixelTrainer
            gender={gender}
            outfit={outfit}
            pointing
            className="w-16 h-[5.5rem] sm:w-20 sm:h-28 animate-zoomIn"
          />
          <img
            src={sprite}
            alt=""
            className="w-40 h-40 sm:w-52 sm:h-52 object-contain drop-shadow-[0_6px_0_rgba(0,0,0,0.5)] animate-zoomIn"
            style={{ animationDelay: '0.1s' }}
          />
        </div>

        <div className="bg-black/80 border-4 border-white/70 shadow-[6px_6px_0_rgba(0,0,0,0.6)] px-4 py-3 text-center">
          <p className="text-white font-black text-[10px] leading-loose mb-2">
            {mine ? `¡${name}, usa` : `${name} usa`} <span className="text-yellow-300">{move.name}</span>!
          </p>
          <div className="flex justify-center">
            <TypeBadge type={move.type} small />
          </div>
        </div>
      </div>
    </div>
  );
}
