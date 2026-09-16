import { ArrowLeft } from 'lucide-react';

/**
 * Modo online: pendiente de tener un servidor donde conectar a los dos jugadores
 */
export default function OnlineScreen({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-700 via-blue-800 to-indigo-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white/20 flex items-center justify-center border-4 border-white/40 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition flex-shrink-0"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-base font-black text-white">🌐 Online</h1>
        </div>

        <div className="bg-white/15 border-4 border-white/30 shadow-[6px_6px_0_rgba(0,0,0,0.4)] p-5 text-center">
          <p className="text-4xl mb-4">🚧</p>
          <p className="text-white font-black text-xs leading-loose mb-4">En construcción</p>
          <p className="text-white/80 text-[10px] leading-loose">
            Para combatir contra otra persona hace falta un servidor donde se conecten los dos jugadores.
          </p>
          <p className="text-white/80 text-[10px] leading-loose mt-3">
            En cuanto actives Firebase, el mismo que usa AppHabitos, se puede conectar aquí: retas a un amigo por su
            nombre y jugáis por turnos cada uno desde su móvil.
          </p>
        </div>
      </div>
    </div>
  );
}
