import { VERSION } from '../version';
import PixelBackground from './PixelBackground';

/**
 * Portada del juego: un solo botón
 * "Continuar" si ya hay sesión abierta, "Jugar" si todavía no
 */
export default function StartScreen({ user, username, hasGame, onStart }) {
  const ball = `${import.meta.env.BASE_URL}favicon.svg`;

  return (
    <div className="relative min-h-screen overflow-hidden p-4 flex items-center justify-center">
      <PixelBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/45 to-slate-900/85" />

      <div className="relative max-w-md w-full text-center">
        <img src={ball} alt="" className="w-24 h-24 mx-auto mb-6 animate-float" />

        <h1 className="text-2xl font-black text-white drop-shadow-[4px_4px_0_rgba(0,0,0,0.7)] leading-loose mb-2">
          Pokémon
          <br />
          <span className="text-yellow-300">Al Ataque</span>
        </h1>

        <p className="text-white/70 text-[10px] leading-loose mb-8">
          {user
            ? `Hola, ${username || user.displayName || 'entrenador'} 🎮`
            : 'Combates por turnos contra la máquina o contra tus amigos'}
        </p>

        <button
          onClick={onStart}
          className="w-full bg-yellow-400 text-yellow-900 font-black py-5 border-4 border-yellow-900 shadow-[8px_8px_0_rgba(0,0,0,0.55)] active:translate-y-1 transition text-sm animate-pulse"
        >
          {user ? (hasGame ? 'Continuar' : 'Empezar') : 'Jugar'}
        </button>

        {!user && (
          <p className="text-white/50 text-[9px] leading-loose mt-5">
            Entrarás con Google o con tu email
          </p>
        )}

        <p className="text-white/30 text-[8px] mt-8">{VERSION}</p>
      </div>
    </div>
  );
}
