import { getEffectiveness } from '../data/types.js';

// Motor de combate por turnos (fórmulas simplificadas de los juegos originales)

export const statAt = (base, level) => Math.floor((base * 2 * level) / 100) + 5;
export const maxHpAt = (baseHp, level) => Math.floor((baseHp * 2 * level) / 100) + level + 10;

export const xpToNextLevel = (level) => 40 + level * 30;

// Ataque de emergencia cuando ya no quedan PP
export const STRUGGLE = {
  id: 0,
  name: 'Forcejeo',
  type: 'normal',
  power: 30,
  accuracy: 100,
  pp: Infinity,
  category: 'physical'
};

// Crear un Pokémon listo para combatir a partir de los datos de la especie
export const createFighter = (species, level) => {
  const maxHp = maxHpAt(species.baseStats.hp, level);
  return {
    uid: crypto.randomUUID(),
    speciesId: species.id,
    name: species.name,
    types: species.types,
    sprites: species.sprites,
    baseStats: species.baseStats,
    level,
    xp: 0,
    maxHp,
    hp: maxHp,
    moves: species.moves.map(move => ({ ...move, ppLeft: move.pp }))
  };
};

export const speedOf = (fighter) => statAt(fighter.baseStats.speed, fighter.level);

export const isFainted = (fighter) => fighter.hp <= 0;

export const healFighter = (fighter) => ({
  ...fighter,
  hp: fighter.maxHp,
  moves: fighter.moves.map(move => ({ ...move, ppLeft: move.pp }))
});

// Calcular el daño de un ataque
export const resolveAttack = (attacker, defender, move) => {
  if (Math.random() * 100 > move.accuracy) {
    return { amount: 0, effectiveness: 1, critical: false, missed: true };
  }

  const special = move.category === 'special';
  const attack = statAt(special ? attacker.baseStats.specialAttack : attacker.baseStats.attack, attacker.level);
  const defense = statAt(special ? defender.baseStats.specialDefense : defender.baseStats.defense, defender.level);

  const effectiveness = getEffectiveness(move.type, defender.types);
  if (effectiveness === 0) {
    return { amount: 0, effectiveness: 0, critical: false, missed: false };
  }

  // STAB: un 50% más si el ataque es del mismo tipo que el Pokémon
  const stab = attacker.types.includes(move.type) ? 1.5 : 1;
  const critical = Math.random() < 0.0625;
  const variation = 0.85 + Math.random() * 0.15;

  const base = ((2 * attacker.level) / 5 + 2) * move.power * (attack / defense) / 50 + 2;
  const amount = Math.max(1, Math.floor(base * stab * effectiveness * variation * (critical ? 1.5 : 1)));

  return { amount, effectiveness, critical, missed: false };
};

export const usableMoves = (fighter) => fighter.moves.filter(move => move.ppLeft > 0);

// El rival elige el ataque que más daño espera hacer (con algo de azar para que no sea perfecto)
export const chooseEnemyMove = (enemy, target) => {
  const options = usableMoves(enemy);
  if (options.length === 0) return STRUGGLE;
  if (Math.random() < 0.25) return options[Math.floor(Math.random() * options.length)];

  return options.reduce((best, move) => {
    const score = move.power * getEffectiveness(move.type, target.types) * (enemy.types.includes(move.type) ? 1.5 : 1);
    const bestScore = best.power * getEffectiveness(best.type, target.types) * (enemy.types.includes(best.type) ? 1.5 : 1);
    return score > bestScore ? move : best;
  }, options[0]);
};

export const xpReward = (enemy) => Math.round(20 + enemy.level * 12);

// Sumar experiencia y subir de nivel si toca
export const gainXp = (fighter, amount) => {
  let result = { ...fighter, xp: fighter.xp + amount };
  const levelsGained = [];

  while (result.xp >= xpToNextLevel(result.level)) {
    result = {
      ...result,
      xp: result.xp - xpToNextLevel(result.level),
      level: result.level + 1
    };

    const newMaxHp = maxHpAt(result.baseStats.hp, result.level);
    result.hp = Math.min(newMaxHp, result.hp + (newMaxHp - result.maxHp));
    result.maxHp = newMaxHp;
    levelsGained.push(result.level);
  }

  return { fighter: result, levelsGained };
};

// Subir un nivel de golpe (Caramelo Raro)
export const levelUpFighter = (fighter) =>
  gainXp(fighter, Math.max(1, xpToNextLevel(fighter.level) - fighter.xp)).fighter;

// Cuanto más debilitado esté el rival, más fácil es capturarlo
export const catchChance = (target, myLevel = target.level) => {
  const missingHp = 1 - target.hp / target.maxHp;
  // Cuanto más fuerte seas tú frente al salvaje, más fácil es atraparlo
  const levelEdge = Math.max(-0.2, Math.min(0.3, (myLevel - target.level) * 0.03));
  return Math.max(0.05, Math.min(0.95, 0.2 + missingHp * 0.6 + levelEdge));
};
