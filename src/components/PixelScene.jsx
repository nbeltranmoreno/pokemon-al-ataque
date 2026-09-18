// Escenarios de la Historia (64x36): pixel art con degradados y sombras, estilo medio anime
// Los colores pasan de uno a otro con degradado y con una franja de puntitos, para que no se vean rayas

let key = 0;
const r = (x, y, w, h, fill, opacity) => (
  <rect key={`r${key++}`} x={x} y={y} width={w} height={h} fill={fill} opacity={opacity} />
);

// Franja de puntitos para mezclar dos zonas sin que se note el corte
const dither = (y, color) => {
  const pixels = [];
  for (let x = 0; x < 64; x += 2) {
    pixels.push(r(x, y, 1, 1, color, 0.75));
    pixels.push(r(x + 1, y + 1, 1, 1, color, 0.45));
  }
  return pixels;
};

// Sol o luna con resplandor
const glow = (x, y, size, color, halo) => [
  r(x - 3, y - 3, size + 6, size + 6, halo, 0.18),
  r(x - 2, y - 2, size + 4, size + 4, halo, 0.3),
  r(x - 1, y - 1, size + 2, size + 2, halo, 0.5),
  r(x, y, size, size, color)
];

const cloud = (x, y, w) => (
  <g key={`c${key++}`}>
    {r(x, y, w, 2, '#f8fafc')}
    {r(x + 1, y - 1, w - 2, 1, '#ffffff')}
    {r(x + 1, y + 2, w - 2, 1, '#cbd5e1', 0.9)}
  </g>
);

const tree = (x, y) => [
  r(x, y, 2, 6, '#78350f'),
  r(x, y, 1, 6, '#92400e'),
  r(x - 4, y - 6, 10, 6, '#166534'),
  r(x - 3, y - 7, 8, 2, '#22c55e'),
  r(x - 3, y - 5, 3, 2, '#4ade80', 0.7)
];

const DEFS = (
  <defs>
    <linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#38bdf8" />
      <stop offset="55%" stopColor="#7dd3fc" />
      <stop offset="100%" stopColor="#e0f2fe" />
    </linearGradient>
    <linearGradient id="skySunset" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#f59e0b" />
      <stop offset="45%" stopColor="#fb923c" />
      <stop offset="100%" stopColor="#fecaca" />
    </linearGradient>
    <linearGradient id="skyNight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#020617" />
      <stop offset="55%" stopColor="#1e1b4b" />
      <stop offset="100%" stopColor="#4c1d95" />
    </linearGradient>
    <linearGradient id="skyFire" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#450a0a" />
      <stop offset="50%" stopColor="#991b1b" />
      <stop offset="100%" stopColor="#f97316" />
    </linearGradient>
    <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#4ade80" />
      <stop offset="60%" stopColor="#22c55e" />
      <stop offset="100%" stopColor="#15803d" />
    </linearGradient>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#38bdf8" />
      <stop offset="50%" stopColor="#0284c7" />
      <stop offset="100%" stopColor="#0c4a6e" />
    </linearGradient>
    <linearGradient id="forest" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#166534" />
      <stop offset="60%" stopColor="#14532d" />
      <stop offset="100%" stopColor="#052e16" />
    </linearGradient>
    <linearGradient id="rock" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#4b5563" />
      <stop offset="60%" stopColor="#374151" />
      <stop offset="100%" stopColor="#111827" />
    </linearGradient>
    <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#fef3c7" />
      <stop offset="100%" stopColor="#fcd34d" />
    </linearGradient>
  </defs>
);

const SCENES = {
  pueblo: [
    r(0, 0, 64, 24, 'url(#skyDay)'),
    ...glow(48, 3, 6, '#fef9c3', '#fde047'),
    <g key="nubes1" className="animate-drift">{cloud(6, 5, 9)}{cloud(26, 3, 6)}</g>,
    r(0, 16, 20, 8, '#93c5fd', 0.9),
    r(14, 14, 18, 10, '#bfdbfe', 0.9),
    r(30, 16, 22, 8, '#93c5fd', 0.9),
    r(48, 15, 16, 9, '#bfdbfe', 0.9),
    ...dither(22, '#4ade80'),
    r(0, 24, 64, 12, 'url(#grass)'),
    r(27, 24, 10, 12, '#d9a066'),
    r(30, 24, 4, 12, '#eab676'),
    r(6, 12, 16, 3, '#dc2626'),
    r(6, 12, 16, 1, '#ef4444'),
    r(5, 15, 18, 1, '#b91c1c'),
    r(7, 16, 14, 9, '#fef3c7'),
    r(7, 16, 14, 1, '#fffbeb'),
    r(19, 16, 2, 9, '#fde68a'),
    r(12, 20, 4, 5, '#92400e'),
    r(16, 18, 3, 3, '#38bdf8'),
    r(16, 18, 3, 1, '#7dd3fc'),
    r(42, 14, 14, 3, '#b91c1c'),
    r(43, 17, 12, 8, '#fef3c7'),
    r(53, 17, 2, 8, '#fde68a'),
    r(47, 21, 3, 4, '#92400e'),
    r(50, 18, 3, 3, '#fde047'),
    <g key="humo" className="animate-smoke">{r(52, 10, 2, 2, '#e2e8f0', 0.7)}{r(53, 8, 2, 2, '#e2e8f0', 0.4)}</g>,
    ...tree(36, 19)
  ],
  ruta: [
    r(0, 0, 64, 22, 'url(#skyDay)'),
    ...glow(52, 2, 5, '#fef9c3', '#fde047'),
    <g key="nubes2" className="animate-driftSlow">{cloud(10, 4, 10)}{cloud(34, 7, 7)}</g>,
    ...dither(20, '#4ade80'),
    r(0, 22, 64, 14, 'url(#grass)'),
    r(0, 25, 64, 6, '#d9a066'),
    r(0, 27, 64, 2, '#eab676'),
    r(4, 22, 6, 2, '#16a34a'),
    r(20, 32, 8, 2, '#16a34a'),
    r(44, 22, 7, 2, '#16a34a'),
    r(54, 32, 7, 2, '#16a34a'),
    r(16, 20, 1, 5, '#a16207'),
    r(22, 20, 1, 5, '#a16207'),
    r(28, 20, 1, 5, '#a16207'),
    r(16, 21, 13, 1, '#ca8a04'),
    r(8, 33, 1, 1, '#f472b6'),
    r(35, 23, 1, 1, '#fde047'),
    r(50, 34, 1, 1, '#f472b6'),
    ...tree(10, 16),
    ...tree(58, 16)
  ],
  bosque: [
    r(0, 0, 64, 36, 'url(#forest)'),
    <g key="rayos" className="animate-shimmer">
      {r(14, 6, 3, 22, '#bbf7d0', 0.2)}
      {r(34, 6, 4, 24, '#bbf7d0', 0.16)}
      {r(52, 6, 3, 20, '#bbf7d0', 0.2)}
    </g>,
    r(6, 10, 4, 20, '#78350f'),
    r(7, 10, 1, 20, '#92400e'),
    r(24, 8, 5, 22, '#78350f'),
    r(25, 8, 1, 22, '#92400e'),
    r(44, 10, 4, 20, '#78350f'),
    r(45, 10, 1, 20, '#92400e'),
    r(58, 12, 4, 18, '#78350f'),
    r(2, 3, 12, 8, '#15803d'),
    r(20, 1, 14, 9, '#15803d'),
    r(40, 3, 13, 8, '#15803d'),
    r(54, 5, 10, 7, '#15803d'),
    r(3, 3, 10, 2, '#22c55e'),
    r(21, 1, 12, 2, '#22c55e'),
    r(41, 3, 11, 2, '#22c55e'),
    ...dither(28, '#365314'),
    r(0, 30, 64, 6, '#365314'),
    r(0, 34, 64, 2, '#1a2e05'),
    r(14, 32, 2, 2, '#ef4444'),
    r(14, 31, 2, 1, '#fca5a5'),
    r(40, 33, 2, 2, '#ef4444'),
    <g key="luciernagas" className="animate-twinkle">
      {r(30, 18, 1, 1, '#fde047')}
      {r(50, 22, 1, 1, '#fde047')}
      {r(18, 24, 1, 1, '#fde047')}
    </g>
  ],
  cueva: [
    r(0, 0, 64, 36, 'url(#rock)'),
    r(0, 0, 64, 8, '#374151'),
    r(6, 8, 2, 5, '#374151'),
    r(15, 8, 2, 3, '#374151'),
    r(27, 8, 3, 6, '#374151'),
    r(40, 8, 2, 4, '#374151'),
    r(52, 8, 2, 6, '#374151'),
    r(4, 14, 2, 6, '#92400e'),
    r(56, 14, 2, 6, '#92400e'),
    <g key="antorchas" className="animate-shimmer">
      {r(4, 12, 2, 2, '#fbbf24')}
      {r(1, 9, 8, 10, '#fbbf24', 0.2)}
      {r(56, 12, 2, 2, '#fbbf24')}
      {r(53, 9, 8, 10, '#fbbf24', 0.2)}
    </g>,
    ...dither(28, '#4b5563'),
    r(0, 30, 64, 6, '#4b5563'),
    r(0, 34, 64, 2, '#374151'),
    r(10, 26, 7, 4, '#6b7280'),
    r(11, 26, 5, 1, '#9ca3af'),
    r(40, 27, 9, 3, '#6b7280'),
    r(41, 27, 7, 1, '#9ca3af'),
    <g key="cristales" className="animate-twinkle">
      {r(50, 22, 2, 8, '#a78bfa')}
      {r(50, 22, 1, 8, '#c4b5fd')}
      {r(54, 25, 2, 5, '#a78bfa')}
      {r(22, 26, 2, 4, '#a78bfa')}
    </g>
  ],
  mar: [
    r(0, 0, 64, 18, 'url(#skySunset)'),
    ...glow(46, 3, 7, '#fef9c3', '#fdba74'),
    <g key="nubes3" className="animate-driftSlow">{cloud(10, 4, 11)}{cloud(30, 8, 7)}</g>,
    ...dither(16, '#38bdf8'),
    r(0, 18, 64, 18, 'url(#sea)'),
    r(44, 18, 6, 1, '#fef9c3', 0.8),
    r(46, 21, 5, 1, '#fef9c3', 0.6),
    r(45, 24, 6, 1, '#fef9c3', 0.4),
    <g key="olas" className="animate-wave">
      {r(6, 24, 8, 1, '#e0f2fe', 0.9)}
      {r(24, 28, 10, 1, '#e0f2fe', 0.9)}
      {r(48, 26, 9, 1, '#e0f2fe', 0.9)}
    </g>,
    ...dither(31, '#fde68a'),
    r(0, 33, 64, 3, 'url(#sand)'),
    r(18, 29, 28, 2, '#92400e'),
    r(18, 29, 28, 1, '#a16207'),
    r(22, 31, 2, 3, '#78350f'),
    r(40, 31, 2, 3, '#78350f')
  ],
  volcan: [
    r(0, 0, 64, 20, 'url(#skyFire)'),
    <g key="humo2" className="animate-smoke">
      {r(26, 3, 6, 2, '#78716c', 0.7)}
      {r(30, 1, 5, 2, '#78716c', 0.45)}
      {r(22, 0, 4, 2, '#78716c', 0.3)}
    </g>,
    r(28, 8, 8, 3, '#451a03'),
    r(24, 11, 16, 3, '#44403c'),
    r(20, 14, 24, 3, '#44403c'),
    r(14, 17, 36, 4, '#292524'),
    r(8, 21, 48, 4, '#292524'),
    r(0, 25, 64, 5, '#1c1917'),
    <g key="lava" className="animate-shimmer">
      {r(28, 8, 8, 2, '#f97316')}
      {r(29, 7, 6, 1, '#fbbf24')}
      {r(30, 10, 3, 11, '#ea580c')}
      {r(31, 10, 1, 11, '#fb923c')}
      {r(28, 21, 7, 4, '#ea580c')}
      {r(29, 21, 5, 2, '#f97316')}
    </g>,
    ...dither(29, '#292524'),
    r(0, 30, 64, 6, '#292524'),
    r(8, 32, 2, 1, '#f97316', 0.8),
    r(48, 33, 2, 1, '#f97316', 0.8),
    r(4, 28, 4, 2, '#57534e'),
    r(54, 27, 5, 3, '#57534e')
  ],
  torre: [
    r(0, 0, 64, 36, 'url(#skyNight)'),
    <g key="estrellas" className="animate-twinkle">
      {[[4, 3], [12, 7], [20, 2], [30, 5], [44, 3], [52, 8], [60, 5], [8, 12], [56, 14]].map(([x, y]) => r(x, y, 1, 1, '#f8fafc'))}
    </g>,
    ...glow(48, 4, 6, '#fef9c3', '#fde68a'),
    r(26, 4, 12, 2, '#4c1d95'),
    r(24, 6, 16, 3, '#5b21b6'),
    r(26, 9, 12, 24, '#6d28d9'),
    r(26, 9, 3, 24, '#7c3aed'),
    r(35, 9, 3, 24, '#4c1d95'),
    <g key="ventanas" className="animate-shimmer">
      {r(29, 13, 3, 3, '#fde047')}
      {r(33, 13, 3, 3, '#fde047')}
      {r(29, 20, 3, 3, '#fde047')}
      {r(33, 20, 3, 3, '#fde047')}
    </g>,
    r(30, 28, 4, 5, '#312e81'),
    <g key="psiquico" className="animate-twinkle">
      {r(20, 14, 2, 2, '#e879f9', 0.6)}
      {r(44, 18, 2, 2, '#e879f9', 0.6)}
      {r(16, 24, 2, 2, '#e879f9', 0.4)}
    </g>,
    ...dither(31, '#1e1b4b'),
    r(0, 33, 64, 3, '#1e1b4b')
  ],
  liga: [
    r(0, 0, 64, 20, 'url(#skySunset)'),
    ...glow(32, 2, 6, '#fef9c3', '#fed7aa'),
    <g key="nubes4" className="animate-drift">{cloud(8, 6, 9)}{cloud(46, 9, 8)}</g>,
    r(6, 12, 52, 3, '#b45309'),
    r(4, 15, 56, 2, '#92400e'),
    r(8, 17, 48, 15, '#fbbf24'),
    r(8, 17, 48, 1, '#fcd34d'),
    r(8, 28, 48, 4, '#d97706'),
    r(12, 19, 4, 13, '#fef3c7'),
    r(22, 19, 4, 13, '#fef3c7'),
    r(38, 19, 4, 13, '#fef3c7'),
    r(48, 19, 4, 13, '#fef3c7'),
    r(28, 18, 8, 14, '#78350f'),
    r(29, 19, 6, 13, '#92400e'),
    r(28, 32, 8, 4, '#dc2626'),
    r(30, 32, 4, 4, '#ef4444'),
    ...dither(31, '#a16207'),
    r(0, 32, 64, 4, '#a16207'),
    <g key="focos" className="animate-shimmer">
      {r(10, 10, 2, 2, '#fef9c3')}
      {r(52, 10, 2, 2, '#fef9c3')}
      {r(10, 12, 2, 8, '#fef9c3', 0.25)}
      {r(52, 12, 2, 8, '#fef9c3', 0.25)}
    </g>
  ]
};

export default function PixelScene({ name, className = '' }) {
  const scene = SCENES[name] || SCENES.ruta;

  return (
    <svg
      viewBox="0 0 64 36"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
    >
      {DEFS}
      {scene}
    </svg>
  );
}
