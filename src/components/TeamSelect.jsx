import { useState, useEffect } from 'react';
import PokeSprite from './PokeSprite';
import { Check } from 'lucide-react';
import { loadStarters } from '../services/pokeapi';
import { createFighter } from '../game/battle';
import TypeBadge from './TypeBadge';

const TEAM_SIZE = 3;
const START_LEVEL = 1;

/**
 * Pantalla para elegir los Pokémon iniciales
 */
export default function TeamSelect({ onReady }) {
  const [species, setSpecies] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    loadStarters()
      .then(list => {
        if (!cancelled) setSpecies(list);
      })
      .catch(err => {
        console.error('Error cargando Pokémon:', err);
        if (!cancelled) setError('No se pudieron cargar los Pokémon. Revisa tu conexión a internet.');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = (id) => {
    setChosen(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= TEAM_SIZE) return prev;
      return [...prev, id];
    });
  };

  const confirm = () => {
    const team = chosen
      .map(id => species.find(s => s.id === id))
      .map(s => createFighter(s, START_LEVEL));
    onReady(team);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-indigo-800 to-purple-900 p-4">
      <div className="max-w-3xl mx-auto pb-28">
        <header className="text-center py-6">
          <h1 className="text-xl font-black text-white drop-shadow-[4px_4px_0_rgba(0,0,0,0.6)] leading-loose">Elige tu equipo</h1>
          <p className="text-white/80 font-medium mt-3 text-[10px] leading-loose">
            Escoge {TEAM_SIZE} Pokémon para empezar tu aventura
          </p>
        </header>

        {error && (
          <div className="bg-red-500/30 border-2 border-red-300/50 text-white rounded-2xl p-4 text-center font-bold">
            {error}
          </div>
        )}

        {!error && species.length === 0 && (
          <div className="text-center py-16">
            <div className="animate-spin text-5xl mb-3">⚡</div>
            <p className="text-white font-bold">Cargando Pokémon...</p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {species.map(pokemon => {
            const selected = chosen.includes(pokemon.id);
            return (
              <button
                key={pokemon.id}
                onClick={() => toggle(pokemon.id)}
                className={`relative bg-white/10 backdrop-blur rounded-2xl p-3 border-2 transition hover:scale-[1.03] ${
                  selected ? 'border-yellow-300 bg-white/25 shadow-xl' : 'border-white/20'
                }`}
              >
                {selected && (
                  <div className="absolute top-2 right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-5 h-5 text-yellow-900" strokeWidth={4} />
                  </div>
                )}
                <PokeSprite
                  src={pokemon.sprites.front}
                  alt={pokemon.name}
                  className="w-32 h-32 sm:w-36 sm:h-36 mx-auto object-contain drop-shadow-xl"
                  loading="lazy"
                />
                <p className="text-white font-black text-center mt-1 text-[10px] truncate">{pokemon.name}</p>
                <div className="flex justify-center gap-1 mt-2 flex-wrap">
                  {pokemon.types.map(type => (
                    <TypeBadge key={type} type={type} small />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Barra inferior con el botón de empezar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur border-t-2 border-white/20">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <p className="text-white font-bold flex-1">
            {chosen.length} de {TEAM_SIZE} elegidos
          </p>
          <button
            onClick={confirm}
            disabled={chosen.length !== TEAM_SIZE}
            className="bg-yellow-400 text-yellow-900 font-black px-8 py-3 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ¡A la aventura!
          </button>
        </div>
      </div>
    </div>
  );
}
