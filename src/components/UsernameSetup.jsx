import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { OUTFITS } from '../data/outfits';
import PixelTrainer from './PixelTrainer';
import PixelBackground from './PixelBackground';

const PATTERN = /^[a-zA-Z0-9_]{3,16}$/;

/**
 * Crear tu entrenador: chico o chica, conjunto de ropa y nombre
 * El muñeco elegido sale en los combates y lo ve tu rival en Online
 */
export default function UsernameSetup({ onSave }) {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.displayName?.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 16) || '');
  const [gender, setGender] = useState('boy');
  const [outfit, setOutfit] = useState('clasico');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!PATTERN.test(name)) {
      setError('De 3 a 16 caracteres: letras sin acentos, números o _');
      return;
    }
    onSave(name, gender, outfit);
  };

  return (
    <div className="relative min-h-screen overflow-hidden p-4 flex items-center justify-center">
      <PixelBackground name="pueblo" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/70 to-slate-900/90" />

      <div className="relative max-w-md w-full bg-white/10 border-4 border-white/40 shadow-[8px_8px_0_rgba(0,0,0,0.5)] p-5">
        <h2 className="text-white font-black text-sm text-center leading-loose mb-1">Tu entrenador</h2>
        <p className="text-white/80 text-[10px] leading-loose text-center mb-4">
          Así te verá tu rival en los combates Online
        </p>

        {/* Cómo va quedando */}
        <div className="flex justify-center gap-6 bg-black/30 border-4 border-white/20 p-3 mb-4">
          <div className="text-center">
            <PixelTrainer gender={gender} outfit={outfit} className="w-16 h-[5.5rem] mx-auto" />
            <p className="text-white/60 text-[9px] mt-1">de frente</p>
          </div>
          <div className="text-center">
            <PixelTrainer gender={gender} outfit={outfit} view="back" className="w-16 h-[5.5rem] mx-auto" />
            <p className="text-white/60 text-[9px] mt-1">de espaldas</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/30 border-4 border-red-300/50 text-white p-3 text-[10px] leading-loose">
              {error}
            </div>
          )}

          {/* Chico o chica */}
          <div className="flex gap-3">
            {[['boy', 'Chico'], ['girl', 'Chica']].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setGender(value)}
                className={`flex-1 border-4 py-3 font-black text-[10px] text-white transition ${
                  gender === value ? 'bg-yellow-300/25 border-yellow-300' : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Conjuntos de ropa */}
          <div>
            <p className="text-white/80 text-[10px] leading-loose mb-2">Elige tu ropa</p>
            <div className="grid grid-cols-4 gap-2">
              {OUTFITS.map(option => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setOutfit(option.id)}
                  className={`border-4 p-1 transition ${
                    outfit === option.id
                      ? 'bg-yellow-300/25 border-yellow-300'
                      : 'bg-white/10 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <PixelTrainer gender={gender} outfit={option.id} className="w-10 h-14 mx-auto" />
                  <p className="text-white text-[8px] font-black text-center truncate leading-loose">{option.name}</p>
                </button>
              ))}
            </div>
          </div>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre de usuario"
            maxLength={16}
            autoCapitalize="none"
            autoCorrect="off"
            className="w-full bg-black/40 border-4 border-white/30 text-white placeholder-white/40 px-4 py-3 outline-none focus:border-yellow-300 text-center"
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
