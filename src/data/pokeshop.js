// Tienda de Pokémon: se desbloquean con la experiencia de entrenador y se pagan con monedas
// exp: experiencia de entrenador que hace falta · price: lo que cuesta · level: al nivel que viene

export const POKE_SHOP = [
  { id: 10, name: 'Caterpie', exp: 0, price: 60, level: 5 },
  { id: 16, name: 'Pidgey', exp: 0, price: 60, level: 5 },
  { id: 19, name: 'Rattata', exp: 0, price: 70, level: 5 },
  { id: 25, name: 'Pikachu', exp: 20, price: 200, level: 8 },
  { id: 133, name: 'Eevee', exp: 25, price: 260, level: 8 },
  { id: 66, name: 'Machop', exp: 30, price: 240, level: 10 },
  { id: 74, name: 'Geodude', exp: 30, price: 240, level: 10 },
  { id: 63, name: 'Abra', exp: 35, price: 300, level: 10 },
  { id: 92, name: 'Gastly', exp: 40, price: 320, level: 12 },
  { id: 147, name: 'Dratini', exp: 60, price: 600, level: 15 },
  { id: 58, name: 'Growlithe', exp: 60, price: 500, level: 15 },
  { id: 131, name: 'Lapras', exp: 80, price: 800, level: 20 },
  { id: 143, name: 'Snorlax', exp: 90, price: 900, level: 22 },
  { id: 130, name: 'Gyarados', exp: 100, price: 1000, level: 25 },
  { id: 65, name: 'Alakazam', exp: 110, price: 1100, level: 28 },
  { id: 94, name: 'Gengar', exp: 120, price: 1200, level: 30 },
  { id: 6, name: 'Charizard', exp: 140, price: 1500, level: 32 },
  { id: 9, name: 'Blastoise', exp: 140, price: 1500, level: 32 },
  { id: 3, name: 'Venusaur', exp: 140, price: 1500, level: 32 },
  { id: 448, name: 'Lucario', exp: 170, price: 1900, level: 35 },
  { id: 149, name: 'Dragonite', exp: 200, price: 2400, level: 38 },
  { id: 248, name: 'Tyranitar', exp: 220, price: 2800, level: 40 },
  { id: 376, name: 'Metagross', exp: 240, price: 3000, level: 42 },
  { id: 445, name: 'Garchomp', exp: 260, price: 3200, level: 45 },
  { id: 150, name: 'Mewtwo', exp: 320, price: 5000, level: 50 },
  { id: 384, name: 'Rayquaza', exp: 360, price: 6000, level: 55 },
  { id: 151, name: 'Mew', exp: 400, price: 8000, level: 60 }
];

/**
 * Experiencia de entrenador: la suma de los niveles de todos tus Pokémon
 * (los del equipo y los guardados). Cuanto más entrenas, más cosas se abren.
 */
export const trainerExp = (save) =>
  [...(save.team || []), ...(save.box || [])].reduce((suma, pokemon) => suma + (pokemon.level || 0), 0);
