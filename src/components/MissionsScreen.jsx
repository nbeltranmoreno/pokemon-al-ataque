import { ArrowLeft, Check } from 'lucide-react';
import PixelBackground from './PixelBackground';
import { MISIONES, estaCobrada, sePuedeCobrar } from '../data/misiones';
import { useLang } from '../i18n';

const Grupo = ({ titulo, misiones, save, onCobrar, t }) => (
  <section className="mb-6">
    <h2 className="text-white font-black text-xs mb-2">{titulo}</h2>
    <div className="space-y-2">
      {misiones.map(mision => {
        const hecho = Math.min(mision.progreso(save), mision.meta);
        const cobrada = estaCobrada(save, mision);
        const lista = sePuedeCobrar(save, mision);
        const porcentaje = Math.round((hecho / mision.meta) * 100);

        return (
          <div
            key={mision.id}
            className={`bg-white/10 border-4 p-3 flex items-center gap-3 ${
              lista ? 'border-yellow-300' : cobrada ? 'border-green-300/50 opacity-70' : 'border-white/20'
            }`}
          >
            <span className="text-2xl flex-shrink-0">{mision.icono}</span>

            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-[10px] leading-loose">{t(mision.texto)}</p>
              <div className="h-2 w-full bg-black/40 border-2 border-white/30 mt-1">
                <div
                  className={`h-full ${lista ? 'bg-yellow-300' : cobrada ? 'bg-green-400' : 'bg-cyan-400'}`}
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
              <p className="text-white/70 text-[9px] leading-loose mt-1">
                {t('{0} de {1} · premio 🪙 {2}', hecho, mision.meta, mision.premio)}
              </p>
            </div>

            {cobrada ? (
              <span className="flex-shrink-0 w-10 h-10 bg-green-500/30 border-4 border-green-300/60 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-200" strokeWidth={4} />
              </span>
            ) : (
              <button
                onClick={() => onCobrar(mision.id)}
                disabled={!lista}
                className="flex-shrink-0 bg-yellow-400 text-yellow-900 font-black text-[9px] px-3 py-3 border-4 border-yellow-900 shadow-[3px_3px_0_rgba(0,0,0,0.45)] active:translate-y-1 transition disabled:opacity-30"
              >
                {t('Cobrar')}
              </button>
            )}
          </div>
        );
      })}
    </div>
  </section>
);

/**
 * Misiones: cosas que hacer para ganar monedas
 * Las del día se reinician cada mañana; los logros se cobran una vez
 */
export default function MissionsScreen({ save, onCobrar, onBack }) {
  const { t } = useLang();

  return (
    <div className="relative min-h-screen overflow-hidden p-4">
      <PixelBackground name="ruta" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/45 via-slate-900/65 to-slate-900/85" />

      <div className="relative max-w-2xl mx-auto pb-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white/20 flex items-center justify-center border-4 border-white/40 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition flex-shrink-0"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base font-black text-white leading-loose">🎯 {t('Misiones')}</h1>
            <p className="text-white/70 text-[9px] leading-loose">{t('🪙 {0} monedas', save.coins)}</p>
          </div>
        </div>

        <Grupo
          titulo={t('Hoy')}
          misiones={MISIONES.filter(mision => mision.tipo === 'diaria')}
          save={save}
          onCobrar={onCobrar}
          t={t}
        />

        <Grupo
          titulo={t('Logros')}
          misiones={MISIONES.filter(mision => mision.tipo === 'logro')}
          save={save}
          onCobrar={onCobrar}
          t={t}
        />

        <p className="text-white/70 text-[9px] leading-loose text-center">
          {t('Las misiones de hoy vuelven a empezar mañana. Los logros se cobran una sola vez.')}
        </p>
      </div>
    </div>
  );
}
