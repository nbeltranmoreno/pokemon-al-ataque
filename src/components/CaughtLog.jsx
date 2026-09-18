import { ArrowLeft } from 'lucide-react';
import PixelBackground from './PixelBackground';

const fecha = (ms) => {
  const d = new Date(ms);
  return `${d.getDate()}/${d.getMonth() + 1} · ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

/**
 * Historial de capturas: todos los Pokémon que has atrapado, del último al primero
 */
export default function CaughtLog({ caughtLog = [], onBack }) {
  const distintos = new Set(caughtLog.map(entry => entry.speciesId)).size;

  return (
    <div className="relative min-h-screen overflow-hidden p-4">
      <PixelBackground name="bosque" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/45 via-slate-900/65 to-slate-900/85" />

      <div className="relative max-w-2xl mx-auto pb-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white/20 flex items-center justify-center border-4 border-white/40 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition flex-shrink-0"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base font-black text-white leading-loose">📒 Historial de capturas</h1>
            <p className="text-white/70 text-[9px] leading-loose">
              {caughtLog.length} capturas · {distintos} Pokémon distintos
            </p>
          </div>
        </div>

        {caughtLog.length === 0 ? (
          <div className="bg-black/30 border-4 border-white/20 p-6 text-center">
            <p className="text-5xl mb-3">⚪</p>
            <p className="text-white font-black text-[10px] leading-loose mb-2">Todavía no has atrapado a ninguno</p>
            <p className="text-white/70 text-[9px] leading-loose">
              Lanza Poké Balls en Práctica o en Peleas. Cuanta menos vida le quede al salvaje, y cuanto más fuerte sea
              tu Pokémon, más fácil es atraparlo.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {caughtLog.map((entry, index) => (
              <div
                key={`${entry.at}-${index}`}
                className="bg-white/10 border-4 border-white/20 p-2 flex items-center gap-3"
              >
                <img src={entry.sprite} alt="" className="w-12 h-12 object-contain flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-black text-[10px] truncate leading-loose">{entry.name}</p>
                  <p className="text-white/60 text-[9px]">Nivel {entry.level} · {fecha(entry.at)}</p>
                </div>
                <span className="text-white/40 text-[9px] font-black flex-shrink-0">Nº {entry.speciesId}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
