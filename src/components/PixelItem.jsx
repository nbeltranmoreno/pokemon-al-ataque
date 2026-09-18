// Objetos de la tienda dibujados píxel a píxel (12x12)
// o = contorno, w = blanco, r = rojo, k = negro, b = azul, y = amarillo, p = rosa

const SPRITES = {
  pokeball: [
    '....oooo....',
    '..oorrrroo..',
    '.orrrrrrrro.',
    'orrrrrrrrrro',
    'okkkkkkkkkko',
    'okkoowwookko',
    'owwoowwoowwo',
    'owwwwwwwwwwo',
    'owwwwwwwwwwo',
    '.owwwwwwwwo.',
    '..oowwwwoo..',
    '....oooo....'
  ],
  pocion: [
    '.....oo.....',
    '.....oo.....',
    '....owwo....',
    '...owwwwo...',
    '..owwwwwwo..',
    '..owwwwwwo..',
    '..orrrrrro..',
    '..orrrrrro..',
    '..orrrrrro..',
    '..orrrrrro..',
    '..oooooooo..',
    '............'
  ],
  superpocion: [
    '.....oo.....',
    '.....oo.....',
    '....owwo....',
    '...owwwwo...',
    '..owwwwwwo..',
    '..obbbbbbo..',
    '..obyyyybo..',
    '..obbbbbbo..',
    '..obbbbbbo..',
    '..obbbbbbo..',
    '..oooooooo..',
    '............'
  ],
  curatotal: [
    '.....oo.....',
    '.....oo.....',
    '....owwo....',
    '...owwwwo...',
    '..owwwwwwo..',
    '..oyyyyyyo..',
    '..oyyrryyo..',
    '..oyrrrryo..',
    '..oyyrryyo..',
    '..oyyyyyyo..',
    '..oooooooo..',
    '............'
  ],
  revivir: [
    '.....yy.....',
    '.....yy.....',
    '..y..yy..y..',
    '..yy.yy.yy..',
    '...yyyyyy...',
    '.yyyyyyyyyy.',
    '...yyyyyy...',
    '..yy.yy.yy..',
    '..y..yy..y..',
    '.....yy.....',
    '.....yy.....',
    '............'
  ],
  caramelo: [
    '............',
    '..o......o..',
    '.opo....opo.',
    '.oppo..oppo.',
    '.opppoooppo.',
    '..opppppppo.',
    '..opppppppo.',
    '.opppoooppo.',
    '.oppo..oppo.',
    '.opo....opo.',
    '..o......o..',
    '............'
  ]
};

const COLORS = {
  o: '#0f172a',
  w: '#f8fafc',
  r: '#dc2626',
  k: '#1f2937',
  b: '#2563eb',
  y: '#fde047',
  p: '#f472b6'
};

export default function PixelItem({ id, className = 'w-8 h-8' }) {
  const rows = SPRITES[id];
  if (!rows) return null;

  return (
    <svg viewBox="0 0 12 12" className={className} shapeRendering="crispEdges" aria-hidden="true">
      {rows.map((row, y) =>
        [...row].map((pixel, x) =>
          COLORS[pixel] ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={COLORS[pixel]} />
          ) : null
        )
      )}
    </svg>
  );
}
