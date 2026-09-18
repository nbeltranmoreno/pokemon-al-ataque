// Escenarios de la Historia dibujados en píxeles (64x36)
// Estilo medio anime: cielos con varios tonos, brillos, reflejos y rayos de luz, pero todo a cuadraditos

let key = 0;
const r = (x, y, w, h, fill, opacity) => (
  <rect key={`r${key++}`} x={x} y={y} width={w} height={h} fill={fill} opacity={opacity} />
);

// Bandas de cielo, de arriba abajo
const sky = (colors, heights) => colors.map((color, i) => {
  const y = heights.slice(0, i).reduce((a, b) => a + b, 0);
  return r(0, y, 64, heights[i], color);
});

// Sol o luna con resplandor y rayos
const glow = (x, y, size, color, halo) => [
  r(x - 2, y - 2, size + 4, size + 4, halo, 0.35),
  r(x - 1, y - 1, size + 2, size + 2, halo, 0.55),
  r(x, y, size, size, color),
  r(x - 4, y + size / 2 - 1, 3, 2, halo, 0.5),
  r(x + size + 1, y + size / 2 - 1, 3, 2, halo, 0.5),
  r(x + size / 2 - 1, y - 4, 2, 3, halo, 0.5),
  r(x + size / 2 - 1, y + size + 1, 2, 3, halo, 0.5)
];

// Nube con brillo arriba y sombra abajo
const cloud = (x, y, w) => [
  r(x, y, w, 2, '#f8fafc'),
  r(x + 1, y - 1, w - 2, 1, '#ffffff'),
  r(x + 1, y + 2, w - 2, 1, '#cbd5e1')
];

const tree = (x, y, trunk = '#78350f', leaf = '#166534', light = '#22c55e') => [
  r(x, y, 2, 6, trunk),
  r(x - 4, y - 6, 10, 6, leaf),
  r(x - 3, y - 7, 8, 2, light),
  r(x - 2, y - 5, 3, 2, light, 0.6)
];

const SCENES = {
  pueblo: [
    ...sky(['#bae6fd', '#7dd3fc', '#e0f2fe'], [8, 8, 6]),
    ...glow(48, 3, 6, '#fef9c3', '#fde047'),
    ...cloud(8, 5, 9),
    ...cloud(28, 3, 6),
    // Montañas del fondo
    r(0, 16, 20, 6, '#93c5fd'), r(14, 14, 18, 8, '#bfdbfe'), r(30, 16, 22, 6, '#93c5fd'), r(48, 15, 16, 7, '#bfdbfe'),
    // Prado
    r(0, 22, 64, 14, '#22c55e'), r(0, 22, 64, 2, '#4ade80'), r(0, 32, 64, 4, '#15803d'),
    // Camino
    r(27, 22, 10, 14, '#d9a066'), r(30, 22, 4, 14, '#eab676'),
    // Casa grande
    r(6, 12, 16, 3, '#dc2626'), r(5, 15, 18, 1, '#b91c1c'),
    r(7, 16, 14, 8, '#fef3c7'), r(7, 16, 14, 1, '#fffbeb'),
    r(12, 19, 4, 5, '#92400e'), r(17, 18, 3, 3, '#38bdf8'), r(17, 18, 3, 1, '#7dd3fc'),
    // Casa pequeña
    r(42, 14, 14, 3, '#b91c1c'), r(43, 17, 12, 7, '#fef3c7'), r(47, 20, 3, 4, '#92400e'),
    r(51, 18, 3, 3, '#fde047'),
    // Humo de la chimenea
    r(52, 11, 2, 2, '#e2e8f0', 0.8), r(53, 9, 2, 2, '#e2e8f0', 0.6), r(54, 7, 2, 2, '#e2e8f0', 0.4),
    ...tree(36, 18)
  ],
  ruta: [
    ...sky(['#bae6fd', '#7dd3fc'], [10, 10]),
    ...glow(52, 2, 5, '#fef9c3', '#fde047'),
    ...cloud(10, 4, 10),
    ...cloud(30, 7, 7),
    r(0, 20, 64, 16, '#22c55e'), r(0, 20, 64, 2, '#4ade80'), r(0, 33, 64, 3, '#15803d'),
    // Camino que cruza
    r(0, 24, 64, 6, '#d9a066'), r(0, 26, 64, 2, '#eab676'),
    // Hierba alta
    r(4, 21, 6, 2, '#16a34a'), r(20, 31, 8, 2, '#16a34a'), r(44, 21, 7, 2, '#16a34a'), r(54, 31, 7, 2, '#16a34a'),
    // Valla
    r(16, 19, 1, 5, '#a16207'), r(22, 19, 1, 5, '#a16207'), r(28, 19, 1, 5, '#a16207'),
    r(16, 20, 13, 1, '#ca8a04'),
    // Flores
    r(8, 32, 1, 1, '#f472b6'), r(35, 22, 1, 1, '#fde047'), r(50, 33, 1, 1, '#f472b6'),
    ...tree(10, 14),
    ...tree(58, 14)
  ],
  bosque: [
    r(0, 0, 64, 36, '#14532d'),
    r(0, 0, 64, 10, '#166534'),
    r(0, 9, 64, 2, '#15803d'),
    // Rayos de luz entre las ramas
    r(14, 10, 3, 18, '#bbf7d0', 0.18), r(34, 10, 4, 20, '#bbf7d0', 0.14), r(52, 10, 3, 16, '#bbf7d0', 0.18),
    // Troncos
    r(6, 10, 4, 20, '#78350f'), r(7, 10, 1, 20, '#92400e'),
    r(24, 8, 5, 22, '#78350f'), r(25, 8, 1, 22, '#92400e'),
    r(44, 10, 4, 20, '#78350f'), r(45, 10, 1, 20, '#92400e'),
    r(58, 12, 4, 18, '#78350f'),
    // Copas
    r(2, 4, 12, 7, '#15803d'), r(20, 2, 14, 8, '#15803d'), r(40, 4, 13, 7, '#15803d'), r(54, 6, 10, 6, '#15803d'),
    r(3, 4, 10, 2, '#22c55e'), r(21, 2, 12, 2, '#22c55e'), r(41, 4, 11, 2, '#22c55e'),
    // Suelo
    r(0, 28, 64, 8, '#365314'), r(0, 28, 64, 2, '#4d7c0f'), r(0, 34, 64, 2, '#1a2e05'),
    // Setas y bichos
    r(14, 31, 2, 2, '#ef4444'), r(14, 30, 2, 1, '#fca5a5'),
    r(40, 32, 2, 2, '#ef4444'),
    r(30, 18, 1, 1, '#fde047', 0.9), r(50, 22, 1, 1, '#fde047', 0.9)
  ],
  cueva: [
    r(0, 0, 64, 36, '#1f2937'),
    r(0, 0, 64, 8, '#374151'),
    // Estalactitas
    r(6, 8, 2, 5, '#374151'), r(15, 8, 2, 3, '#374151'), r(27, 8, 3, 6, '#374151'),
    r(40, 8, 2, 4, '#374151'), r(52, 8, 2, 6, '#374151'),
    // Antorchas con su luz
    r(4, 14, 2, 6, '#92400e'), r(4, 12, 2, 2, '#fbbf24'), r(2, 10, 6, 8, '#fbbf24', 0.18),
    r(56, 14, 2, 6, '#92400e'), r(56, 12, 2, 2, '#fbbf24'), r(54, 10, 6, 8, '#fbbf24', 0.18),
    // Suelo
    r(0, 28, 64, 8, '#4b5563'), r(0, 28, 64, 2, '#6b7280'), r(0, 34, 64, 2, '#374151'),
    // Rocas
    r(10, 24, 7, 4, '#6b7280'), r(11, 24, 5, 1, '#9ca3af'),
    r(40, 25, 9, 3, '#6b7280'), r(41, 25, 7, 1, '#9ca3af'),
    // Cristales
    r(50, 21, 2, 7, '#a78bfa'), r(50, 21, 1, 7, '#c4b5fd'),
    r(54, 24, 2, 4, '#a78bfa'), r(22, 25, 2, 3, '#a78bfa')
  ],
  mar: [
    ...sky(['#fef3c7', '#fed7aa', '#bae6fd'], [6, 5, 5]),
    ...glow(46, 3, 7, '#fef9c3', '#fdba74'),
    ...cloud(10, 4, 11),
    ...cloud(28, 8, 7),
    // Mar con brillos
    r(0, 16, 64, 20, '#0284c7'), r(0, 16, 64, 2, '#38bdf8'),
    r(0, 21, 64, 1, '#7dd3fc', 0.7), r(0, 26, 64, 1, '#7dd3fc', 0.5),
    r(44, 17, 6, 1, '#fef9c3', 0.8), r(46, 19, 5, 1, '#fef9c3', 0.6), r(45, 22, 6, 1, '#fef9c3', 0.4),
    // Olas
    r(6, 24, 8, 1, '#e0f2fe'), r(24, 28, 10, 1, '#e0f2fe'), r(48, 26, 9, 1, '#e0f2fe'),
    // Playa
    r(0, 31, 64, 5, '#fde68a'), r(0, 31, 64, 1, '#fef3c7'),
    // Muelle
    r(18, 27, 28, 2, '#92400e'), r(18, 27, 28, 1, '#a16207'),
    r(22, 29, 2, 3, '#78350f'), r(40, 29, 2, 3, '#78350f')
  ],
  volcan: [
    ...sky(['#7f1d1d', '#991b1b', '#b91c1c'], [6, 5, 5]),
    r(0, 0, 64, 4, '#450a0a'),
    // Humo
    r(26, 2, 6, 2, '#78716c', 0.7), r(30, 0, 5, 2, '#78716c', 0.5), r(22, 0, 4, 2, '#78716c', 0.4),
    // Cono del volcán
    r(28, 8, 8, 3, '#451a03'), r(24, 11, 16, 3, '#44403c'), r(20, 14, 24, 3, '#44403c'),
    r(14, 17, 36, 4, '#292524'), r(8, 21, 48, 4, '#292524'), r(0, 25, 64, 4, '#1c1917'),
    // Cráter y lava
    r(28, 8, 8, 2, '#f97316'), r(29, 7, 6, 1, '#fbbf24'),
    r(30, 10, 3, 11, '#ea580c'), r(31, 10, 1, 11, '#fb923c'),
    r(28, 21, 7, 4, '#ea580c'), r(29, 21, 5, 2, '#f97316'),
    // Suelo y brasas
    r(0, 29, 64, 7, '#292524'), r(0, 29, 64, 1, '#57534e'),
    r(8, 31, 2, 1, '#f97316', 0.8), r(48, 32, 2, 1, '#f97316', 0.8), r(56, 30, 1, 1, '#fbbf24', 0.8),
    r(4, 27, 4, 2, '#57534e'), r(54, 26, 5, 3, '#57534e')
  ],
  torre: [
    ...sky(['#1e1b4b', '#312e81', '#4c1d95'], [12, 12, 6]),
    // Estrellas
    ...[[4, 3], [12, 7], [20, 2], [30, 5], [44, 3], [52, 8], [60, 5], [8, 12], [56, 14]].map(([x, y]) => r(x, y, 1, 1, '#f8fafc')),
    ...glow(48, 4, 6, '#fef9c3', '#fde68a'),
    // Torre
    r(26, 4, 12, 2, '#4c1d95'), r(24, 6, 16, 3, '#5b21b6'),
    r(26, 9, 12, 22, '#6d28d9'), r(26, 9, 3, 22, '#7c3aed'), r(35, 9, 3, 22, '#4c1d95'),
    // Ventanas encendidas
    r(29, 13, 3, 3, '#fde047'), r(33, 13, 3, 3, '#fde047'),
    r(29, 20, 3, 3, '#fde047'), r(33, 20, 3, 3, '#fde047'),
    r(30, 26, 4, 5, '#312e81'),
    // Brillo psíquico
    r(20, 14, 2, 2, '#e879f9', 0.6), r(44, 18, 2, 2, '#e879f9', 0.6), r(16, 24, 2, 2, '#e879f9', 0.4),
    // Suelo
    r(0, 31, 64, 5, '#1e1b4b'), r(0, 31, 64, 1, '#312e81')
  ],
  liga: [
    ...sky(['#fdba74', '#fb923c', '#f59e0b'], [7, 6, 5]),
    ...glow(32, 2, 6, '#fef9c3', '#fed7aa'),
    ...cloud(8, 6, 9),
    ...cloud(48, 9, 8),
    // Escalinata
    r(0, 30, 64, 6, '#a16207'), r(0, 30, 64, 1, '#ca8a04'),
    // Edificio
    r(6, 12, 52, 3, '#b45309'), r(4, 15, 56, 2, '#92400e'),
    r(8, 17, 48, 13, '#fbbf24'), r(8, 17, 48, 1, '#fcd34d'),
    // Columnas
    r(12, 19, 4, 11, '#fef3c7'), r(22, 19, 4, 11, '#fef3c7'),
    r(38, 19, 4, 11, '#fef3c7'), r(48, 19, 4, 11, '#fef3c7'),
    // Puerta y alfombra
    r(28, 18, 8, 12, '#78350f'), r(29, 19, 6, 11, '#92400e'),
    r(28, 30, 8, 6, '#dc2626'), r(30, 30, 4, 6, '#ef4444'),
    // Focos
    r(10, 10, 2, 2, '#fef9c3'), r(52, 10, 2, 2, '#fef9c3'),
    r(10, 12, 2, 6, '#fef9c3', 0.25), r(52, 12, 2, 6, '#fef9c3', 0.25)
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
      {scene}
    </svg>
  );
}
