// Entrenador dibujado píxel a píxel (16x20), estilo Game Boy: contorno negro y sombras
// o = contorno, s = piel, S = piel en sombra, c = gorra, C = gorra en sombra, w = blanco
// h = pelo, H = pelo en sombra, j = ropa, J = ropa en sombra, k = cinturón, p = pantalón o falda
// P = pantalón en sombra, b = botas

const BOY = [
  '.....oooooo.....',
  '....occcccCo....',
  '...occccccCCo...',
  '..occcccccCCCo..',
  '..owwwwwwwwwwo..',
  '...osssssssSo...',
  '...osossssoSo...',
  '...osssoossSo...',
  '...osssssssSo...',
  '....oooooooo....',
  '..ojjjjjjjjJJo..',
  '.osjjjjwwjjJJso.',
  '.osjjjjwwjjJJso.',
  '..ojjjjjjjjJJo..',
  '..okkkkkkkkkko..',
  '..oppppppppPPo..',
  '...oppo..oPPo...',
  '...oppo..oPPo...',
  '...obbo..obbo...',
  '...oooo..oooo...'
];

const GIRL = [
  '.....oooooo.....',
  '....ohhhhhHo....',
  '...ohhhhhhHHo...',
  '..ohhhhhhhhHHo..',
  '..ohhsssssSHho..',
  '..ohhsossoSHho..',
  '..ohhssoosSHho..',
  '..ohhsssssSHho..',
  '...ohssssssHo...',
  '....oooooooo....',
  '..ojjjjjjjjJJo..',
  '.osjjjjwwjjJJso.',
  '.osjjjjwwjjJJso.',
  '..ojjjjjjjjJJo..',
  '..okkkkkkkkkko..',
  '.oppppppppppPPo.',
  'oppppppppppPPPPo',
  '....oss..sso....',
  '....oss..sso....',
  '....obb..bbo....'
];

// Al señalar, el brazo se estira hacia el Pokémon
const POINTING_ARM = '.osjjjjwwjjJJsss';
const point = (rows) => rows.map((row, index) => (index === 11 ? POINTING_ARM : row));

const COLORS = {
  boy: {
    o: '#0f172a',
    s: '#f5c396',
    S: '#d99a63',
    c: '#dc2626',
    C: '#991b1b',
    w: '#f8fafc',
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
    s: '#f5c396',
    S: '#d99a63',
    c: '#dc2626',
    C: '#991b1b',
    w: '#f8fafc',
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

export default function PixelTrainer({ gender = 'boy', pointing = false, className = 'w-10 h-12' }) {
  const isGirl = gender === 'girl';
  const rows = pointing ? point(isGirl ? GIRL : BOY) : isGirl ? GIRL : BOY;
  const palette = COLORS[isGirl ? 'girl' : 'boy'];

  return (
    <svg viewBox="0 0 16 20" className={className} shapeRendering="crispEdges" aria-hidden="true">
      {rows.map((row, y) =>
        [...row].map((pixel, x) =>
          palette[pixel] ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={palette[pixel]} />
          ) : null
        )
      )}
    </svg>
  );
}
