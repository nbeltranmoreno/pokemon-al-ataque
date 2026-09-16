// Paisaje de fondo en píxeles: cielo, sol, nubes, colinas, árboles y hierba
// Se dibuja con cuadrados grandes para que se vea bien pixelado al estirarlo

const TREES = [2, 7, 12, 20, 27];

export default function PixelBackground({ className = '' }) {
  return (
    <svg
      viewBox="0 0 32 18"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    >
      {/* Cielo */}
      <rect x="0" y="0" width="32" height="18" fill="#38bdf8" />
      <rect x="0" y="0" width="32" height="4" fill="#0ea5e9" />

      {/* Sol */}
      <rect x="26" y="1" width="4" height="4" fill="#fde047" />
      <rect x="25" y="2" width="6" height="2" fill="#fde047" />

      {/* Nubes */}
      <rect x="3" y="3" width="6" height="1" fill="#f8fafc" />
      <rect x="4" y="2" width="4" height="1" fill="#f8fafc" />
      <rect x="14" y="5" width="7" height="1" fill="#f8fafc" />
      <rect x="16" y="4" width="4" height="1" fill="#f8fafc" />

      {/* Colinas del fondo */}
      <rect x="0" y="10" width="7" height="8" fill="#4ade80" />
      <rect x="5" y="9" width="8" height="9" fill="#22c55e" />
      <rect x="12" y="11" width="6" height="7" fill="#4ade80" />
      <rect x="17" y="9" width="9" height="9" fill="#22c55e" />
      <rect x="25" y="11" width="7" height="7" fill="#4ade80" />

      {/* Hierba */}
      <rect x="0" y="13" width="32" height="5" fill="#16a34a" />
      <rect x="0" y="16" width="32" height="2" fill="#15803d" />

      {/* Árboles */}
      {TREES.map(x => (
        <g key={x}>
          <rect x={x} y={11} width="1" height="3" fill="#92400e" />
          <rect x={x - 1} y={9} width="3" height="2" fill="#166534" />
          <rect x={x} y={8} width="1" height="1" fill="#166534" />
        </g>
      ))}

      {/* Camino de tierra */}
      <rect x="14" y="13" width="4" height="5" fill="#d9a066" />
      <rect x="15" y="13" width="2" height="5" fill="#eab676" />
    </svg>
  );
}
