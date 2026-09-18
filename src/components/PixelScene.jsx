// Escenarios de la Historia dibujados en píxeles (32x18), uno por cada sitio del cuento

const tree = (x, ground = 11) => (
  <g key={`tree-${x}`}>
    <rect x={x} y={ground} width="1" height="3" fill="#92400e" />
    <rect x={x - 1} y={ground - 2} width="3" height="2" fill="#166534" />
    <rect x={x} y={ground - 3} width="1" height="1" fill="#166534" />
  </g>
);

const SCENES = {
  pueblo: (
    <>
      <rect x="0" y="0" width="32" height="12" fill="#7dd3fc" />
      <rect x="26" y="1" width="3" height="3" fill="#fde047" />
      <rect x="3" y="2" width="5" height="1" fill="#f8fafc" />
      <rect x="4" y="1" width="3" height="1" fill="#f8fafc" />
      <rect x="0" y="9" width="32" height="3" fill="#4ade80" />
      <rect x="0" y="11" width="32" height="7" fill="#22c55e" />
      <rect x="0" y="16" width="32" height="2" fill="#15803d" />
      <rect x="14" y="11" width="4" height="7" fill="#d9a066" />
      <rect x="3" y="5" width="9" height="2" fill="#dc2626" />
      <rect x="4" y="7" width="7" height="5" fill="#fef3c7" />
      <rect x="6" y="9" width="2" height="3" fill="#92400e" />
      <rect x="9" y="8" width="2" height="2" fill="#38bdf8" />
      <rect x="20" y="6" width="8" height="2" fill="#b91c1c" />
      <rect x="21" y="8" width="6" height="4" fill="#fef3c7" />
      <rect x="23" y="10" width="2" height="2" fill="#92400e" />
      {tree(18, 11)}
    </>
  ),
  ruta: (
    <>
      <rect x="0" y="0" width="32" height="10" fill="#7dd3fc" />
      <rect x="27" y="1" width="3" height="3" fill="#fde047" />
      <rect x="5" y="3" width="6" height="1" fill="#f8fafc" />
      <rect x="0" y="9" width="32" height="9" fill="#22c55e" />
      <rect x="0" y="12" width="32" height="3" fill="#d9a066" />
      <rect x="0" y="16" width="32" height="2" fill="#15803d" />
      <rect x="2" y="10" width="3" height="1" fill="#16a34a" />
      <rect x="8" y="15" width="4" height="1" fill="#16a34a" />
      <rect x="21" y="10" width="3" height="1" fill="#16a34a" />
      <rect x="26" y="15" width="4" height="1" fill="#16a34a" />
      <rect x="9" y="10" width="1" height="2" fill="#a16207" />
      <rect x="12" y="10" width="1" height="2" fill="#a16207" />
      <rect x="9" y="10" width="4" height="1" fill="#a16207" />
      {tree(5, 9)}
      {tree(25, 9)}
    </>
  ),
  bosque: (
    <>
      <rect x="0" y="0" width="32" height="18" fill="#14532d" />
      <rect x="0" y="0" width="32" height="5" fill="#166534" />
      <rect x="0" y="5" width="32" height="1" fill="#15803d" />
      <rect x="3" y="6" width="2" height="9" fill="#78350f" />
      <rect x="1" y="4" width="6" height="3" fill="#15803d" />
      <rect x="9" y="6" width="2" height="9" fill="#78350f" />
      <rect x="7" y="4" width="6" height="3" fill="#15803d" />
      <rect x="15" y="6" width="2" height="9" fill="#78350f" />
      <rect x="13" y="4" width="6" height="3" fill="#15803d" />
      <rect x="21" y="6" width="2" height="9" fill="#78350f" />
      <rect x="19" y="4" width="6" height="3" fill="#15803d" />
      <rect x="27" y="6" width="2" height="9" fill="#78350f" />
      <rect x="25" y="4" width="6" height="3" fill="#15803d" />
      <rect x="0" y="14" width="32" height="4" fill="#365314" />
      <rect x="0" y="17" width="32" height="1" fill="#1a2e05" />
      <rect x="7" y="13" width="1" height="1" fill="#ef4444" />
      <rect x="19" y="13" width="1" height="1" fill="#ef4444" />
    </>
  ),
  cueva: (
    <>
      <rect x="0" y="0" width="32" height="18" fill="#1f2937" />
      <rect x="0" y="0" width="32" height="4" fill="#374151" />
      <rect x="3" y="4" width="1" height="3" fill="#374151" />
      <rect x="8" y="4" width="1" height="2" fill="#374151" />
      <rect x="14" y="4" width="1" height="3" fill="#374151" />
      <rect x="19" y="4" width="1" height="2" fill="#374151" />
      <rect x="26" y="4" width="1" height="3" fill="#374151" />
      <rect x="0" y="14" width="32" height="4" fill="#4b5563" />
      <rect x="6" y="12" width="3" height="2" fill="#6b7280" />
      <rect x="20" y="12" width="4" height="2" fill="#6b7280" />
      <rect x="2" y="6" width="1" height="3" fill="#92400e" />
      <rect x="2" y="5" width="1" height="1" fill="#fbbf24" />
      <rect x="26" y="11" width="1" height="3" fill="#a78bfa" />
      <rect x="28" y="12" width="1" height="2" fill="#a78bfa" />
    </>
  ),
  mar: (
    <>
      <rect x="0" y="0" width="32" height="8" fill="#7dd3fc" />
      <rect x="25" y="1" width="3" height="3" fill="#fde047" />
      <rect x="6" y="2" width="5" height="1" fill="#f8fafc" />
      <rect x="0" y="8" width="32" height="10" fill="#0284c7" />
      <rect x="0" y="9" width="32" height="1" fill="#38bdf8" />
      <rect x="4" y="11" width="10" height="1" fill="#38bdf8" />
      <rect x="18" y="13" width="9" height="1" fill="#38bdf8" />
      <rect x="0" y="15" width="32" height="3" fill="#fde68a" />
      <rect x="10" y="13" width="11" height="1" fill="#92400e" />
      <rect x="11" y="14" width="1" height="2" fill="#78350f" />
      <rect x="19" y="14" width="1" height="2" fill="#78350f" />
    </>
  ),
  volcan: (
    <>
      <rect x="0" y="0" width="32" height="18" fill="#7f1d1d" />
      <rect x="0" y="0" width="32" height="4" fill="#991b1b" />
      <rect x="12" y="1" width="3" height="1" fill="#78716c" />
      <rect x="13" y="2" width="4" height="1" fill="#78716c" />
      <rect x="14" y="5" width="4" height="2" fill="#451a03" />
      <rect x="12" y="7" width="8" height="2" fill="#451a03" />
      <rect x="10" y="9" width="12" height="2" fill="#44403c" />
      <rect x="7" y="11" width="18" height="2" fill="#44403c" />
      <rect x="4" y="13" width="24" height="2" fill="#292524" />
      <rect x="14" y="5" width="4" height="1" fill="#f97316" />
      <rect x="15" y="6" width="2" height="6" fill="#ea580c" />
      <rect x="15" y="12" width="3" height="3" fill="#f97316" />
      <rect x="0" y="15" width="32" height="3" fill="#292524" />
      <rect x="3" y="14" width="2" height="1" fill="#57534e" />
      <rect x="27" y="14" width="2" height="1" fill="#57534e" />
    </>
  ),
  torre: (
    <>
      <rect x="0" y="0" width="32" height="18" fill="#312e81" />
      <rect x="0" y="0" width="32" height="6" fill="#1e1b4b" />
      <rect x="2" y="1" width="1" height="1" fill="#f8fafc" />
      <rect x="6" y="3" width="1" height="1" fill="#f8fafc" />
      <rect x="9" y="1" width="1" height="1" fill="#f8fafc" />
      <rect x="22" y="2" width="1" height="1" fill="#f8fafc" />
      <rect x="29" y="4" width="1" height="1" fill="#f8fafc" />
      <rect x="25" y="2" width="3" height="3" fill="#fef9c3" />
      <rect x="13" y="1" width="6" height="1" fill="#4c1d95" />
      <rect x="11" y="2" width="10" height="2" fill="#4c1d95" />
      <rect x="12" y="4" width="8" height="12" fill="#6d28d9" />
      <rect x="14" y="6" width="2" height="2" fill="#fde047" />
      <rect x="17" y="6" width="2" height="2" fill="#fde047" />
      <rect x="14" y="10" width="2" height="2" fill="#fde047" />
      <rect x="17" y="10" width="2" height="2" fill="#fde047" />
      <rect x="15" y="13" width="2" height="3" fill="#312e81" />
      <rect x="0" y="16" width="32" height="2" fill="#1e1b4b" />
    </>
  ),
  liga: (
    <>
      <rect x="0" y="0" width="32" height="18" fill="#fb923c" />
      <rect x="0" y="0" width="32" height="4" fill="#f59e0b" />
      <rect x="15" y="1" width="2" height="2" fill="#fde047" />
      <rect x="3" y="3" width="26" height="2" fill="#b45309" />
      <rect x="4" y="5" width="24" height="10" fill="#fbbf24" />
      <rect x="6" y="7" width="2" height="8" fill="#fef3c7" />
      <rect x="11" y="7" width="2" height="8" fill="#fef3c7" />
      <rect x="19" y="7" width="2" height="8" fill="#fef3c7" />
      <rect x="24" y="7" width="2" height="8" fill="#fef3c7" />
      <rect x="14" y="7" width="4" height="8" fill="#92400e" />
      <rect x="14" y="15" width="4" height="3" fill="#dc2626" />
      <rect x="0" y="15" width="32" height="3" fill="#a16207" />
    </>
  )
};

export default function PixelScene({ name, className = '' }) {
  const scene = SCENES[name] || SCENES.ruta;

  return (
    <svg
      viewBox="0 0 32 18"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
    >
      {scene}
    </svg>
  );
}
