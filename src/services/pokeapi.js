// Datos de Pokémon desde PokéAPI (https://pokeapi.co), con caché en el navegador

import { getLang } from '../i18n';

const API = 'https://pokeapi.co/api/v2';
const CACHE_PREFIX = 'pokemonAlAtaque_especie_v3_';

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

// Cada idioma guarda sus propios nombres
const readCache = (key) => {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + getLang() + '_' + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeCache = (key, value) => {
  try {
    localStorage.setItem(CACHE_PREFIX + getLang() + '_' + key, JSON.stringify(value));
  } catch {
    // Si no hay espacio, seguimos sin caché
  }
};

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`PokéAPI respondió ${response.status}`);
  return response.json();
};

// El nombre en el idioma elegido; si no está, el que venga de serie
const localName = (names, fallback) => {
  const found = names?.find(n => n.language.name === getLang())?.name;
  return found || fallback.charAt(0).toUpperCase() + fallback.slice(1);
};

const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);

const toMove = (data) => ({
  id: data.id,
  name: localName(data.names, data.name),
  type: data.type.name,
  power: data.power,
  accuracy: data.accuracy ?? 100,
  pp: Math.max(5, data.pp ?? 10),
  category: data.damage_class.name === 'special' ? 'special' : 'physical'
});

// Elegir hasta 4 ataques que le peguen a ese Pokémon, no siempre los mismos golpes normales:
// primero los de su propio tipo (que hacen más daño) y luego variados, uno de cada tipo
const pickMoves = async (moveEntries, types = [], ataque = 50, ataqueEspecial = 50) => {
  const candidates = shuffle(moveEntries).slice(0, 18);
  const details = await Promise.all(
    candidates.map(entry => fetchJson(entry.move.url).catch(() => null))
  );

  const golpes = details
    .filter(move => move && move.power && move.damage_class.name !== 'status')
    .map(toMove);

  if (golpes.length === 0) return [FALLBACK_MOVE];

  // Un Pokémon con más ataque físico prefiere golpes físicos, y al revés
  const leSienta = (move) =>
    move.power + (move.category === (ataqueEspecial > ataque ? 'special' : 'physical') ? 15 : 0);
  const mejorPrimero = (a, b) => leSienta(b) - leSienta(a);

  const propios = golpes.filter(move => types.includes(move.type)).sort(mejorPrimero);
  const otros = golpes.filter(move => !types.includes(move.type)).sort(mejorPrimero);

  const elegidos = [];
  const añadir = (move) => {
    if (move && elegidos.length < 4 && !elegidos.some(puesto => puesto.id === move.id)) elegidos.push(move);
  };

  // Hasta dos de su tipo: así un Charmander pega con fuego
  propios.slice(0, 2).forEach(añadir);

  // El resto, de tipos distintos para que tenga respuestas variadas
  const tiposPuestos = new Set(elegidos.map(move => move.type));
  for (const move of otros) {
    if (elegidos.length >= 4) break;
    if (tiposPuestos.has(move.type)) continue;
    añadir(move);
    tiposPuestos.add(move.type);
  }

  // Si aún faltan, se rellena con lo que haya
  [...propios, ...otros].forEach(añadir);

  return elegidos;
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
    name: localName(species.names, data.name),
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
    moves: await pickMoves(data.moves, data.types.map(t => t.type.name), stat('attack'), stat('special-attack'))
  };

  writeCache(id, result);
  return result;
};

export const loadStarters = () => Promise.all(STARTER_IDS.map(loadSpecies));

export const loadRandomWild = () => loadSpecies(1 + Math.floor(Math.random() * WILD_MAX_ID));

export const spriteUrl = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

// Lista ligera para elegir rival: solo id, nombre y sprite (una única petición)
export const loadPokedex = async () => {
  const cached = readCache('pokedex');
  if (cached) return cached;

  const data = await fetchJson(`${API}/pokemon?limit=${WILD_MAX_ID}`);
  const list = data.results.map((entry, index) => ({
    id: index + 1,
    name: entry.name.charAt(0).toUpperCase() + entry.name.slice(1),
    sprite: spriteUrl(index + 1)
  }));

  writeCache('pokedex', list);
  return list;
};
