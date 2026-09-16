// Entrenador dibujado píxel a píxel, en chico y chica, quieto o señalando
// o = borde/ojos, s = piel, c = gorra, w = visera, h = pelo, j = ropa, p = pantalón o falda, b = botas

const BOY = [
  '....cccc....',
  '...cccccc...',
  '..cccccccc..',
  '..wwwwwwww..',
  '...ssssss...',
  '...sossos...',
  '...ssooss...',
  '...jjjjjj...',
  '.sjjjjjjjjs.',
  '..jjjjjjjj..',
  '..jjjjjjjj..',
  '..pppppppp..',
  '..ppp..ppp..',
  '..ppp..ppp..',
  '..bbb..bbb..'
];

const GIRL = [
  '....hhhh....',
  '...hhhhhh...',
  '..hhhhhhhh..',
  '..hssssssh..',
  '..hsossosh..',
  '..hssoossh..',
  '..hssssssh..',
  '...jjjjjj...',
  '.sjjjjjjjjs.',
  '..jjjjjjjj..',
  '.jjjjjjjjjj.',
  '.pppppppppp.',
  '...ss..ss...',
  '...ss..ss...',
  '...bb..bb...'
];

// Al señalar, el brazo derecho se estira hacia el Pokémon
const point = (rows) => rows.map((row, index) => (index === 8 ? '.sjjjjjjjjss' : row));

const COLORS = {
  boy: { o: '#111827', s: '#f3c18b', c: '#ef4444', w: '#f8fafc', h: '#7c3f1d', j: '#2563eb', p: '#1f2937', b: '#111827' },
  girl: { o: '#111827', s: '#f3c18b', c: '#ef4444', w: '#f8fafc', h: '#a0522d', j: '#ec4899', p: '#f472b6', b: '#111827' }
};

export default function PixelTrainer({ gender = 'boy', pointing = false, className = 'w-10 h-12' }) {
  const base = gender === 'girl' ? GIRL : BOY;
  const rows = pointing ? point(base) : base;
  const palette = COLORS[gender === 'girl' ? 'girl' : 'boy'];

  return (
    <svg viewBox="0 0 12 15" className={className} shapeRendering="crispEdges" aria-hidden="true">
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
