// Días de descuento: algunos días las tiendas están de oferta
// Sale del propio día, así que a todo el mundo le toca el mismo descuento

import { hoy } from './misiones.js';

// Un número siempre igual para cada fecha
const semilla = (fecha) => {
  let n = 0;
  for (const letra of fecha) n = (n * 31 + letra.charCodeAt(0)) % 100000;
  return n;
};

/**
 * Cuánto se descuenta hoy: 0 (nada), 0.2, 0.3 o 0.5
 * Toca oferta 4 de cada 10 días más o menos
 */
export const descuentoDeHoy = (fecha = hoy()) => {
  const n = semilla(fecha) % 10;
  if (n === 0) return 0.5;
  if (n === 1 || n === 2) return 0.3;
  if (n === 3) return 0.2;
  return 0;
};

// El precio ya con el descuento puesto
export const precioHoy = (precio, fecha = hoy()) =>
  Math.max(1, Math.round(precio * (1 - descuentoDeHoy(fecha))));

// Para enseñarlo en pantalla: 30 en vez de 0.3
export const porcentajeDeHoy = (fecha = hoy()) => Math.round(descuentoDeHoy(fecha) * 100);
