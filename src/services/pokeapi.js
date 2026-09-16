// Datos de Pokémon desde PokéAPI (https://pokeapi.co), con caché en el navegador

const API = 'https://pokeapi.co/api/v2';
const CACHE_PREFIX = 'pokemonAlAtaque_especie_v1_';

// Pokémon entre los que se elige el equipo inicial
export const STARTER_IDS = [1, 4, 7, 25, 133, 152, 155, 158, 252, 255, 258, 447];

// Los rivales salvajes salen de la primera generación
const WILD_MAX_ID = 151;

// Si un Pokémon no tiene ningún ataque con potencia, usa este
const FALLBACK_MOVE = {
  id: 33,
  name: 'Placaje',
  type: 'normal',
  power: 40,
  accuracy: 100,
  pp: 35,
  category: 'physical'
};

const readCache = (key) => {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeCache = (key, value) => {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(value));
  } catch {
    // Si no hay espacio, seguimos sin caché
  }
};

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`PokéAPI respondió ${response.status}`);
  return response.json();
};

const spanishName = (names, fallback) => {
  const found = names?.find(n => n.language.name === 'es')?.name;
  return found || fallback.charAt(0).toUpperCase() + fallback.slice(1);
};

const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);

const toMove = (data) => ({
  id: data.id,
  name: spanishName(data.names, data.name),
  type: data.type.name,
  power: data.power,
  accuracy: data.accuracy ?? 100,
  pp: Math.max(5, data.pp ?? 10),
  category: data.damage_class.name === 'special' ? 'special' : 'physical'
});

// Elegir hasta 4 ataques con potencia entre los que aprende el Pokémon
const pickMoves = async (moveEntries) => {
  const candidates = shuffle(moveEntries).slice(0, 14);
  const details = await Promise.all(
    candidates.map(entry => fetchJson(entry.move.url).catch(() => null))
  );

  const moves = details
    .filter(move => move && move.power && move.damage_class.name !== 'status')
    .slice(0, 4)
    .map(toMove);

  return moves.length > 0 ? moves : [FALLBACK_MOVE];
};

export const loadSpecies = async (id) => {
  const cached = readCache(id);
  if (cached) return cached;

  const [data, species] = await Promise.all([
    fetchJson(`${API}/pokemon/${id}`),
    fetchJson(`${API}/pokemon-species/${id}`)
  ]);

  const stat = (name) => data.stats.find(s => s.stat.name === name)?.base_stat ?? 50;

  const result = {
    id: data.id,
    name: spanishName(species.names, data.name),
    types: data.types.map(t => t.type.name),
    baseStats: {
      hp: stat('hp'),
      attack: stat('attack'),
      defense: stat('defense'),
      specialAttack: stat('special-attack'),
      specialDefense: stat('special-defense'),
      speed: stat('speed')
    },
    sprites: {
      front: data.sprites.front_default,
      back: data.sprites.back_default || data.sprites.front_default,
      artwork: data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default
    },
    moves: await pickMoves(data.moves)
  };

  writeCache(id, result);
  return result;
};

export const loadStarters = () => Promise.all(STARTER_IDS.map(loadSpecies));

export const loadRandomWild = () => loadSpecies(1 + Math.floor(Math.random() * WILD_MAX_ID));
