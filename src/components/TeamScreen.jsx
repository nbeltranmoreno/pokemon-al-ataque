import { useState } from 'react';
import PokeSprite from './PokeSprite';
import { ArrowLeft, HeartPulse, Repeat } from 'lucide-react';
import { xpToNextLevel } from '../game/battle';
import { getItem, ITEMS } from '../data/items';
import { sellPrice } from '../game/prices';
import PixelDialog from './PixelDialog';
import HealthBar from './HealthBar';
import PixelBackground from './PixelBackground';
import TypeBadge from './TypeBadge';
import PixelTrainer from './PixelTrainer';
import PixelItem from './PixelItem';
import { useLang } from '../i18n';

/**
 * Pantalla del equipo: ver Pokémon, curarlos, usar el inventario e intercambiar con los guardados
 */
export default function TeamScreen({ save, onSwap, onUseItem, onSell, onRescue, onBack }) {
  const { t } = useLang();
  const [swapping, setSwapping] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selling, setSelling] = useState(null); // Pokémon que se está vendiendo

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
    if (item.effect === 'full')
      return pokemon.hp > 0 && (pokemon.hp < pokemon.maxHp || pokemon.moves.some(move => move.ppLeft < move.pp));
    if (item.effect === 'revive') return pokemon.hp <= 0;
    return true;
  };

  // Por qué un objeto no le sirve a ese Pokémon, para que se entienda
  const whyNot = (item, pokemon) => {
    if (!item || itemWorksOn(item, pokemon)) return '';
    if (item.effect === 'revive') return 'No está debilitado';
    if (pokemon.hp <= 0) return 'Está debilitado: necesita Revivir';
    return 'Ya está curado del todo';
  };

  const chosen = getItem(selectedItem);

  // Rescate: todos debilitados, sin objetos para curar y sin monedas para comprarlos
  const tieneCura = ITEMS.some(item => (item.effect === 'heal' || item.effect === 'full' || item.effect === 'revive') && (save.inventory[item.id] || 0) > 0);
  const masBarato = Math.min(...ITEMS.filter(item => item.effect === 'heal' || item.effect === 'revive').map(item => item.price));
  const atascado = save.team.length > 0 && save.team.every(pokemon => pokemon.hp <= 0) && !tieneCura && save.coins < masBarato;

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
          <PixelTrainer gender={save.gender} outfit={save.outfit} className="w-9 h-12 flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="text-base font-black text-white leading-loose">{t('Mi equipo')}</h1>
            {save.username && <p className="text-white/70 text-[9px] truncate">{save.username}</p>}
          </div>
        </div>

        <div className="bg-white/10 border-4 border-white/30 p-3 mb-6 flex items-center gap-3">
          <HeartPulse className="w-5 h-5 text-emerald-300 flex-shrink-0" />
          <p className="text-white/80 text-[9px] leading-loose">
            {t('Para curar usa objetos de la Tienda: Poción, Super Poción, Cura Total o Revivir. Ya no se cura gratis.')}
          </p>
        </div>

        {/* Rescate: para no quedarse sin poder jugar */}
        {atascado && onRescue && (
          <div className="bg-red-500/30 border-4 border-red-300/60 p-3 mb-5">
            <p className="text-white text-[10px] leading-loose mb-2">
              {t('Todos tus Pokémon están debilitados y no te llega para curarlos. Por esta vez, el Centro Pokémon te los cura gratis.')}
            </p>
            <button
              onClick={onRescue}
              className="w-full bg-white text-red-700 font-black py-3 border-4 border-red-900 shadow-[4px_4px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition text-[10px]"
            >
              {t('🚑 Curar gratis (rescate)')}
            </button>
          </div>
        )}

        {/* Inventario */}
        <section className="mb-6">
          <h2 className="text-white font-black text-xs mb-1">🎒 {t('Inventario')}</h2>
          {owned.length === 0 ? (
            <p className="text-white/70 text-[9px] leading-loose bg-black/20 border-4 border-white/20 p-3">
              {t('Está vacío. Lo que compres en la Tienda 🛒 aparecerá aquí.')}
            </p>
          ) : (
            <>
              <p className="text-white/70 text-[9px] leading-loose mb-2">
                {chosen ? t('Toca al Pokémon que va a usar {0}', t(chosen.name)) : t('Toca un objeto para usarlo')}
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
                    <p className="text-white text-[9px] font-black text-center truncate leading-loose">{t(item.name)}</p>
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
                  <PokeSprite src={pokemon.sprites.front} alt={pokemon.name} className="w-16 h-16 object-contain flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-white font-black text-[10px] truncate leading-loose">{pokemon.name}</p>
                      <span className="text-white/80 text-[9px] font-bold whitespace-nowrap">{t('Nv. {0}', pokemon.level)}</span>
                    </div>
                    <HealthBar hp={pokemon.hp} maxHp={pokemon.maxHp} />
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {pokemon.types.map(type => (
                        <TypeBadge key={type} type={type} small />
                      ))}
                      {chosen && whyNot(chosen, pokemon) && (
                        <span className="text-yellow-300 text-[9px] font-black leading-loose">{t(whyNot(chosen, pokemon))}</span>
                      )}
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
                        {t('EXP {0}/{1} · faltan {2} para el nivel {3}', pokemon.xp, xpToNextLevel(pokemon.level), Math.max(0, xpToNextLevel(pokemon.level) - pokemon.xp), pokemon.level + 1)}
                      </p>
                    </div>
                  </div>
                  {!chosen && (
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {save.box.length > 0 && (
                        <button
                          onClick={() => setSwapping(swapping === pokemon.uid ? null : pokemon.uid)}
                          className="w-10 h-10 bg-white/20 flex items-center justify-center border-4 border-white/30 hover:bg-white/30 transition"
                          title={t('Intercambiar')}
                        >
                          <Repeat className="w-4 h-4 text-white" />
                        </button>
                      )}

                      <button
                        onClick={() => setSelling(pokemon)}
                        disabled={save.team.length <= 1}
                        className="w-10 h-10 bg-yellow-400/90 text-yellow-900 font-black flex items-center justify-center border-4 border-yellow-200 hover:bg-yellow-300 transition disabled:opacity-40"
                        title={save.team.length <= 1 ? t('No puedes quedarte sin Pokémon') : t('Vender')}
                      >
                        🪙
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {pokemon.moves.map(move => (
                    <span key={move.id} className="bg-black/30 text-white text-[9px] font-bold px-2 py-1">
                      {move.name} · {move.ppLeft}/{move.pp} {t('PP')}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {save.box.length > 0 && (
          <section className="mt-8">
            <h2 className="text-white font-black text-xs mb-2">{t('Pokémon guardados')}</h2>
            <p className="text-white/70 text-[9px] leading-loose mb-3">
              {swapping ? t('Toca uno para intercambiarlo') : t('Pulsa 🔁 en un Pokémon del equipo para intercambiarlo')}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {save.box.map(pokemon => (
                <div key={pokemon.uid} className="bg-white/10 border-4 border-white/20 p-2">
                  <button
                    onClick={() => handleBoxClick(pokemon.uid)}
                    disabled={!swapping}
                    className="w-full hover:opacity-80 transition disabled:opacity-100"
                  >
                    <PokeSprite src={pokemon.sprites.front} alt={pokemon.name} className="w-14 h-14 mx-auto object-contain" />
                    <p className="text-white text-[9px] font-bold text-center truncate">{pokemon.name}</p>
                    <p className="text-white/60 text-[9px] text-center">{t('Nv. {0}', pokemon.level)}</p>
                  </button>

                  <button
                    onClick={() => setSelling(pokemon)}
                    className="w-full mt-1 bg-yellow-400/90 text-yellow-900 font-black text-[9px] py-1 border-2 border-yellow-200 hover:bg-yellow-300 transition"
                  >
                    🪙 {sellPrice(pokemon)}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Aviso antes de vender */}
      {selling && (
        <PixelDialog
          icon={<PokeSprite src={selling.sprites.front} alt="" className="w-16 h-16 object-contain" />}
          title={t('¿Vender a {0}?', selling.name)}
          confirmText={t('Sí, vender por {0} 🪙', sellPrice(selling))}
          onConfirm={() => {
            onSell(selling.uid);
            setSelling(null);
          }}
          onCancel={() => setSelling(null)}
        >
          {t('Te pagan {0} monedas por él, porque es de nivel {1}. Cuanto mejor y más alto de nivel sea un Pokémon, más te dan. Esto no se puede deshacer.', sellPrice(selling), selling.level)}
        </PixelDialog>
      )}
    </div>
  );
}
