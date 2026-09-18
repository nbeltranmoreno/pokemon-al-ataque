import { useState, useEffect } from 'react';
import PokeSprite from './PokeSprite';
import PixelBackground from './PixelBackground';
import { ArrowLeft, Shuffle } from 'lucide-react';
import { loadPokedex } from '../services/pokeapi';

/**
 * Práctica: elegir contra qué Pokémon salvaje pelear
 */
export default function PracticeSelect({ onChoose, onRandom, onBack }) {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    loadPokedex()
      .then(pokedex => {
        if (!cancelled) setList(pokedex);
      })
      .catch(err => {
        console.error('Error cargando la lista:', err);
        if (!cancelled) setError('No se pudo cargar la lista. Revisa tu conexión a internet.');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = list.filter(pokemon => pokemon.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="relative min-h-screen overflow-hidden p-4">
      <PixelBackground name="ruta" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/45 via-slate-900/65 to-slate-900/85" />

      <div className="relative max-w-3xl mx-auto pb-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white/20 flex items-center justify-center border-4 border-white/40 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition flex-shrink-0"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base font-black text-white leading-loose">⚔️ Práctica</h1>
            <p className="text-white/80 text-[10px] leading-loose">
              Entrenamiento libre: no se debilitan, salen curados y no ganan experiencia ni monedas
            </p>
          </div>
        </div>

        <button
          onClick={onRandom}
          className="w-full bg-yellow-400 text-yellow-900 font-black py-4 border-4 border-yellow-900 shadow-[6px_6px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition flex items-center justify-center gap-3 mb-4"
        >
          <Shuffle className="w-5 h-5" />
          Sorpresa: uno al azar
        </button>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre..."
          className="w-full bg-black/30 border-4 border-white/30 text-white placeholder-white/50 px-4 py-3 mb-4 outline-none focus:border-yellow-300"
        />

        {error && (
          <div className="bg-red-500/30 border-4 border-red-300/50 text-white p-4 text-center text-[10px] leading-loose">
            {error}
          </div>
        )}

        {!error && list.length === 0 && (
          <div className="text-center py-16">
            <div className="animate-spin text-5xl mb-3">⚡</div>
            <p className="text-white font-bold text-[10px]">Cargando Pokémon...</p>
          </div>
        )}

        {filtered.length === 0 && list.length > 0 && (
          <p className="text-white/80 text-center text-[10px] leading-loose py-8">
            Ningún Pokémon se llama así.
          </p>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {filtered.map(pokemon => (
            <button
              key={pokemon.id}
              onClick={() => onChoose(pokemon.id)}
              className="bg-white/10 border-4 border-white/20 p-2 hover:bg-white/25 hover:border-yellow-300 active:translate-y-1 transition"
            >
              <PokeSprite src={pokemon.sprite} alt={pokemon.name} className="w-20 h-20 mx-auto object-contain" loading="lazy" />
              <p className="text-white font-black text-[9px] text-center truncate leading-loose">{pokemon.name}</p>
              <p className="text-white/50 text-[8px] text-center">Nº {pokemon.id}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
