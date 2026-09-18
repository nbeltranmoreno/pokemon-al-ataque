// Entrenador dibujado píxel a píxel (16x20), estilo anime en 8 bits:
// contorno negro, sombras, ojos grandes con brillo y vista de frente o de espaldas
// o = contorno, O = ojo, w = brillo/blanco, s = piel, S = piel en sombra
// c = gorra, C = gorra en sombra, h = pelo, H = pelo en sombra
// j = ropa, J = ropa en sombra, k = mochila o cinturón, p = pantalón o falda, P = sombra, b = botas

import { getOutfit } from '../data/outfits';

// Centra cada fila para que todas midan 16 píxeles
const row = (pixels) => {
  const left = Math.floor((16 - pixels.length) / 2);
  return '.'.repeat(left) + pixels + '.'.repeat(16 - pixels.length - left);
};

// Cuerpo común (de la cabeza para abajo)
const body = (backpack) => [
  row('oooooooo'),
  row('ojjjjjjjjJJo'),
  row('osjjjjwwjjJJso'),
  row('osjjjjwwjjJJso'),
  row('ojjjjjjjjJJo'),
  row('okkkkkkkkkko'),
  row('oppppppppPPo'),
  '...oppo..oPPo...',
  '...oppo..oPPo...',
  '...obbo..obbo...',
  '...oooo..oooo...'
].map((line, index) => (backpack && (index === 2 || index === 3) ? row('osjjkkkkkkJJso') : line));

const BOY_FRONT = [
  row('oooooo'),
  row('occcccCo'),
  row('occccccCCo'),
  row('occcccccCCCo'),
  row('owwwwwwwwwwo'),
  row('osssssssSo'),
  row('oOwssOwsSo'),
  row('osssoossSo'),
  row('osssssssSo'),
  ...body(false)
];

const BOY_BACK = [
  row('oooooo'),
  row('occcccCo'),
  row('occccccCCo'),
  row('occcccccCCCo'),
  row('occcccccCCCo'),
  row('ohhhhhhhHo'),
  row('ohhhhhhhHo'),
  row('ohhhhhhhHo'),
  row('osssssssSo'),
  ...body(true)
];

const GIRL_FRONT = [
  row('oooooo'),
  row('ohhhhhHo'),
  row('ohhhhhhHHo'),
  row('ohhhhhhhhHHo'),
  row('ohhsssssSHho'),
  row('ohhOwssOwHho'),
  row('ohhssoosSHho'),
  row('ohhsssssSHho'),
  row('ohssssssHo'),
  ...body(false)
];

const GIRL_BACK = [
  row('oooooo'),
  row('ohhhhhHo'),
  row('ohhhhhhHHo'),
  row('ohhhhhhhhHHo'),
  row('ohhhhhhhhHHo'),
  row('ohhhhhhhhHHo'),
  row('ohhhhhhhhHHo'),
  row('ohhhhhhhhHHo'),
  row('ohhhhhhhHHo'),
  ...body(true)
];

// Al señalar, el brazo se estira hacia el Pokémon
const POINTING_ARM = '.osjjjjwwjjJJsss';
const point = (rows) => rows.map((line, index) => (index === 11 ? POINTING_ARM : line));

const COLORS = {
  boy: {
    o: '#0f172a',
    O: '#1e293b',
    w: '#f8fafc',
    s: '#f5c396',
    S: '#d99a63',
    c: '#dc2626',
    C: '#991b1b',
    h: '#7c3f1d',
    H: '#5b2d13',
    j: '#2563eb',
    J: '#1d4ed8',
    k: '#374151',
    p: '#374151',
    P: '#1f2937',
    b: '#1f2937'
  },
  girl: {
    o: '#0f172a',
    O: '#1e293b',
    w: '#f8fafc',
    s: '#f5c396',
    S: '#d99a63',
    c: '#dc2626',
    C: '#991b1b',
    h: '#a0522d',
    H: '#7c3f1d',
    j: '#db2777',
    J: '#9d174d',
    k: '#374151',
    p: '#f472b6',
    P: '#db2777',
    b: '#1f2937'
  }
};

const SPRITES = {
  boy: { front: BOY_FRONT, back: BOY_BACK },
  girl: { front: GIRL_FRONT, back: GIRL_BACK }
};

export default function PixelTrainer({
  gender = 'boy',
  outfit = 'clasico',
  view = 'front',
  pointing = false,
  className = 'w-10 h-12'
}) {
  const set = SPRITES[gender === 'girl' ? 'girl' : 'boy'];
  const base = view === 'back' ? set.back : set.front;
  const rows = pointing ? point(base) : base;
  // La ropa elegida pinta encima de los colores base
  const palette = { ...COLORS[gender === 'girl' ? 'girl' : 'boy'], ...getOutfit(outfit).colors };

  return (
    <svg viewBox="0 0 16 20" className={className} shapeRendering="crispEdges" aria-hidden="true">
      {rows.map((line, y) =>
        [...line].map((pixel, x) =>
          palette[pixel] ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={palette[pixel]} />
          ) : null
        )
      )}
    </svg>
  );
}
