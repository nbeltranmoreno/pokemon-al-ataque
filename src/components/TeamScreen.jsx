import { useState } from 'react';
import { ArrowLeft, HeartPulse, Repeat } from 'lucide-react';
import { xpToNextLevel } from '../game/battle';
import { getItem, ITEMS } from '../data/items';
import HealthBar from './HealthBar';
import PixelBackground from './PixelBackground';
import TypeBadge from './TypeBadge';
import PixelTrainer from './PixelTrainer';
import PixelItem from './PixelItem';

/**
 * Pantalla del equipo: ver Pokémon, curarlos, usar el inventario e intercambiar con los guardados
 */
export default function TeamScreen({ save, onHeal, onSwap, onUseItem, onBack }) {
  const [swapping, setSwapping] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Objetos comprados que quedan en el inventario
  const owned = ITEMS.filter(item => item.effect !== 'balls' && (save.inventory[item.id] || 0) > 0);

  const handleBoxClick = (boxUid) => {
    if (!swapping) return;
    onSwap(swapping, boxUid);
    setSwapping(null);
  };

  // Con un objeto elegido, tocar un Pokémon se lo da
  const handlePokemonClick = (pokemon) => {
    if (!selectedItem) return;
    onUseItem(selectedItem, pokemon.uid);
    setSelectedItem(null);
  };

  // ¿Le sirve de algo este objeto a este Pokémon?
  const itemWorksOn = (item, pokemon) => {
    if (!item) return false;
    if (item.effect === 'heal') return pokemon.hp > 0 && pokemon.hp < pokemon.maxHp;
    if (item.effect === 'revive') return pokemon.hp <= 0;
    return true;
  };

  const chosen = getItem(selectedItem);

  return (
    <div className="relative min-h-screen overflow-hidden p-4">
      <PixelBackground name="bosque" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/45 via-slate-900/65 to-slate-900/85" />

      <div className="relative max-w-2xl mx-auto pb-10">
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white/20 flex items-center justify-center border-4 border-white/40 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition flex-shrink-0"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <PixelTrainer gender={save.gender} outfit={save.outfit} className="w-8 h-10 flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="text-base font-black text-white leading-loose">Mi equipo</h1>
            {save.username && <p className="text-white/70 text-[9px] truncate">{save.username}</p>}
          </div>
        </div>

        <button
          onClick={onHeal}
          className="w-full bg-white text-emerald-700 font-black py-4 border-4 border-emerald-900 shadow-[6px_6px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition flex items-center justify-center gap-2 mb-6"
        >
          <HeartPulse className="w-5 h-5" />
          Curar a todo el equipo
        </button>

        {/* Inventario */}
        <section className="mb-6">
          <h2 className="text-white font-black text-xs mb-1">🎒 Inventario</h2>
          {owned.length === 0 ? (
            <p className="text-white/70 text-[9px] leading-loose bg-black/20 border-4 border-white/20 p-3">
              Está vacío. Lo que compres en la Tienda 🛒 aparecerá aquí.
            </p>
          ) : (
            <>
              <p className="text-white/70 text-[9px] leading-loose mb-2">
                {chosen ? `Toca al Pokémon que va a usar ${chosen.name}` : 'Toca un objeto para usarlo'}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {owned.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    className={`border-4 p-2 transition ${
                      selectedItem === item.id
                        ? 'bg-yellow-300/30 border-yellow-300'
                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <PixelItem id={item.id} className="w-8 h-8 mx-auto" />
                    <p className="text-white text-[9px] font-black text-center truncate leading-loose">{item.name}</p>
                    <p className="text-white/60 text-[9px] text-center">x{save.inventory[item.id]}</p>
                  </button>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Pokémon del equipo */}
        <div className="space-y-3">
          {save.team.map(pokemon => {
            const usable = itemWorksOn(chosen, pokemon);

            return (
              <div
                key={pokemon.uid}
                onClick={() => usable && handlePokemonClick(pokemon)}
                className={`bg-white/15 border-4 p-3 transition ${
                  swapping === pokemon.uid
                    ? 'border-yellow-300'
                    : chosen && usable
                      ? 'border-green-300 cursor-pointer hover:bg-white/25'
                      : chosen
                        ? 'border-white/20 opacity-50'
                        : 'border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={pokemon.sprites.front} alt={pokemon.name} className="w-16 h-16 object-contain flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-white font-black text-[10px] truncate leading-loose">{pokemon.name}</p>
                      <span className="text-white/80 text-[9px] font-bold whitespace-nowrap">Nv. {pokemon.level}</span>
                    </div>
                    <HealthBar hp={pokemon.hp} maxHp={pokemon.maxHp} />
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {pokemon.types.map(type => (
                        <TypeBadge key={type} type={type} small />
                      ))}
                    </div>

                    {/* Barra de experiencia */}
                    <div className="mt-2">
                      <div className="h-2 w-full bg-black/40 border-2 border-white/30">
                        <div
                          className="h-full bg-cyan-400 transition-all duration-500"
                          style={{ width: `${Math.min(100, (pokemon.xp / xpToNextLevel(pokemon.level)) * 100)}%` }}
                        />
                      </div>
                      <p className="text-cyan-200 text-[9px] font-bold mt-1 leading-loose">
                        EXP {pokemon.xp}/{xpToNextLevel(pokemon.level)} · faltan{' '}
                        {Math.max(0, xpToNextLevel(pokemon.level) - pokemon.xp)} para el nivel {pokemon.level + 1}
                      </p>
                    </div>
                  </div>
                  {save.box.length > 0 && !chosen && (
                    <button
                      onClick={() => setSwapping(swapping === pokemon.uid ? null : pokemon.uid)}
                      className="w-10 h-10 bg-white/20 flex items-center justify-center border-4 border-white/30 hover:bg-white/30 transition flex-shrink-0"
                      title="Intercambiar"
                    >
                      <Repeat className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {pokemon.moves.map(move => (
                    <span key={move.id} className="bg-black/30 text-white text-[9px] font-bold px-2 py-1">
                      {move.name} · {move.ppLeft}/{move.pp} PP
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {save.box.length > 0 && (
          <section className="mt-8">
            <h2 className="text-white font-black text-xs mb-2">Pokémon guardados</h2>
            <p className="text-white/70 text-[9px] leading-loose mb-3">
              {swapping ? 'Toca uno para intercambiarlo' : 'Pulsa 🔁 en un Pokémon del equipo para intercambiarlo'}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {save.box.map(pokemon => (
                <button
                  key={pokemon.uid}
                  onClick={() => handleBoxClick(pokemon.uid)}
                  disabled={!swapping}
                  className="bg-white/10 border-4 border-white/20 p-2 hover:bg-white/20 transition disabled:opacity-60"
                >
                  <img src={pokemon.sprites.front} alt={pokemon.name} className="w-14 h-14 mx-auto object-contain" />
                  <p className="text-white text-[9px] font-bold text-center truncate">{pokemon.name}</p>
                  <p className="text-white/60 text-[9px] text-center">Nv. {pokemon.level}</p>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
