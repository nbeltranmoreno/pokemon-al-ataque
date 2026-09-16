import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const PATTERN = /^[a-zA-Z0-9_]{3,16}$/;

/**
 * Nombre de usuario: así te ven tus rivales en los combates Online
 */
export default function UsernameSetup({ onSave }) {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.displayName?.replace(/[^a-zA-Z0-9_]/g, '') || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!PATTERN.test(name)) {
      setError('De 3 a 16 caracteres: letras sin acentos, números o _');
      return;
    }
    onSave(name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-900 to-slate-900 p-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white/10 border-4 border-white/40 shadow-[8px_8px_0_rgba(0,0,0,0.5)] p-5">
        <p className="text-center text-4xl mb-4">🎮</p>
        <h2 className="text-white font-black text-sm text-center leading-loose mb-2">Tu nombre de entrenador</h2>
        <p className="text-white/80 text-[10px] leading-loose text-center mb-5">
          Así te verá tu rival en los combates Online
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <div className="bg-red-500/30 border-4 border-red-300/50 text-white p-3 text-[10px] leading-loose">
              {error}
            </div>
          )}

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre de usuario"
            maxLength={16}
            autoFocus
            autoCapitalize="none"
            autoCorrect="off"
            className="w-full bg-black/30 border-4 border-white/30 text-white placeholder-white/40 px-4 py-3 outline-none focus:border-yellow-300 text-center"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-yellow-900 font-black py-4 border-4 border-yellow-900 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition"
          >
            ¡Listo!
          </button>
        </form>

        <button onClick={logout} className="w-full text-white/60 hover:text-white mt-4 text-[10px]">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
