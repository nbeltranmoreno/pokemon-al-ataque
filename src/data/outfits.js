// Conjuntos de ropa del entrenador: cambian los colores de la gorra, la ropa y el pantalón
// c/C = gorra y su sombra, j/J = ropa y su sombra, p/P = pantalón o falda y su sombra, k = cinturón

export const OUTFITS = [
  {
    id: 'clasico',
    name: 'Clásico',
    colors: { c: '#dc2626', C: '#991b1b', j: '#2563eb', J: '#1d4ed8', p: '#374151', P: '#1f2937', k: '#111827' }
  },
  {
    id: 'bosque',
    name: 'Bosque',
    colors: { c: '#16a34a', C: '#15803d', j: '#166534', J: '#14532d', p: '#78350f', P: '#451a03', k: '#292524' }
  },
  {
    id: 'noche',
    name: 'Noche',
    colors: { c: '#1e293b', C: '#0f172a', j: '#312e81', J: '#1e1b4b', p: '#0f172a', P: '#020617', k: '#4c1d95' }
  },
  {
    id: 'fuego',
    name: 'Fuego',
    colors: { c: '#f97316', C: '#c2410c', j: '#dc2626', J: '#991b1b', p: '#1c1917', P: '#0c0a09', k: '#78350f' }
  },
  {
    id: 'hielo',
    name: 'Hielo',
    colors: { c: '#e0f2fe', C: '#bae6fd', j: '#0ea5e9', J: '#0369a1', p: '#1e3a8a', P: '#172554', k: '#1e293b' }
  },
  {
    id: 'flor',
    name: 'Flor',
    colors: { c: '#f472b6', C: '#db2777', j: '#fbcfe8', J: '#f9a8d4', p: '#9d174d', P: '#831843', k: '#4c0519' }
  },
  {
    id: 'campeon',
    name: 'Campeón',
    colors: { c: '#fbbf24', C: '#b45309', j: '#facc15', J: '#ca8a04', p: '#78350f', P: '#451a03', k: '#92400e' }
  },
  {
    id: 'sombra',
    name: 'Sombra',
    colors: { c: '#111827', C: '#030712', j: '#1f2937', J: '#030712', p: '#111827', P: '#030712', k: '#dc2626' }
  }
];

export const getOutfit = (id) => OUTFITS.find(outfit => outfit.id === id) || OUTFITS[0];
