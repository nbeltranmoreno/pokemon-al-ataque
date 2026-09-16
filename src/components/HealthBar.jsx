export default function HealthBar({ hp, maxHp, showNumbers = true }) {
  const percent = Math.max(0, Math.min(100, (hp / maxHp) * 100));
  const color = percent > 50 ? 'bg-green-500' : percent > 20 ? 'bg-yellow-400' : 'bg-red-500';

  return (
    <div>
      <div className="h-3 w-full bg-black/30 rounded-full overflow-hidden border border-white/30">
        <div
          className={`h-full ${color} transition-all duration-500 rounded-full`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {showNumbers && (
        <p className="text-white/90 text-xs font-bold mt-1 text-right">
          {Math.max(0, hp)} / {maxHp} PS
        </p>
      )}
    </div>
  );
}
