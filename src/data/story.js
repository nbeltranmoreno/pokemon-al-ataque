// Modo historia en forma de novela: escenas con diálogo que se van pasando y, de vez en cuando, un combate
// En los combates NO peleas con tu equipo: usas el Pokémon que te presta la historia

export const STORY = [
  {
    type: 'scene',
    bg: 'pueblo',
    sprites: [25],
    speaker: 'Pueblo Chispa',
    text: 'Seis de la mañana. Llevas la mochila hecha desde anoche y no has pegado ojo. Un Pikachu del vecindario te mira desde el tejado, como diciendo "por fin te vas".'
  },
  {
    type: 'scene',
    bg: 'pueblo',
    sprites: [1, 4, 7],
    speaker: 'Profesora Robles',
    text: '"Antes de darte el carnet quiero ver cómo te apañas. Estos tres son del laboratorio, no tuyos. Te presto uno para el camino y me lo devuelves entero."'
  },
  {
    type: 'scene',
    bg: 'pueblo',
    sprites: [4],
    speaker: 'Profesora Robles',
    text: '"Charmander. Tiene mal genio por las mañanas, como tú." Te ríes por no ponerte nervioso. Fuera se oye una voz que conoces demasiado bien.'
  },
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [1],
    speaker: 'Dani',
    text: '"¿En serio te dan uno a ti?" Dani vive dos casas más abajo y lleva toda la vida ganándote a todo. Su Bulbasaur ya está fuera de la Poké Ball.'
  },
  {
    type: 'battle',
    bg: 'ruta',
    trainer: 'Dani',
    speaker: 'Dani',
    text: '"Un combate. Si gano, te vuelves a casa." No lo dice de broma.',
    pokemonId: 1,
    level: 5,
    myPokemonId: 4,
    myLevel: 5,
    medal: '🌱'
  },
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [4],
    speaker: 'Dani',
    text: '"Suerte de principiante." Recoge a su Bulbasaur y se va sin mirarte. Tu Charmander resopla humo, orgulloso. Tú también, aunque te tiemblan las manos.'
  },
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [10, 13],
    speaker: null,
    text: 'La ruta huele a hierba mojada. Un chico con una red persigue algo entre los matorrales y, sin querer, lo espanta hacia ti.'
  },
  {
    type: 'battle',
    bg: 'ruta',
    trainer: 'Cazabichos Tomás',
    speaker: 'Tomás',
    text: '"¡Ese Weedle es mío! Bueno... si me ganas, para ti." La profesora te deja su Pikachu para este.',
    pokemonId: 13,
    level: 7,
    myPokemonId: 25,
    myLevel: 9,
    medal: '🐛'
  },
  {
    type: 'scene',
    bg: 'bosque',
    sprites: [12],
    speaker: 'Tomás',
    text: '"Los bichos evolucionan rapidísimo, ¿sabes? Cuídate en el bosque." Señala hacia unos árboles tan altos que no se ve el cielo.'
  },
  {
    type: 'scene',
    bg: 'bosque',
    sprites: [25],
    speaker: null,
    text: 'Dentro se hace de noche a mediodía. Te pierdes dos veces, se te acaba el agua y el Pikachu te va marcando el camino con chispitas.'
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [74],
    speaker: 'Bruno',
    text: 'Al salir del bosque hay una cantera. "Aquí entrena quien quiere medalla", dice un hombre enorme mientras parte una roca con la mano. Su Geodude ni se inmuta.'
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Líder Bruno',
    speaker: 'Bruno',
    text: '"Piensa antes de pegar." Te presta un Squirtle: el agua puede con la roca.',
    pokemonId: 74,
    level: 12,
    myPokemonId: 7,
    myLevel: 14,
    medal: '🪨'
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [7],
    speaker: 'Bruno',
    text: '"Has elegido bien el tipo. Eso no es suerte, es cabeza." Te da la medalla y una palmada que casi te tira al suelo.'
  },
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [5],
    speaker: 'Dani',
    text: 'En el cruce te espera Dani, con una medalla más que tú y su Bulbasaur ya evolucionado. "Segundo asalto. Esta vez va en serio."'
  },
  {
    type: 'battle',
    bg: 'ruta',
    trainer: 'Dani',
    speaker: 'Dani',
    text: '"Nada de prestados de principiante." La profesora te pasa un Charmeleon por videollamada.',
    pokemonId: 2,
    level: 16,
    myPokemonId: 5,
    myLevel: 16,
    medal: '🔥'
  },
  {
    type: 'scene',
    bg: 'mar',
    sprites: [5],
    speaker: 'Dani',
    text: '"Vale. Igual sí sabes lo que haces." Es lo más parecido a un cumplido que le has oído nunca. Se va hacia el puerto antes de que puedas responder.'
  },
  {
    type: 'scene',
    bg: 'mar',
    sprites: [120],
    speaker: 'Marina',
    text: 'El puerto huele a sal y a gasolina. La líder Marina repara su barca con un Staryu girando a su lado. "¿Vienes a por la medalla o a mirar?"'
  },
  {
    type: 'battle',
    bg: 'mar',
    trainer: 'Líder Marina',
    speaker: 'Marina',
    text: '"En el agua mando yo. Fuera del agua... también." Llevas el Pikachu: el rayo manda en el mar.',
    pokemonId: 120,
    level: 19,
    myPokemonId: 25,
    myLevel: 21,
    medal: '💧'
  },
  {
    type: 'scene',
    bg: 'volcan',
    sprites: [59],
    speaker: null,
    text: 'El camino sube hasta un volcán dormido. Hace tanto calor que el aire tiembla, y se oye un ladrido enorme entre el humo.'
  },
  {
    type: 'battle',
    bg: 'volcan',
    trainer: 'Líder Iker',
    speaker: 'Iker',
    text: '"Mi Arcanine no ha perdido nunca en casa." Te prestan un Blastoise. Pesa más que tú.',
    pokemonId: 59,
    level: 24,
    myPokemonId: 9,
    myLevel: 26,
    medal: '🔥'
  },
  {
    type: 'scene',
    bg: 'volcan',
    sprites: [9],
    speaker: 'Iker',
    text: '"Ya no pierde nunca en casa... menos hoy." Se ríe, te da la medalla y te avisa: "La siguiente es rara. No te fíes de lo que veas."'
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [65],
    speaker: 'Noa',
    text: 'En la torre no hay escaleras: hay un ascensor sin botones que sube solo. Arriba, Noa te habla sin abrir la boca. "Llegas tarde. Te esperaba desde ayer."'
  },
  {
    type: 'battle',
    bg: 'torre',
    trainer: 'Líder Noa',
    speaker: 'Noa',
    text: '"Sé qué ataque vas a elegir." Te prestan un Snorlax, que aguanta lo que le echen.',
    pokemonId: 65,
    level: 28,
    myPokemonId: 143,
    myLevel: 30,
    medal: '🔮'
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [143],
    speaker: 'Noa',
    text: '"Sabía tu ataque, pero no que fueras a aguantar tanto." Te da la medalla. "En la Liga te espera alguien que te conoce mejor que yo."'
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
    level: 32,
    myPokemonId: 6,
    myLevel: 33,
    medal: '⚡'
  },
  {
    type: 'scene',
    bg: 'liga',
    sprites: [3, 6],
    speaker: 'Dani',
    text: 'Se queda un rato mirando el suelo. Luego te tiende la mano. "Gánale al Campeón. Si pierdes, me obligas a volver a entrenar y estoy muy cansado."'
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
    level: 36,
    myPokemonId: 6,
    myLevel: 38,
    medal: '👑'
  },
  {
    type: 'scene',
    bg: 'liga',
    sprites: [6, 149],
    speaker: 'Profesora Robles',
    text: '"Te dije que me lo devolvieras entero." Sonríe y te pone el carnet en la mano. Fuera, medio Pueblo Chispa ha venido a verte. Dani, el primero.'
  }
];

// Las medallas que se ganan, para pintarlas en la pantalla de la Historia
export const MEDALS = STORY.filter(step => step.type === 'battle').map(step => step.medal);

// Cuántos combates hay ganados según por dónde vaya la historia
export const medalsWon = (stage) =>
  STORY.slice(0, stage).filter(step => step.type === 'battle').length;
