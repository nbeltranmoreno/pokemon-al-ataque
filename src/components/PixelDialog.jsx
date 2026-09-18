import { useLang } from '../i18n';

// Cartel de aviso con el estilo del juego, para no usar los del navegador

const TONES = {
  danger: { box: 'bg-red-700 border-yellow-300', confirm: 'bg-yellow-300 text-red-900 border-yellow-100' },
  info: { box: 'bg-indigo-800 border-cyan-300', confirm: 'bg-cyan-300 text-indigo-900 border-cyan-100' }
};

export default function PixelDialog({
  icon = '⚠️',
  title,
  children,
  confirmText,
  cancelText,
  tone = 'danger',
  onConfirm,
  onCancel
}) {
  const { t } = useLang();
  const colors = TONES[tone] || TONES.danger;

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
      <div className={`max-w-sm w-full border-4 shadow-[8px_8px_0_rgba(0,0,0,0.6)] p-5 text-center ${colors.box}`}>
        <div className="flex items-center justify-center gap-3 mb-3">
          {typeof icon === 'string' ? <span className="text-4xl animate-pulse">{icon}</span> : icon}
        </div>

        {title && <h2 className="text-yellow-300 font-black text-sm leading-loose mb-3">{title}</h2>}

        <div className="text-white text-[10px] leading-loose mb-5">{children}</div>

        <div className="space-y-2">
          <button
            onClick={onConfirm}
            className={`w-full font-black py-3 border-4 shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 transition ${colors.confirm}`}
          >
            {confirmText || t('Sí')}
          </button>
          <button
            onClick={onCancel}
            className="w-full bg-white/20 text-white font-black py-3 border-4 border-white/40 shadow-[4px_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 transition"
          >
            {cancelText || t('No, volver')}
          </button>
        </div>
      </div>
    </div>
  );
}
