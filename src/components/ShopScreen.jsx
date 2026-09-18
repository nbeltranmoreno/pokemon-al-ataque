import { ArrowLeft } from 'lucide-react';
import { ITEMS } from '../data/items';
import PixelItem from './PixelItem';
import PixelBackground from './PixelBackground';
import { useLang } from '../i18n';
import { precioHoy, porcentajeDeHoy } from '../data/ofertas';

/**
 * Tienda: se compra con las monedas que se ganan al combatir
 */
export default function ShopScreen({ coins, balls, inventory, onBuy, onBack }) {
  const { t } = useLang();
  const rebaja = porcentajeDeHoy();

  return (
    <div className="relative min-h-screen overflow-hidden p-4">
      <PixelBackground name="pueblo" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/45 via-slate-900/65 to-slate-900/85" />

      <div className="relative max-w-md mx-auto pb-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white/20 flex items-center justify-center border-4 border-white/40 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition flex-shrink-0"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-base font-black text-white">🛒 {t('Tienda')}</h1>
        </div>

        {rebaja > 0 && (
          <div className="bg-red-500 text-white border-4 border-yellow-300 shadow-[6px_6px_0_rgba(0,0,0,0.45)] p-3 text-center mb-4 animate-pulse">
            <p className="font-black text-xs leading-loose">{t('🎉 ¡HOY HAY OFERTA! -{0}% en todo', rebaja)}</p>
            <p className="text-[9px] leading-loose">{t('Solo por hoy. Mañana puede que no haya.')}</p>
          </div>
        )}

        <div className="bg-yellow-400 text-yellow-900 border-4 border-yellow-900 shadow-[6px_6px_0_rgba(0,0,0,0.45)] p-3 text-center mb-5">
          <p className="font-black text-xs leading-loose">{t('🪙 {0} monedas', coins)}</p>
          <p className="text-[9px] leading-loose">{t('Ganas 60 monedas por cada entrenador de la Historia. La Práctica no da monedas')}</p>
        </div>

        <div className="space-y-3">
          {ITEMS.map(item => {
            const owned = item.effect === 'balls' ? balls : inventory[item.id] || 0;
            const precio = precioHoy(item.price);
            const canBuy = coins >= precio;

            return (
              <div key={item.id} className="bg-white/15 border-4 border-white/30 p-3 flex items-center gap-3">
                <PixelItem id={item.id} className="w-10 h-10 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-black text-[10px] leading-loose truncate">{t(item.name)}</p>
                  <p className="text-white/70 text-[9px] leading-loose">{t(item.description)}</p>
                  <p className="text-white/50 text-[9px]">{t('Tienes: {0}', owned)}</p>
                </div>
                <button
                  onClick={() => onBuy(item.id)}
                  disabled={!canBuy}
                  className="bg-yellow-400 text-yellow-900 font-black px-3 py-3 border-4 border-yellow-900 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition disabled:opacity-40 flex-shrink-0 text-[10px]"
                >
                  {rebaja > 0 ? (
                    <>
                      <span className="line-through opacity-70 block text-[8px]">🪙 {item.price}</span>
                      🪙 {precio}
                    </>
                  ) : (
                    <>🪙 {precio}</>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-white/70 text-[9px] leading-loose text-center mt-5">
          {t('Lo que compres aparece en "Mi equipo", dentro del Inventario.')}
        </p>
      </div>
    </div>
  );
}
