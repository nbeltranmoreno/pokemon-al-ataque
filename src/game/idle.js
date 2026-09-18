// Monedas que caen solas: 5 cada 10 minutos, juegues o no
// Al volver después de un rato se cobran las que se hayan juntado, hasta un tope

export const COIN_EVERY = 10 * 60 * 1000; // 10 minutos
export const COINS_PER_BLOCK = 5;
const MAX_BLOCKS = 12; // como mucho 60 monedas de golpe (2 horas)

// Cuántos ratos de 10 minutos han pasado desde el último pago
export const idleBlocks = (lastCoinAt, now = Date.now()) => {
  if (!lastCoinAt) return 0;
  return Math.max(0, Math.min(MAX_BLOCKS, Math.floor((now - lastCoinAt) / COIN_EVERY)));
};

// Cuánto falta para las siguientes monedas
export const msToNextCoins = (lastCoinAt, now = Date.now()) => {
  if (!lastCoinAt) return COIN_EVERY;
  const pasado = (now - lastCoinAt) % COIN_EVERY;
  return Math.max(0, COIN_EVERY - pasado);
};

// El reloj se pone al día sin regalar los ratos que pasaron del tope
export const nextCoinMark = (lastCoinAt, now = Date.now()) => {
  const bloques = idleBlocks(lastCoinAt, now);
  const marca = lastCoinAt + bloques * COIN_EVERY;
  // Si se pasó del tope, se empieza a contar desde ahora
  return now - marca > COIN_EVERY * MAX_BLOCKS ? now : marca;
};
