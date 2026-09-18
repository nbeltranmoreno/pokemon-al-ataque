// Escenarios de la Historia (64x36) en pixel art por capas, al estilo de las ilustraciones
// con siluetas: cielo con degradado, fondo claro y con neblina, y primeros planos casi negros

let key = 0;
const r = (x, y, w, h, fill, opacity) => (
  <rect key={`r${key++}`} x={x} y={y} width={w} height={h} fill={fill} opacity={opacity} />
);

// Franja de puntitos: mezcla dos zonas para que no se vea el corte
const dither = (y, color) => {
  const pixels = [];
  for (let x = 0; x < 64; x += 2) {
    pixels.push(r(x, y, 1, 1, color, 0.7));
    pixels.push(r(x + 1, y + 1, 1, 1, color, 0.4));
  }
  return pixels;
};

// Neblina entre capas: lo lejano se ve más lavado
const haze = (y, h, color, opacity = 0.25) => r(0, y, 64, h, color, opacity);

// Torres y edificios recortados contra el cielo
const skyline = (towers, base, color, opacity = 1) =>
  towers.flatMap(([x, w, h, roof]) => {
    const parts = [r(x, base - h, w, h, color, opacity)];
    if (roof === 'punta') {
      parts.push(r(x + Math.floor(w / 2) - 1, base - h - 3, 2, 3, color, opacity));
      parts.push(r(x + Math.floor(w / 2), base - h - 5, 1, 2, color, opacity));
    }
    if (roof === 'antena') {
      parts.push(r(x + Math.floor(w / 2), base - h - 4, 1, 4, color, opacity));
    }
    return parts;
  });

// Ventanas encendidas
const windows = (spots, color = '#fde047', opacity = 0.9) =>
  spots.map(([x, y]) => r(x, y, 1, 1, color, opacity));

const glow = (x, y, size, color, halo) => [
  r(x - 4, y - 4, size + 8, size + 8, halo, 0.12),
  r(x - 2, y - 2, size + 4, size + 4, halo, 0.25),
  r(x - 1, y - 1, size + 2, size + 2, halo, 0.45),
  r(x, y, size, size, color)
];

const cloud = (x, y, w, color = '#f8fafc', opacity = 0.8) => (
  <g key={`c${key++}`}>
    {r(x, y, w, 1, color, opacity)}
    {r(x + 1, y - 1, w - 3, 1, color, opacity * 0.8)}
  </g>
);

const DEFS = (
  <defs>
    <linearGradient id="skyDawn" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#7c2d12" />
      <stop offset="35%" stopColor="#ea580c" />
      <stop offset="70%" stopColor="#fbbf24" />
      <stop offset="100%" stopColor="#fef3c7" />
    </linearGradient>
    <linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#0369a1" />
      <stop offset="45%" stopColor="#38bdf8" />
      <stop offset="100%" stopColor="#e0f2fe" />
    </linearGradient>
    <linearGradient id="skyNight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#020617" />
      <stop offset="50%" stopColor="#1e1b4b" />
      <stop offset="100%" stopColor="#7e22ce" />
    </linearGradient>
    <linearGradient id="skyFire" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#450a0a" />
      <stop offset="45%" stopColor="#b91c1c" />
      <stop offset="100%" stopColor="#fb923c" />
    </linearGradient>
    <linearGradient id="deepGreen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#14532d" />
      <stop offset="60%" stopColor="#052e16" />
      <stop offset="100%" stopColor="#020617" />
    </linearGradient>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#fbbf24" />
      <stop offset="25%" stopColor="#0ea5e9" />
      <stop offset="100%" stopColor="#082f49" />
    </linearGradient>
    <linearGradient id="caveWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#4b5563" />
      <stop offset="60%" stopColor="#1f2937" />
      <stop offset="100%" stopColor="#030712" />
    </linearGradient>
  </defs>
);

const SCENES = {
  // Pueblo al amanecer: torres lejanas, tejados y farola en primer plano
  pueblo: [
    r(0, 0, 64, 36, 'url(#skyDawn)'),
    ...glow(44, 6, 7, '#fff7ed', '#fdba74'),
    <g key="n1" className="animate-driftSlow">{cloud(8, 5, 12, '#fed7aa')}{cloud(30, 9, 8, '#fdba74')}</g>,
    ...skyline([[2, 4, 10, 'punta'], [9, 5, 7], [16, 3, 12, 'antena'], [46, 5, 9, 'punta'], [54, 4, 6], [59, 5, 11, 'antena']], 24, '#c2410c', 0.45),
    haze(18, 7, '#fed7aa', 0.3),
    ...skyline([[6, 6, 9], [14, 5, 12, 'punta'], [21, 7, 7], [38, 6, 11, 'antena'], [48, 8, 8], [58, 6, 10, 'punta']], 27, '#7c2d12', 0.8),
    ...windows([[8, 21], [16, 18], [17, 22], [40, 19], [50, 22], [60, 20]], '#fde047', 0.8),
    haze(24, 4, '#fdba74', 0.22),
    ...dither(26, '#431407'),
    r(0, 28, 64, 8, '#431407'),
    r(0, 28, 64, 1, '#7c2d12'),
    r(4, 24, 12, 4, '#1c0a03'),
    r(3, 22, 14, 2, '#1c0a03'),
    r(20, 26, 9, 2, '#1c0a03'),
    r(50, 25, 12, 3, '#1c0a03'),
    r(49, 23, 14, 2, '#1c0a03'),
    r(34, 18, 1, 10, '#1c0a03'),
    r(33, 17, 3, 2, '#1c0a03'),
    <g key="farola" className="animate-shimmer">{r(34, 16, 1, 1, '#fde047')}{r(32, 15, 5, 4, '#fde047', 0.18)}</g>
  ],
  // Ruta de día, con colinas y hierba en primer plano
  ruta: [
    r(0, 0, 64, 36, 'url(#skyDay)'),
    ...glow(50, 3, 6, '#fef9c3', '#fde047'),
    <g key="n2" className="animate-drift">{cloud(6, 6, 12)}{cloud(34, 4, 9)}</g>,
    ...skyline([[0, 10, 6], [12, 14, 9], [28, 10, 5], [40, 16, 10], [56, 8, 7]], 22, '#7dd3fc', 0.55),
    haze(18, 5, '#e0f2fe', 0.3),
    ...skyline([[2, 12, 7], [16, 10, 10], [30, 14, 6], [46, 12, 9]], 26, '#15803d', 0.75),
    ...dither(25, '#166534'),
    r(0, 27, 64, 9, '#166534'),
    r(0, 27, 64, 1, '#22c55e'),
    r(0, 30, 64, 3, '#14532d'),
    r(0, 33, 64, 3, '#052e16'),
    r(6, 28, 3, 2, '#052e16'),
    r(24, 31, 4, 2, '#052e16'),
    r(44, 29, 3, 2, '#052e16'),
    r(56, 32, 4, 2, '#052e16'),
    r(11, 16, 2, 11, '#14532d'),
    r(7, 10, 10, 7, '#166534'),
    r(6, 12, 12, 3, '#15803d', 0.9),
    r(54, 18, 2, 9, '#14532d'),
    r(50, 13, 10, 6, '#166534')
  ],
  // Bosque: troncos en capas y luz que se cuela
  bosque: [
    r(0, 0, 64, 36, 'url(#deepGreen)'),
    r(0, 0, 64, 12, '#166534', 0.7),
    <g key="rayos" className="animate-shimmer">
      {r(12, 0, 4, 30, '#bbf7d0', 0.16)}
      {r(33, 0, 5, 32, '#bbf7d0', 0.12)}
      {r(52, 0, 3, 28, '#bbf7d0', 0.16)}
    </g>,
    ...skyline([[4, 3, 20], [12, 2, 16], [22, 3, 22], [34, 2, 18], [44, 3, 21], [56, 2, 17]], 30, '#14532d', 0.8),
    haze(14, 8, '#4ade80', 0.12),
    r(2, 8, 6, 24, '#052e16'),
    r(20, 6, 7, 26, '#052e16'),
    r(42, 7, 6, 25, '#052e16'),
    r(58, 9, 6, 23, '#052e16'),
    r(0, 0, 64, 6, '#022c22', 0.9),
    r(0, 5, 10, 3, '#022c22'),
    r(18, 4, 12, 3, '#022c22'),
    r(44, 5, 14, 3, '#022c22'),
    ...dither(29, '#022c22'),
    r(0, 31, 64, 5, '#022c22'),
    <g key="luces" className="animate-twinkle">
      {r(30, 18, 1, 1, '#fde047')}
      {r(48, 22, 1, 1, '#fde047')}
      {r(16, 25, 1, 1, '#fde047')}
    </g>
  ],
  // Cueva: paredes en capas, antorchas y cristales
  cueva: [
    r(0, 0, 64, 36, 'url(#caveWall)'),
    r(0, 0, 64, 7, '#111827'),
    r(5, 7, 3, 6, '#111827'),
    r(14, 7, 2, 4, '#111827'),
    r(26, 7, 4, 8, '#111827'),
    r(38, 7, 2, 5, '#111827'),
    r(50, 7, 3, 7, '#111827'),
    haze(10, 8, '#93c5fd', 0.07),
    r(8, 16, 12, 10, '#374151', 0.8),
    r(30, 14, 14, 12, '#374151', 0.8),
    r(50, 17, 12, 9, '#374151', 0.8),
    <g key="antorchas" className="animate-shimmer">
      {r(4, 14, 2, 2, '#fbbf24')}
      {r(0, 10, 10, 12, '#f59e0b', 0.16)}
      {r(58, 14, 2, 2, '#fbbf24')}
      {r(54, 10, 10, 12, '#f59e0b', 0.16)}
    </g>,
    r(4, 16, 2, 7, '#1f2937'),
    r(58, 16, 2, 7, '#1f2937'),
    ...dither(25, '#030712'),
    r(0, 27, 64, 9, '#030712'),
    r(10, 24, 10, 4, '#111827'),
    r(40, 25, 12, 3, '#111827'),
    <g key="cristales" className="animate-twinkle">
      {r(24, 20, 2, 8, '#a78bfa')}
      {r(24, 20, 1, 8, '#ddd6fe')}
      {r(46, 22, 2, 6, '#a78bfa')}
    </g>
  ],
  // Mar al atardecer: sol enorme, reflejo en el agua y muelle oscuro
  mar: [
    r(0, 0, 64, 20, 'url(#skyDawn)'),
    ...glow(28, 4, 10, '#fff7ed', '#fb923c'),
    <g key="n3" className="animate-driftSlow">{cloud(6, 6, 14, '#fdba74')}{cloud(40, 10, 10, '#fed7aa')}</g>,
    ...skyline([[0, 8, 5], [10, 6, 7, 'punta'], [50, 7, 6], [58, 6, 8, 'antena']], 20, '#7c2d12', 0.6),
    haze(17, 4, '#fed7aa', 0.3),
    ...dither(19, '#0ea5e9'),
    r(0, 21, 64, 15, 'url(#sea)'),
    <g key="reflejo" className="animate-shimmer">
      {r(30, 21, 6, 1, '#fed7aa', 0.85)}
      {r(31, 24, 4, 1, '#fdba74', 0.6)}
      {r(29, 27, 6, 1, '#fb923c', 0.45)}
      {r(30, 31, 5, 1, '#f97316', 0.3)}
    </g>,
    <g key="olas" className="animate-wave">
      {r(8, 25, 9, 1, '#e0f2fe', 0.5)}
      {r(44, 29, 10, 1, '#e0f2fe', 0.5)}
    </g>,
    r(0, 32, 64, 4, '#082f49'),
    r(12, 28, 30, 2, '#0c0a09'),
    r(16, 30, 2, 6, '#0c0a09'),
    r(36, 30, 2, 6, '#0c0a09'),
    r(4, 30, 6, 6, '#0c0a09')
  ],
  // Volcán: cielo de fuego, cono humeante y rocas negras delante
  volcan: [
    r(0, 0, 64, 36, 'url(#skyFire)'),
    <g key="humo" className="animate-smoke">
      {r(26, 2, 8, 2, '#57534e', 0.6)}
      {r(30, 0, 6, 2, '#57534e', 0.4)}
    </g>,
    ...skyline([[2, 8, 7], [12, 6, 10], [50, 7, 9], [58, 6, 7]], 22, '#7f1d1d', 0.5),
    haze(16, 6, '#fca5a5', 0.15),
    r(26, 8, 12, 3, '#451a03'),
    r(22, 11, 20, 3, '#3f2412'),
    r(16, 14, 32, 4, '#292524'),
    r(8, 18, 48, 5, '#1c1917'),
    r(0, 23, 64, 5, '#0c0a09'),
    <g key="lava" className="animate-shimmer">
      {r(27, 8, 10, 2, '#f97316')}
      {r(29, 7, 6, 1, '#fde047')}
      {r(30, 10, 3, 13, '#ea580c')}
      {r(31, 10, 1, 13, '#fb923c')}
      {r(28, 23, 8, 3, '#ea580c', 0.9)}
    </g>,
    ...dither(27, '#0c0a09'),
    r(0, 29, 64, 7, '#0c0a09'),
    r(6, 26, 10, 4, '#1c1917'),
    r(46, 27, 12, 3, '#1c1917'),
    <g key="brasas" className="animate-twinkle">
      {r(10, 31, 1, 1, '#f97316')}
      {r(52, 33, 1, 1, '#fbbf24')}
      {r(24, 34, 1, 1, '#f97316')}
    </g>
  ],
  // Torre psíquica: noche, luna enorme y torre recortada
  torre: [
    r(0, 0, 64, 36, 'url(#skyNight)'),
    <g key="estrellas" className="animate-twinkle">
      {[[4, 3], [12, 7], [20, 2], [30, 5], [44, 3], [52, 8], [60, 5], [8, 12], [56, 14], [36, 10]].map(([x, y]) => r(x, y, 1, 1, '#f8fafc'))}
    </g>,
    ...glow(44, 3, 9, '#fef9c3', '#e9d5ff'),
    ...skyline([[2, 5, 8, 'punta'], [10, 4, 6], [54, 5, 9, 'punta'], [60, 4, 7]], 26, '#4c1d95', 0.6),
    haze(20, 6, '#a78bfa', 0.12),
    r(24, 6, 16, 3, '#2e1065'),
    r(26, 9, 12, 21, '#1e1b4b'),
    r(26, 9, 3, 21, '#312e81'),
    <g key="ventanas" className="animate-shimmer">
      {r(29, 12, 3, 3, '#fde047')}
      {r(33, 12, 3, 3, '#fde047')}
      {r(29, 19, 3, 3, '#fde047')}
      {r(33, 19, 3, 3, '#fde047')}
    </g>,
    r(30, 25, 4, 5, '#020617'),
    ...dither(28, '#020617'),
    r(0, 30, 64, 6, '#020617'),
    r(6, 26, 10, 4, '#0f172a'),
    r(46, 27, 12, 3, '#0f172a'),
    <g key="psi" className="animate-twinkle">
      {r(18, 16, 2, 2, '#e879f9', 0.7)}
      {r(48, 20, 2, 2, '#e879f9', 0.7)}
    </g>
  ],
  // Liga: estadio recortado contra el atardecer y focos encendidos
  liga: [
    r(0, 0, 64, 36, 'url(#skyDawn)'),
    ...glow(32, 3, 8, '#fff7ed', '#fdba74'),
    <g key="n4" className="animate-drift">{cloud(6, 7, 12, '#fed7aa')}{cloud(44, 5, 10, '#fdba74')}</g>,
    ...skyline([[0, 6, 8, 'antena'], [8, 5, 11, 'punta'], [52, 6, 10, 'punta'], [60, 4, 8, 'antena']], 24, '#c2410c', 0.5),
    haze(18, 6, '#fed7aa', 0.25),
    r(10, 14, 44, 3, '#7c2d12'),
    r(8, 17, 48, 13, '#431407'),
    r(14, 20, 4, 10, '#7c2d12', 0.8),
    r(24, 20, 4, 10, '#7c2d12', 0.8),
    r(36, 20, 4, 10, '#7c2d12', 0.8),
    r(46, 20, 4, 10, '#7c2d12', 0.8),
    r(28, 19, 8, 11, '#1c0a03'),
    ...windows([[16, 22], [26, 24], [38, 22], [48, 25]], '#fde047', 0.7),
    <g key="focos" className="animate-shimmer">
      {r(6, 10, 2, 2, '#fef9c3')}
      {r(56, 10, 2, 2, '#fef9c3')}
      {r(6, 12, 2, 10, '#fef9c3', 0.18)}
      {r(56, 12, 2, 10, '#fef9c3', 0.18)}
    </g>,
    ...dither(29, '#1c0a03'),
    r(0, 31, 64, 5, '#1c0a03'),
    r(28, 30, 8, 6, '#991b1b'),
    r(30, 30, 4, 6, '#dc2626')
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
