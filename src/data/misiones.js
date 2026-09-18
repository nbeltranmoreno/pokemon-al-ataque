// Misiones: cosas que hacer para ganar monedas
// Las diarias se reinician cada día; los logros se cobran una sola vez
// Hay varias que no necesitan Pokémon ni pelear

import { STORY, medalsWon } from './story.js';

export const hoy = () => new Date().toISOString().slice(0, 10);

// Contadores del día, que vuelven a cero cuando cambia la fecha
export const contadoresDelDia = (misiones) => {
  const vacio = { dia: hoy(), peleas: 0, capturas: 0, escenas: 0, online: 0, minutos: 0, entradas: 0, cobradas: [] };
  if (!misiones || misiones.dia !== hoy()) return vacio;
  return { ...vacio, ...misiones };
};

const nivelMasAlto = (save) =>
  [...(save.team || []), ...(save.box || [])].reduce((alto, pokemon) => Math.max(alto, pokemon.level || 0), 0);

export const MISIONES = [
  // --- Del día: sin Pokémon ---
  {
    id: 'dia_entrar',
    tipo: 'diaria',
    icono: '👋',
    texto: 'Entra a jugar hoy',
    meta: 1,
    premio: 15,
    progreso: (save) => contadoresDelDia(save.misiones).entradas
  },
  {
    id: 'dia_tiempo',
    tipo: 'diaria',
    icono: '⏱',
    texto: 'Ten el juego abierto 30 minutos hoy',
    meta: 30,
    premio: 25,
    progreso: (save) => contadoresDelDia(save.misiones).minutos
  },

  // --- Del día: jugando ---
  {
    id: 'dia_peleas',
    tipo: 'diaria',
    icono: '⚔️',
    texto: 'Gana 3 Peleas hoy',
    meta: 3,
    premio: 40,
    progreso: (save) => contadoresDelDia(save.misiones).peleas
  },
  {
    id: 'dia_captura',
    tipo: 'diaria',
    icono: '⚪',
    texto: 'Atrapa 1 Pokémon hoy',
    meta: 1,
    premio: 30,
    progreso: (save) => contadoresDelDia(save.misiones).capturas
  },
  {
    id: 'dia_historia',
    tipo: 'diaria',
    icono: '📖',
    texto: 'Pasa 5 escenas de la Historia hoy',
    meta: 5,
    premio: 25,
    progreso: (save) => contadoresDelDia(save.misiones).escenas
  },
  {
    id: 'dia_online',
    tipo: 'diaria',
    icono: '🌐',
    texto: 'Juega 1 combate Online hoy',
    meta: 1,
    premio: 50,
    progreso: (save) => contadoresDelDia(save.misiones).online
  },

  // --- Logros sin Pokémon ---
  {
    id: 'logro_tutorial',
    tipo: 'logro',
    icono: '❓',
    texto: 'Mira el tutorial entero',
    meta: 1,
    premio: 25,
    progreso: (save) => (save.tutorialSeen ? 1 : 0)
  },
  {
    id: 'logro_idioma',
    tipo: 'logro',
    icono: '🌍',
    texto: 'Prueba el juego en inglés',
    meta: 1,
    premio: 20,
    progreso: (save) => (save.probadoIngles ? 1 : 0)
  },
  {
    id: 'logro_dias',
    tipo: 'logro',
    icono: '📅',
    texto: 'Entra a jugar 3 días distintos',
    meta: 3,
    premio: 80,
    progreso: (save) => save.diasJugados || 0
  },
  {
    id: 'logro_comprar',
    tipo: 'logro',
    icono: '🛒',
    texto: 'Compra 3 objetos en la Tienda',
    meta: 3,
    premio: 60,
    progreso: (save) => save.comprasTotal || 0
  },
  {
    id: 'logro_vender',
    tipo: 'logro',
    icono: '🪙',
    texto: 'Vende 1 Pokémon',
    meta: 1,
    premio: 30,
    progreso: (save) => save.vendidos || 0
  },

  // --- Logros de entrenador ---
  {
    id: 'logro_capturas',
    tipo: 'logro',
    icono: '📒',
    texto: 'Atrapa 10 Pokémon',
    meta: 10,
    premio: 150,
    progreso: (save) => (save.caughtLog || []).length
  },
  {
    id: 'logro_medallas',
    tipo: 'logro',
    icono: '🏅',
    texto: 'Consigue 3 medallas',
    meta: 3,
    premio: 200,
    progreso: (save) => medalsWon(save.storyStage || 0)
  },
  {
    id: 'logro_nivel',
    tipo: 'logro',
    icono: '⭐',
    texto: 'Sube un Pokémon al nivel 20',
    meta: 20,
    premio: 150,
    progreso: nivelMasAlto
  },
  {
    id: 'logro_equipo',
    tipo: 'logro',
    icono: '👥',
    texto: 'Ten 6 Pokémon en el equipo',
    meta: 6,
    premio: 120,
    progreso: (save) => (save.team || []).length
  },
  {
    id: 'logro_campeon',
    tipo: 'logro',
    icono: '👑',
    texto: 'Termina la Historia',
    meta: STORY.length,
    premio: 500,
    progreso: (save) => Math.min(save.storyStage || 0, STORY.length)
  }
];

// ¿Está cobrada esta misión?
export const estaCobrada = (save, mision) =>
  mision.tipo === 'diaria'
    ? contadoresDelDia(save.misiones).cobradas.includes(mision.id)
    : (save.logrosCobrados || []).includes(mision.id);

// ¿Se puede cobrar ya?
export const sePuedeCobrar = (save, mision) =>
  mision.progreso(save) >= mision.meta && !estaCobrada(save, mision);

// Cuántas hay listas para cobrar (para el aviso del menú)
export const misionesListas = (save) => MISIONES.filter(mision => sePuedeCobrar(save, mision)).length;

export const buscarMision = (id) => MISIONES.find(mision => mision.id === id);
