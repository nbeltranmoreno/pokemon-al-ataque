import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PixelTrainer from './PixelTrainer';

const PATTERN = /^[a-zA-Z0-9_]{3,16}$/;

/**
 * Nombre de entrenador y si eres chico o chica
 * El muñeco elegido sale en los combates y tu rival lo ve en Online
 */
export default function UsernameSetup({ onSave }) {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.displayName?.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 16) || '');
  const [gender, setGender] = useState('boy');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!PATTERN.test(name)) {
      setError('De 3 a 16 caracteres: letras sin acentos, números o _');
      return;
    }
    onSave(name, gender);
  };

  const option = (value, label) => (
    <button
      type="button"
      onClick={() => setGender(value)}
      className={`flex-1 border-4 p-3 transition ${
        gender === value ? 'bg-yellow-300/25 border-yellow-300' : 'bg-white/10 border-white/20 hover:bg-white/20'
      }`}
    >
      <PixelTrainer gender={value} className="w-14 h-16 mx-auto" />
      <p className="text-white font-black text-[10px] mt-2 leading-loose">{label}</p>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-900 to-slate-900 p-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white/10 border-4 border-white/40 shadow-[8px_8px_0_rgba(0,0,0,0.5)] p-5">
        <h2 className="text-white font-black text-sm text-center leading-loose mb-2">Tu entrenador</h2>
        <p className="text-white/80 text-[10px] leading-loose text-center mb-5">
          Así te verá tu rival en los combates Online
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/30 border-4 border-red-300/50 text-white p-3 text-[10px] leading-loose">
              {error}
            </div>
          )}

          {/* Chico o chica */}
          <div className="flex gap-3">
            {option('boy', 'Chico')}
            {option('girl', 'Chica')}
          </div>

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
