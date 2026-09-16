import { useState } from 'react';
import { ArrowLeft, HeartPulse, Repeat } from 'lucide-react';
import { xpToNextLevel } from '../game/battle';
import HealthBar from './HealthBar';
import TypeBadge from './TypeBadge';

/**
 * Pantalla del equipo: ver Pokémon, curarlos e intercambiar con los guardados
 */
export default function TeamScreen({ save, onHeal, onSwap, onBack }) {
  const [swapping, setSwapping] = useState(null);

  const handleBoxClick = (boxUid) => {
    if (!swapping) return;
    onSwap(swapping, boxUid);
    setSwapping(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-teal-800 to-cyan-900 p-4">
      <div className="max-w-2xl mx-auto pb-10">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition flex-shrink-0"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-3xl font-black text-white">Mi equipo</h1>
        </div>

        <button
          onClick={onHeal}
          className="w-full bg-white text-emerald-700 font-black py-4 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2 mb-6"
        >
          <HeartPulse className="w-6 h-6" />
          Curar a todo el equipo
        </button>

        <div className="space-y-3">
          {save.team.map(pokemon => (
            <div
              key={pokemon.uid}
              className={`bg-white/15 backdrop-blur rounded-2xl p-3 border-2 transition ${
                swapping === pokemon.uid ? 'border-yellow-300' : 'border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={pokemon.sprites.front} alt={pokemon.name} className="w-16 h-16 object-contain flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-white font-black truncate">{pokemon.name}</p>
                    <span className="text-white/80 text-xs font-bold whitespace-nowrap">Nv. {pokemon.level}</span>
                  </div>
                  <HealthBar hp={pokemon.hp} maxHp={pokemon.maxHp} />
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {pokemon.types.map(type => (
                      <TypeBadge key={type} type={type} small />
                    ))}
                    <span className="text-white/70 text-[11px] font-bold">
                      EXP {pokemon.xp}/{xpToNextLevel(pokemon.level)}
                    </span>
                  </div>
                </div>
                {save.box.length > 0 && (
                  <button
                    onClick={() => setSwapping(swapping === pokemon.uid ? null : pokemon.uid)}
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition flex-shrink-0"
                    title="Intercambiar"
                  >
                    <Repeat className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {pokemon.moves.map(move => (
                  <span key={move.id} className="bg-black/30 text-white text-[11px] font-bold px-2 py-1 rounded-lg">
                    {move.name} · {move.ppLeft}/{move.pp} PP
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {save.box.length > 0 && (
          <section className="mt-8">
            <h2 className="text-white font-black text-xl mb-1">Pokémon guardados</h2>
            <p className="text-white/70 text-sm mb-3">
              {swapping ? 'Toca uno para intercambiarlo' : 'Pulsa 🔁 en un Pokémon del equipo para intercambiarlo'}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {save.box.map(pokemon => (
                <button
                  key={pokemon.uid}
                  onClick={() => handleBoxClick(pokemon.uid)}
                  disabled={!swapping}
                  className="bg-white/10 rounded-2xl p-2 border-2 border-white/20 hover:bg-white/20 transition disabled:opacity-60"
                >
                  <img src={pokemon.sprites.front} alt={pokemon.name} className="w-14 h-14 mx-auto object-contain" />
                  <p className="text-white text-xs font-bold text-center truncate">{pokemon.name}</p>
                  <p className="text-white/60 text-[10px] text-center">Nv. {pokemon.level}</p>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
