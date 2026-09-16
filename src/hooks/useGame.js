import { useState } from 'react';
import { healFighter } from '../game/battle';

const SAVE_KEY = 'pokemonAlAtaque_partida_v1';
const MAX_TEAM = 6;
const MAX_BALLS = 20;

const emptySave = {
  team: [],
  box: [],
  wins: 0,
  losses: 0,
  balls: 10
};

const readSave = () => {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? { ...emptySave, ...JSON.parse(raw) } : emptySave;
  } catch {
    return emptySave;
  }
};

/**
 * Estado de la partida (equipo, capturados, victorias y Poké Balls)
 * Se guarda en el navegador, así que la partida sigue al volver
 */
export const useGame = () => {
  const [save, setSave] = useState(readSave);

  const update = (changes) => {
    setSave(prev => {
      const next = typeof changes === 'function' ? changes(prev) : { ...prev, ...changes };
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(next));
      } catch {
        // Si el navegador no deja guardar, al menos se juega esta sesión
      }
      return next;
    });
  };

  const startWithTeam = (team) => update({ ...emptySave, team });

  // Guardar el resultado de un combate: equipo (vida y experiencia), capturas y marcador
  const finishBattle = ({ team, result, caught, ballsUsed = 0 }) => {
    update(prev => {
      const next = {
        ...prev,
        team,
        balls: Math.max(0, prev.balls - ballsUsed),
        wins: prev.wins + (result === 'win' || result === 'caught' ? 1 : 0),
        losses: prev.losses + (result === 'lose' ? 1 : 0)
      };

      if (result === 'win' || result === 'caught') {
        next.balls = Math.min(MAX_BALLS, next.balls + 1);
      }

      if (caught) {
        if (next.team.length < MAX_TEAM) {
          next.team = [...next.team, caught];
        } else {
          next.box = [...next.box, caught];
        }
      }

      return next;
    });
  };

  const healTeam = () => update(prev => ({ ...prev, team: prev.team.map(healFighter) }));

  // Intercambiar un Pokémon del equipo por otro de la caja
  const swapWithBox = (teamUid, boxUid) => {
    update(prev => {
      const fromTeam = prev.team.find(p => p.uid === teamUid);
      const fromBox = prev.box.find(p => p.uid === boxUid);
      if (!fromTeam || !fromBox) return prev;

      return {
        ...prev,
        team: prev.team.map(p => (p.uid === teamUid ? fromBox : p)),
        box: prev.box.map(p => (p.uid === boxUid ? fromTeam : p))
      };
    });
  };

  const resetGame = () => update(emptySave);

  return { save, startWithTeam, finishBattle, healTeam, swapWithBox, resetGame };
};
