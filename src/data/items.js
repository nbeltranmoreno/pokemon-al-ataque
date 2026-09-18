// Objetos de la tienda
// effect: 'balls' (van directas al contador), 'heal', 'revive' o 'levelup' (se guardan en el inventario)

export const ITEMS = [
  {
    id: 'pokeball',
    name: 'Poké Balls x3',
    emoji: '⚪',
    price: 40,
    effect: 'balls',
    amount: 3,
    description: 'Tres Poké Balls para capturar en Peleas'
  },
  {
    id: 'pocion',
    name: 'Poción',
    emoji: '🧪',
    price: 30,
    effect: 'heal',
    amount: 25,
    description: 'Cura 25 PS a un Pokémon'
  },
  {
    id: 'superpocion',
    name: 'Super Poción',
    emoji: '🧴',
    price: 70,
    effect: 'heal',
    amount: 70,
    description: 'Cura 70 PS a un Pokémon'
  },
  {
    id: 'curatotal',
    name: 'Cura Total',
    emoji: '🧯',
    price: 120,
    effect: 'full',
    description: 'Cura del todo a un Pokémon y le devuelve los PP'
  },
  {
    id: 'revivir',
    name: 'Revivir',
    emoji: '✨',
    price: 120,
    effect: 'revive',
    description: 'Despierta a un Pokémon debilitado con media vida'
  },
  {
    id: 'caramelo',
    name: 'Caramelo Raro',
    emoji: '🍬',
    price: 200,
    effect: 'levelup',
    description: 'Sube un nivel a un Pokémon'
  }
];

export const getItem = (id) => ITEMS.find(item => item.id === id);
