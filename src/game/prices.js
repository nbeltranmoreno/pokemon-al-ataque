// Cuánto pagan por un Pokémon: cuenta lo bueno que es (sus estadísticas) y su nivel

export const statsTotal = (pokemon) =>
  Object.values(pokemon.baseStats || {}).reduce((total, value) => total + value, 0);

export const sellPrice = (pokemon) => {
  const total = statsTotal(pokemon);
  // Un Caterpie flojo de nivel bajo vale calderilla; un Dragonite alto vale mucho
  const porNivel = pokemon.level * 3;
  const porFuerza = Math.round((total - 190) / 3);
  return Math.max(5, porNivel + porFuerza);
};
