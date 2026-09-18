// La Historia completa, repartida en capítulos para que sea más fácil seguir añadiendo
import { CAPITULOS_1_A_3 } from './story/capitulos1a3.js';
import { CAPITULOS_4_A_6 } from './story/capitulos4a6.js';
import { CAPITULOS_7_A_8 } from './story/capitulos7a8.js';
import { CAPITULOS_9_A_10 } from './story/capitulos9a10.js';
import { CAPITULOS_11_A_12 } from './story/capitulos11a12.js';
import { CAPITULOS_13_A_14 } from './story/capitulos13a14.js';
import { CAPITULOS_15_A_16 } from './story/capitulos15a16.js';
import { CAPITULOS_17_A_18 } from './story/capitulos17a18.js';
import { CAPITULOS_19_A_20 } from './story/capitulos19a20.js';

export const STORY = [
  ...CAPITULOS_1_A_3,
  ...CAPITULOS_4_A_6,
  ...CAPITULOS_7_A_8,
  ...CAPITULOS_9_A_10,
  ...CAPITULOS_11_A_12,
  ...CAPITULOS_13_A_14,
  ...CAPITULOS_15_A_16,
  ...CAPITULOS_17_A_18,
  ...CAPITULOS_19_A_20
];

// Medallas: solo las dan los líderes de gimnasio y los combates grandes
export const MEDALS = STORY.filter(step => step.type === 'battle' && step.medal).map(step => step.medal);

// Cuántas medallas llevas según por dónde vaya la historia
export const medalsWon = (stage) =>
  STORY.slice(0, stage).filter(step => step.type === 'battle' && step.medal).length;

// Cuántos combates hay en total (para contarlos en pantalla)
export const TOTAL_BATTLES = STORY.filter(step => step.type === 'battle').length;
