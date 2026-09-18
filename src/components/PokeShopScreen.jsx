import { useState } from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import PokeSprite from './PokeSprite';
import PixelBackground from './PixelBackground';
import PixelDialog from './PixelDialog';
import { POKE_SHOP, trainerExp } from '../data/pokeshop';
import { loadSpecies, spriteUrl } from '../services/pokeapi';
import { createFighter } from '../game/battle';
import { useLang } from '../i18n';

/**
 * Tienda de Pokémon: se desbloquean con la experiencia de entrenador
 * y se compran con monedas
 */
export default function PokeShopScreen({ save, onBuy, onBack }) {
  const { t } = useLang();
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [comprando, setComprando] = useState(null);

  const exp = trainerExp(save);

  const comprar = async (entry) => {
    if (busy) return;
    setBusy(true);
    setError('');
    setComprando(null);

    try {
      // Los datos de verdad (ataques, fuerza y nombre) se piden al comprarlo
      const species = await loadSpecies(entry.id);
      onBuy(createFighter(species, entry.level), entry.price);
      setNotice(t('¡{0} es tuyo! Está en "Mi equipo".', species.name));
    } catch (err) {
      console.error('Error comprando el Pokémon:', err);
      setError('No se pudo comprar. Revisa tu conexión a internet.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden p-4">
      <PixelBackground name="pueblo" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/45 via-slate-900/65 to-slate-900/85" />

      <div className="relative max-w-2xl mx-auto pb-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white/20 flex items-center justify-center border-4 border-white/40 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition flex-shrink-0"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-base font-black text-white leading-loose">🏪 {t('Tienda de Pokémon')}</h1>
        </div>

        <div className="bg-yellow-400 text-yellow-900 border-4 border-yellow-900 shadow-[6px_6px_0_rgba(0,0,0,0.45)] p-3 text-center mb-4">
          <p className="font-black text-xs leading-loose">{t('🪙 {0} monedas · ⭐ {1} de experiencia', save.coins, exp)}</p>
          <p className="text-[9px] leading-loose">
            {t('Tu experiencia es la suma de los niveles de todos tus Pokémon. Cuanto más subes de nivel, mejores Pokémon se abren.')}
          </p>
        </div>

        {notice && (
          <div className="bg-green-500/30 border-4 border-green-300/60 text-white p-3 text-[10px] leading-loose mb-3">
            {notice}
          </div>
        )}

        {error && (
          <div className="bg-red-500/30 border-4 border-red-300/50 text-white p-3 text-[10px] leading-loose mb-3">
            {t(error)}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {POKE_SHOP.map(entry => {
            const abierto = exp >= entry.exp;
            const alcanza = save.coins >= entry.price;

            return (
              <div
                key={entry.id}
                className={`bg-white/10 border-4 p-2 text-center ${abierto ? 'border-white/30' : 'border-white/10'}`}
              >
                <div className="relative">
                  <PokeSprite
                    src={spriteUrl(entry.id)}
                    alt=""
                    className={`w-16 h-16 mx-auto object-contain ${abierto ? '' : 'brightness-0 opacity-50'}`}
                    loading="lazy"
                  />
                  {!abierto && <Lock className="w-5 h-5 text-white/80 absolute inset-0 m-auto" />}
                </div>

                <p className="text-white font-black text-[9px] truncate leading-loose">
                  {abierto ? entry.name : '???'}
                </p>
                <p className="text-white/60 text-[9px] leading-loose">{t('Nv. {0}', entry.level)}</p>

                {abierto ? (
                  <button
                    onClick={() => setComprando(entry)}
                    disabled={!alcanza || busy}
                    className="w-full mt-1 bg-yellow-400 text-yellow-900 font-black text-[9px] py-2 border-4 border-yellow-900 shadow-[3px_3px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition disabled:opacity-40"
                  >
                    🪙 {entry.price}
                  </button>
                ) : (
                  <p className="w-full mt-1 bg-black/40 text-white/70 font-black text-[9px] py-2 border-4 border-white/20 leading-loose">
                    {t('⭐ {0} exp', entry.exp)}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-white/70 text-[9px] leading-loose text-center mt-5">
          {t('Ganas monedas peleando en la Historia y en Peleas, vendiendo Pokémon, apostando en Online y 5 gratis cada 10 minutos.')}
        </p>
      </div>

      {/* Aviso antes de comprar */}
      {comprando && (
        <PixelDialog
          icon={<PokeSprite src={spriteUrl(comprando.id)} alt="" className="w-16 h-16 object-contain" />}
          tone="info"
          title={t('¿Comprar a {0}?', comprando.name)}
          confirmText={t('Sí, comprar por {0} 🪙', comprando.price)}
          onConfirm={() => comprar(comprando)}
          onCancel={() => setComprando(null)}
        >
          {t('Llega al nivel {0} y se une a tu equipo. Si ya tienes 6, se queda guardado.', comprando.level)}
        </PixelDialog>
      )}
    </div>
  );
}
