// Pokémon que se mueven en el aire: los de tipo volador y los que levitan
// Los demás se quedan quietos pisando el suelo

const FLOATER_IDS = new Set([
  6, // Charizard
  12, // Butterfree
  16, 17, 18, // Pidgey, Pidgeotto, Pidgeot
  21, 22, // Spearow, Fearow
  41, 42, // Zubat, Golbat
  49, // Venomoth
  81, 82, // Magnemite, Magneton
  83, // Farfetch'd
  92, 93, 94, // Gastly, Haunter, Gengar
  109, 110, // Koffing, Weezing
  120, 121, // Staryu, Starmie
  123, // Scyther
  130, // Gyarados
  137, // Porygon
  142, // Aerodactyl
  144, 145, 146, // Articuno, Zapdos, Moltres
  149, // Dragonite
  150, 151 // Mewtwo, Mew
]);

export const canFloat = (id, types = []) => types.includes('flying') || FLOATER_IDS.has(Number(id));
