// Entrenador dibujado píxel a píxel (16x20), estilo Game Boy: contorno negro y pocos colores
// o = contorno, s = piel, c = gorra, w = blanco (visera y franja), h = pelo
// j = chaqueta, k = cinturón, p = pantalón o falda, b = botas

const BOY = [
  '.....oooooo.....',
  '....occcccco....',
  '...occcccccco...',
  '..occcccccccco..',
  '..owwwwwwwwwwo..',
  '...osssssssso...',
  '...osossssoso...',
  '...osssoossso...',
  '...osssssssso...',
  '....oooooooo....',
  '..ojjjjjjjjjjo..',
  '.osjjjjwwjjjjso.',
  '.osjjjjwwjjjjso.',
  '..ojjjjjjjjjjo..',
  '..okkkkkkkkkko..',
  '..oppppppppppo..',
  '...oppo..oppo...',
  '...oppo..oppo...',
  '...obbo..obbo...',
  '...oooo..oooo...'
];

const GIRL = [
  '.....oooooo.....',
  '....ohhhhhho....',
  '...ohhhhhhhho...',
  '..ohhhhhhhhhho..',
  '..ohhsssssshho..',
  '..ohhsossoshho..',
  '..ohhssoosshho..',
  '..ohhsssssshho..',
  '...ohssssssho...',
  '....oooooooo....',
  '..ojjjjjjjjjjo..',
  '.osjjjjwwjjjjso.',
  '.osjjjjwwjjjjso.',
  '..ojjjjjjjjjjo..',
  '..okkkkkkkkkko..',
  '.oppppppppppppo.',
  'oppppppppppppppo',
  '....oss..sso....',
  '....oss..sso....',
  '....obb..bbo....'
];

// Al señalar, el brazo se estira hacia el Pokémon
const POINTING_ARM = '.osjjjjwwjjjjsss';
const point = (rows) => rows.map((row, index) => (index === 11 ? POINTING_ARM : row));

const COLORS = {
  boy: {
    o: '#0f172a',
    s: '#f5c396',
    c: '#dc2626',
    w: '#f8fafc',
    h: '#7c3f1d',
    j: '#2563eb',
    k: '#374151',
    p: '#1f2937',
    b: '#1f2937'
  },
  girl: {
    o: '#0f172a',
    s: '#f5c396',
    c: '#dc2626',
    w: '#f8fafc',
    h: '#92400e',
    j: '#db2777',
    k: '#374151',
    p: '#f472b6',
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
