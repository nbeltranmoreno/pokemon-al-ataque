// Huevo dibujado píxel a píxel: o = borde, w = cáscara, g = mancha
const PIXELS = [
  '....oooo....',
  '...owwwwo...',
  '..owwwwwwo..',
  '.owwwwwwwwo.',
  '.owwwggwwwo.',
  'owwwwggwwwwo',
  'owwwwwwwwwwo',
  'owggwwwwggwo',
  'owggwwwwggwo',
  'owwwwwwwwwwo',
  '.owwwwwwwwo.',
  '.owwwwwwwwo.',
  '..owwwwwwo..',
  '...oooooo...'
];

const COLORS = {
  o: '#111827',
  w: '#fdf6e3',
  g: '#4ade80'
};

export default function PixelEgg({ className = 'w-4 h-5' }) {
  return (
    <svg viewBox="0 0 12 14" className={className} shapeRendering="crispEdges" aria-hidden="true">
      {PIXELS.map((row, y) =>
        [...row].map((pixel, x) =>
          COLORS[pixel] ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={COLORS[pixel]} />
          ) : null
        )
      )}
    </svg>
  );
}
