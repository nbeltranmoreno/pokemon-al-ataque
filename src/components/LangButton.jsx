import { useLang } from '../i18n';

/**
 * Botón para cambiar de idioma: español o inglés
 */
export default function LangButton({ className = '' }) {
  const { lang, setLang } = useLang();

  return (
    <div className={`inline-flex border-4 border-white/40 overflow-hidden ${className}`}>
      {[
        ['es', 'ES'],
        ['en', 'EN']
      ].map(([code, label]) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          className={`px-3 py-1 font-black text-[10px] transition ${
            lang === code ? 'bg-yellow-400 text-yellow-900' : 'bg-black/40 text-white/70 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
