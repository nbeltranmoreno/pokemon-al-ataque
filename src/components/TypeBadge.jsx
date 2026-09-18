import { TYPE_COLORS, TYPE_NAMES } from '../data/types';
import { useLang } from '../i18n';

export default function TypeBadge({ type, small = false }) {
  const { t } = useLang();

  return (
    <span
      className={`${TYPE_COLORS[type] || 'bg-gray-400'} text-white font-bold rounded-full shadow ${
        small ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1'
      }`}
    >
      {t(TYPE_NAMES[type] || type)}
    </span>
  );
}
