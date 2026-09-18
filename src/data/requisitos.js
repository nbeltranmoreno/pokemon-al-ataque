// Descansos y requisitos de la Historia
// Algunas escenas hacen esperar al día siguiente y otras piden entrenar antes

import { hoy } from './misiones.js';

// ¿Se ha descansado ya y toca seguir? (el descanso se pasa al cambiar el día)
export const descansoTerminado = (save, stage) => {
  const puerta = save.storyGate;
  if (!puerta || puerta.stage !== stage) return false;
  return puerta.dia !== hoy();
};

// ¿Está el descanso empezado y todavía hay que esperar?
export const descansando = (save, stage) => {
  const puerta = save.storyGate;
  return Boolean(puerta && puerta.stage === stage && puerta.dia === hoy());
};

const nivelMasAlto = (save) =>
  [...(save.team || []), ...(save.box || [])].reduce((alto, pokemon) => Math.max(alto, pokemon.level || 0), 0);

/**
 * Qué le falta al entrenador para poder seguir con esta escena
 * Devuelve una lista de textos, vacía si ya puede pasar
 */
export const loQueFalta = (save, step) => {
  const pide = step?.requiere;
  if (!pide) return [];

  const falta = [];

  if (pide.nivel) {
    const alto = nivelMasAlto(save);
    if (alto < pide.nivel) falta.push({ texto: 'Un Pokémon de nivel {0} (el tuyo va por el {1})', datos: [pide.nivel, alto] });
  }

  if (pide.capturas) {
    const cuantos = (save.caughtLog || []).length;
    if (cuantos < pide.capturas) falta.push({ texto: 'Atrapar {0} Pokémon (llevas {1})', datos: [pide.capturas, cuantos] });
  }

  if (pide.equipo) {
    const cuantos = (save.team || []).length;
    if (cuantos < pide.equipo) falta.push({ texto: 'Tener {0} Pokémon en el equipo (llevas {1})', datos: [pide.equipo, cuantos] });
  }

  if (pide.monedas && (save.coins || 0) < pide.monedas) {
    falta.push({ texto: 'Ahorrar {0} monedas (llevas {1})', datos: [pide.monedas, save.coins || 0] });
  }

  return falta;
};
