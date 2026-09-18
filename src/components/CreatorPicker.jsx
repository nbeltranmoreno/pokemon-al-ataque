import { useState, useEffect } from 'react';
import PokeSprite from './PokeSprite';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { loadPokedex, loadSpecies } from '../services/pokeapi';
import { createFighter } from '../game/battle';
import PixelBackground from './PixelBackground';
import { useLang } from '../i18n';

/**
 * Pantalla del creador: coger cualquier Pokémon al nivel que quieras
 * Solo la ve la cuenta del creador
 */
export default function CreatorPicker({ onAdd, onBack }) {
  const { t } = useLang();
  const [list, setList] = useState([]);
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState(15);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
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

  const grab = async (pokemon) => {
    if (busy) return;
    setBusy(true);
    setError('');

    try {
      const species = await loadSpecies(pokemon.id);
      onAdd(createFighter(species, level));
      setNotice(t('{0} nivel {1} añadido a tu colección', pokemon.name, level));
    } catch (err) {
      console.error('Error cogiendo el Pokémon:', err);
      setError('No se pudo coger ese Pokémon. Inténtalo otra vez.');
    } finally {
      setBusy(false);
    }
  };

  const filtered = list.filter(pokemon => pokemon.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="relative min-h-screen overflow-hidden p-4">
      <PixelBackground name="torre" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/70 to-slate-900/90" />

      <div className="relative max-w-3xl mx-auto pb-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white/20 flex items-center justify-center border-4 border-white/40 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition flex-shrink-0"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base font-black text-white leading-loose flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-fuchsia-300" />
              {t('Coger Pokémon')}
            </h1>
            <p className="text-fuchsia-300 text-[9px] leading-loose">{t('Solo lo ves tú, el creador')}</p>
          </div>
        </div>

        {notice && (
          <div className="bg-fuchsia-500/30 border-4 border-fuchsia-300/60 text-white p-3 text-[10px] leading-loose mb-3">
            {notice}
          </div>
        )}

        {error && (
          <div className="bg-red-500/30 border-4 border-red-300/50 text-white p-3 text-[10px] leading-loose mb-3">
            {error}
          </div>
        )}

        {/* Nivel al que se coge */}
        <div className="bg-white/10 border-4 border-white/30 p-3 mb-4">
          <p className="text-white/80 text-[10px] leading-loose mb-2">{t('Nivel: {0}', level)}</p>
          <input
            type="range"
            min="1"
            max="60"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full accent-fuchsia-400"
          />
          <div className="flex gap-2 mt-2">
            {[5, 15, 30, 50].map(value => (
              <button
                key={value}
                type="button"
                onClick={() => setLevel(value)}
                className={`flex-1 border-4 py-2 text-[10px] font-black text-white transition ${
                  level === value ? 'bg-fuchsia-500/40 border-fuchsia-300' : 'bg-white/10 border-white/20'
                }`}
              >
                {t('Nv. {0}', value)}
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('Buscar por nombre...')}
          className="w-full bg-black/40 border-4 border-white/30 text-white placeholder-white/50 px-4 py-3 mb-4 outline-none focus:border-fuchsia-300"
        />

        {list.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="animate-spin text-5xl mb-3">⚡</div>
            <p className="text-white font-bold text-[10px]">{t('Cargando Pokémon...')}</p>
          </div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {filtered.map(pokemon => (
            <button
              key={pokemon.id}
              onClick={() => grab(pokemon)}
              disabled={busy}
              className="bg-white/10 border-4 border-white/20 p-2 hover:bg-white/25 hover:border-fuchsia-300 active:translate-y-1 transition disabled:opacity-50"
            >
              <PokeSprite src={pokemon.sprite} alt={pokemon.name} className="w-16 h-16 mx-auto object-contain" loading="lazy" />
              <p className="text-white font-black text-[9px] text-center truncate leading-loose">{pokemon.name}</p>
              <p className="text-white/50 text-[8px] text-center">Nº {pokemon.id}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
