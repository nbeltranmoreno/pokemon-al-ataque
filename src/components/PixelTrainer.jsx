// Entrenador dibujado píxel a píxel (24x34), al estilo de los sprites de entrenador:
// gorra con visera, chaqueta abierta, vaqueros, zapatillas y una Poké Ball en la mano.
// Se dibuja por tramos [fila, x, ancho, color] sobre una silueta negra, así siempre queda contorneado.

import { getOutfit } from '../data/outfits';

const COLORS = {
  o: '#0f172a', // contorno
  s: '#f5c396', // piel
  S: '#d99a63', // piel en sombra
  w: '#f8fafc', // blanco (camiseta, visera, suelas)
  W: '#cbd5e1', // blanco en sombra
  O: '#1e293b', // ojos
  c: '#dc2626', // gorra
  C: '#991b1b', // gorra en sombra
  h: '#7c3f1d', // pelo
  H: '#5b2d13', // pelo en sombra
  j: '#2563eb', // chaqueta
  J: '#1d4ed8', // chaqueta en sombra
  k: '#111827', // cinturón y correas
  p: '#3b82f6', // pantalón
  P: '#1e40af', // pantalón en sombra
  b: '#dc2626', // zapatillas
  r: '#ef4444' // Poké Ball
};

// Silueta: se pinta primero en negro y los colores van encima, dejando el borde
const SILHOUETTE = [
  [0, 7, 10], [1, 5, 14], [2, 4, 16], [3, 4, 16], [4, 4, 16], [5, 6, 12],
  [6, 6, 12], [7, 6, 12], [8, 6, 12], [9, 6, 12], [10, 7, 10],
  [11, 9, 6],
  [12, 5, 14], [13, 3, 18], [14, 3, 18], [15, 3, 18], [16, 3, 18], [17, 3, 18],
  [18, 3, 18], [19, 3, 18], [20, 4, 16], [21, 5, 14], [22, 5, 14],
  [23, 6, 12], [24, 6, 12], [25, 6, 12], [26, 6, 12], [27, 6, 12], [28, 6, 12],
  [29, 6, 12], [30, 5, 14], [31, 5, 14], [32, 5, 14], [33, 5, 14]
].map(([y, x, w]) => [y, x, w, 'o']);

// Cuerpo común: chaqueta abierta, camiseta, cinturón, vaqueros y zapatillas
const BODY = [
  // Hombros y chaqueta
  [12, 7, 10, 'j'], [12, 10, 4, 'w'],
  [13, 5, 14, 'j'], [13, 10, 4, 'w'], [13, 16, 2, 'J'],
  [14, 4, 16, 'j'], [14, 10, 4, 'w'], [14, 17, 2, 'J'],
  [15, 4, 16, 'j'], [15, 10, 4, 'w'], [15, 17, 2, 'J'],
  [16, 4, 16, 'j'], [16, 10, 4, 'w'], [16, 17, 2, 'J'],
  [17, 4, 16, 'j'], [17, 10, 4, 'w'], [17, 17, 2, 'J'],
  [18, 4, 16, 'j'], [18, 10, 4, 'w'], [18, 17, 2, 'J'],
  [19, 5, 14, 'j'], [19, 10, 4, 'w'], [19, 16, 2, 'J'],
  [20, 6, 12, 'j'], [20, 10, 4, 'w'],
  // Manos
  [19, 4, 2, 's'], [20, 4, 2, 'S'],
  [19, 18, 2, 's'], [20, 18, 2, 'S'],
  // Cinturón
  [21, 6, 12, 'k'], [22, 6, 12, 'p'],
  // Vaqueros
  [23, 7, 4, 'p'], [23, 13, 4, 'p'],
  [24, 7, 4, 'p'], [24, 13, 4, 'P'],
  [25, 7, 4, 'p'], [25, 13, 4, 'P'],
  [26, 7, 4, 'p'], [26, 13, 4, 'P'],
  [27, 7, 4, 'p'], [27, 13, 4, 'P'],
  [28, 7, 4, 'p'], [28, 13, 4, 'P'],
  [29, 7, 4, 'P'], [29, 13, 4, 'P'],
  // Zapatillas
  [30, 6, 5, 'b'], [30, 13, 5, 'b'],
  [31, 6, 5, 'b'], [31, 13, 5, 'b'],
  [32, 6, 5, 'w'], [32, 13, 5, 'w']
];

// Poké Ball en la mano derecha
const BALL = [
  [18, 18, 3, 'r'],
  [19, 18, 3, 'o'],
  [20, 18, 3, 'w']
];

// Mochila, para las vistas de espaldas
const BACKPACK = [
  [13, 8, 8, 'k'], [14, 8, 8, 'k'], [15, 8, 8, 'k'],
  [16, 9, 6, 'k'], [17, 9, 6, 'k'],
  [14, 10, 4, 'w'], [15, 10, 4, 'w']
];

const BOY_CAP = [
  [0, 8, 8, 'c'],
  [1, 6, 12, 'c'], [1, 14, 3, 'C'],
  [2, 5, 14, 'c'], [2, 5, 5, 'w'], [2, 15, 3, 'C'],
  [3, 5, 14, 'c'], [3, 5, 5, 'w'], [3, 15, 3, 'C'],
  [4, 5, 14, 'C']
];

const BOY_FRONT = [
  ...BOY_CAP,
  // Pelo asomando y cara
  [5, 7, 2, 'h'], [5, 15, 2, 'h'],
  [5, 9, 6, 's'],
  [6, 7, 10, 's'], [6, 15, 2, 'S'],
  [7, 7, 10, 's'], [7, 8, 2, 'O'], [7, 13, 2, 'O'], [7, 8, 1, 'w'], [7, 13, 1, 'w'], [7, 15, 2, 'S'],
  [8, 7, 10, 's'], [8, 15, 2, 'S'],
  [9, 8, 8, 's'], [9, 11, 2, 'O'], [9, 14, 2, 'S'],
  [10, 9, 6, 'S'],
  [11, 10, 4, 's'],
  ...BODY,
  ...BALL
];

const BOY_BACK = [
  ...BOY_CAP,
  [5, 6, 12, 'h'],
  [6, 6, 12, 'h'], [6, 14, 3, 'H'],
  [7, 7, 10, 'h'], [7, 14, 3, 'H'],
  [8, 7, 10, 'h'], [8, 14, 3, 'H'],
  [9, 8, 8, 'H'],
  [10, 9, 6, 's'],
  [11, 10, 4, 'S'],
  ...BODY,
  ...BACKPACK
];

const GIRL_HAIR = [
  [0, 8, 8, 'h'],
  [1, 6, 12, 'h'], [1, 14, 3, 'H'],
  [2, 5, 14, 'h'], [2, 15, 3, 'H'],
  [3, 5, 14, 'h'], [3, 15, 3, 'H'],
  [4, 5, 14, 'h'], [4, 15, 3, 'H']
];

const GIRL_FRONT = [
  ...GIRL_HAIR,
  // Melena a los lados y cara
  [5, 6, 2, 'h'], [5, 16, 2, 'H'],
  [5, 8, 8, 's'],
  [6, 6, 2, 'h'], [6, 16, 2, 'H'], [6, 8, 8, 's'],
  [7, 6, 2, 'h'], [7, 16, 2, 'H'], [7, 8, 8, 's'],
  [7, 8, 2, 'O'], [7, 13, 2, 'O'], [7, 8, 1, 'w'], [7, 13, 1, 'w'],
  [8, 6, 2, 'h'], [8, 16, 2, 'H'], [8, 8, 8, 's'],
  [9, 7, 2, 'h'], [9, 15, 2, 'H'], [9, 9, 6, 's'], [9, 11, 2, 'O'],
  [10, 9, 6, 'S'],
  [11, 10, 4, 's'],
  ...BODY,
  // Falda encima de los vaqueros
  [22, 5, 14, 'p'], [23, 5, 14, 'p'], [24, 6, 12, 'P'],
  ...BALL
];

const GIRL_BACK = [
  ...GIRL_HAIR,
  [5, 5, 14, 'h'],
  [6, 5, 14, 'h'], [6, 15, 3, 'H'],
  [7, 5, 14, 'h'], [7, 15, 3, 'H'],
  [8, 5, 14, 'h'], [8, 15, 3, 'H'],
  [9, 6, 12, 'h'], [9, 15, 3, 'H'],
  [10, 7, 10, 'H'],
  [11, 10, 4, 'S'],
  ...BODY,
  [22, 5, 14, 'p'], [23, 5, 14, 'p'], [24, 6, 12, 'P'],
  ...BACKPACK
];

// Al señalar, el brazo derecho se estira hacia el Pokémon
const POINT = [
  [15, 18, 5, 'j'], [16, 18, 5, 'j'], [15, 21, 2, 's'], [16, 21, 2, 'S'],
  [18, 18, 3, 'j'], [19, 18, 3, 'j'], [20, 18, 3, 'j']
];

const SPRITES = {
  boy: { front: BOY_FRONT, back: BOY_BACK },
  girl: { front: GIRL_FRONT, back: GIRL_BACK }
};

export default function PixelTrainer({
  gender = 'boy',
  outfit = 'clasico',
  view = 'front',
  pointing = false,
  className = 'w-10 h-14'
}) {
  const set = SPRITES[gender === 'girl' ? 'girl' : 'boy'];
  const runs = [...SILHOUETTE, ...(view === 'back' ? set.back : set.front), ...(pointing ? POINT : [])];
  // La ropa elegida pinta encima de los colores base
  const palette = { ...COLORS, ...getOutfit(outfit).colors };

  return (
    <svg viewBox="0 0 24 34" className={className} shapeRendering="crispEdges" aria-hidden="true">
      {runs.map(([y, x, w, color], index) => (
        <rect key={index} x={x} y={y} width={w} height="1" fill={palette[color] || COLORS[color]} />
      ))}
    </svg>
  );
}
