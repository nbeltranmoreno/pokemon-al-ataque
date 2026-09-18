// Capítulos 9 y 10: el camino a la Liga, el último duelo con Dani, el Alto Mando y el Campeón

export const CAPITULOS_9_A_10 = [
  // --- Capítulo 9: camino a la Liga ---
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [16, 17],
    speaker: 'Profesora Robles',
    text: '"Tienes cuatro medallas y media región contándolo por ahí." La profesora te mira por videollamada. "Con eso ya puedes entrar en la Liga."'
  },
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [22],
    speaker: 'Entrenadora Lucía',
    text: 'En la subida hay cola de entrenadores esperando. Una chica con un Fearow al hombro se pone la última. "Yo llevo tres años intentándolo."'
  },
  {
    type: 'battle',
    bg: 'ruta',
    trainer: 'Entrenadora Lucía',
    speaker: 'Lucía',
    text: '"Si me ganas, me creo que este año entra alguien nuevo." La profesora te presta un Charizard joven.',
    pokemonId: 22,
    level: 34,
    myPokemonId: 6,
    myLevel: 35
  },
  {
    type: 'scene',
    bg: 'liga',
    sprites: [3],
    speaker: 'Dani',
    text: 'En la puerta de la Liga está Dani, con ojeras y su Venusaur al lado. "He entrenado cada día desde que me ganaste. Hoy no hay tercera oportunidad."'
  },
  {
    type: 'battle',
    bg: 'liga',
    trainer: 'Dani',
    speaker: 'Dani',
    text: '"Vamos con todo." La profesora te presta su Charizard: "Cuídamelo".',
    pokemonId: 3,
    level: 36,
    myPokemonId: 6,
    myLevel: 37,
    medal: '⚡'
  },
  {
    type: 'scene',
    bg: 'liga',
    sprites: [3, 6],
    speaker: 'Dani',
    text: 'Se queda un rato mirando el suelo. Luego te tiende la mano. "Gánale al Campeón. Si pierdes, me obligas a volver a entrenar y estoy muy cansado."'
  },

  // --- Capítulo 10: el Alto Mando y el Campeón ---
  {
    type: 'scene',
    bg: 'liga',
    sprites: [95, 68],
    speaker: 'Recepcionista',
    text: '"Cuatro combates seguidos, sin salir a curar, sin cambiar de equipo." Te sella el carnet. "Los Pokémon te los presta la Liga. Suerte."'
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Alto Mando Rita',
    speaker: 'Rita',
    text: '"Primera sala: roca." Su Golem ocupa media habitación. Te dan un Poliwrath.',
    pokemonId: 76,
    level: 38,
    myPokemonId: 62,
    myLevel: 39
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [62],
    speaker: 'Rita',
    text: '"Pasa. Y bebe agua, que la siguiente sala está a cuarenta grados." No parece que esté bromeando.'
  },
  {
    type: 'battle',
    bg: 'volcan',
    trainer: 'Alto Mando Hugo',
    speaker: 'Hugo',
    text: '"Segunda sala: fuego." El Magmar de Hugo enciende las antorchas al entrar. Te dan un Blastoise.',
    pokemonId: 126,
    level: 39,
    myPokemonId: 9,
    myLevel: 40
  },
  {
    type: 'battle',
    bg: 'mar',
    trainer: 'Alto Mando Sira',
    speaker: 'Sira',
    text: '"Tercera sala: agua. Y sí, la sala está inundada a propósito." Te dan un Jolteon.',
    pokemonId: 131,
    level: 40,
    myPokemonId: 135,
    myLevel: 41
  },
  {
    type: 'battle',
    bg: 'torre',
    trainer: 'Alto Mando Ciro',
    speaker: 'Ciro',
    text: '"Cuarta sala: fantasmas. Mucha gente se rinde aquí." Su Gengar ya te está esperando dentro de tu sombra. Te dan un Alakazam.',
    pokemonId: 94,
    level: 41,
    myPokemonId: 65,
    myLevel: 42
  },
  {
    type: 'scene',
    bg: 'liga',
    sprites: [149],
    speaker: 'Campeón Álex',
    text: 'La sala del Campeón está en silencio. Álex acaricia a su Dragonite sin girarse. "Vi tu combate contra Noa. Aguantaste cuando tocaba. Eso no se entrena."'
  },
  {
    type: 'battle',
    bg: 'liga',
    trainer: 'Campeón Álex',
    speaker: 'Álex',
    text: '"Enséñame por qué has llegado hasta aquí."',
    pokemonId: 149,
    level: 43,
    myPokemonId: 6,
    myLevel: 45,
    medal: '👑'
  },
  {
    type: 'scene',
    bg: 'liga',
    sprites: [6, 149],
    speaker: 'Profesora Robles',
    text: '"Te dije que me lo devolvieras entero." Sonríe y te pone el carnet en la mano. Fuera, medio Pueblo Chispa ha venido a verte. Dani, el primero.'
  },
  {
    type: 'scene',
    bg: 'pueblo',
    sprites: [25, 1, 4, 7],
    speaker: 'Pueblo Chispa',
    text: 'Esa noche, en el tejado de tu casa, el Pikachu del vecindario se sienta a tu lado. Mañana hay que empezar a entrenar a tu propio equipo.'
  }
];
