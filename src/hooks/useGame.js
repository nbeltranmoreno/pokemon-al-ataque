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
  balls: 10,
  storyStage: 0,
  tutorialSeen: false
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
 * Estado de la partida (equipo, capturados, victorias, Poké Balls y progreso de la historia)
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

  // Al elegir equipo se conserva si ya vio el tutorial
  const startWithTeam = (team) => update(prev => ({ ...emptySave, tutorialSeen: prev.tutorialSeen, team }));

  // Guardar el resultado de un combate: equipo (vida y experiencia), capturas, marcador e historia
  const finishBattle = ({ team, result, caught, ballsUsed = 0, story = false }) => {
    update(prev => {
      const won = result === 'win' || result === 'caught';
      const next = {
        ...prev,
        team,
        balls: Math.max(0, prev.balls - ballsUsed),
        wins: prev.wins + (won ? 1 : 0),
        losses: prev.losses + (result === 'lose' ? 1 : 0)
      };

      if (won) {
        next.balls = Math.min(MAX_BALLS, next.balls + 1);
      }

      // En la historia solo se avanza al ganar el combate del entrenador
      if (story && result === 'win') {
        next.storyStage = prev.storyStage + 1;
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

  const markTutorialSeen = () => update({ tutorialSeen: true });

  const resetGame = () => update({ ...emptySave, tutorialSeen: true });

  return { save, startWithTeam, finishBattle, healTeam, swapWithBox, markTutorialSeen, resetGame };
};
