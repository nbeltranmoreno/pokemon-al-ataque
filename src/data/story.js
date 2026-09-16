// Modo historia en forma de cuento: escenas que se van pasando y, de vez en cuando, un combate
// En los combates NO peleas con tu equipo: usas el Pokémon que te presta la historia

export const STORY = [
  {
    type: 'scene',
    bg: 'pueblo',
    sprites: [25],
    text: 'Amanece en Pueblo Chispa. Hoy por fin sales de casa para hacerte entrenador, y un Pikachu curioso te sigue por la calle.'
  },
  {
    type: 'scene',
    bg: 'pueblo',
    sprites: [1, 4, 7],
    text: 'La profesora Robles te espera en el laboratorio: "Elige con cuidado... aunque hoy solo vas a dar un paseo de prueba".'
  },
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [4],
    text: 'Te presta un Charmander para el camino. "Cuídalo bien", te dice. Nada más salir, algo se mueve entre la hierba alta.'
  },
  {
    type: 'battle',
    bg: 'ruta',
    trainer: 'Joven Explorador',
    text: 'Un niño con red de mariposas te corta el paso: "¡Mi Caterpie te va a ganar!"',
    pokemonId: 10,
    level: 3,
    myPokemonId: 4,
    myLevel: 5,
    medal: '🍃'
  },
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [19],
    text: 'El niño se va corriendo. Más adelante, un chico con gorra te espera apoyado en un árbol, con un Rattata a los pies.'
  },
  {
    type: 'battle',
    bg: 'ruta',
    trainer: 'Chico Rata',
    text: '"Yo no pierdo nunca", presume. La profesora te deja su Pikachu para este combate.',
    pokemonId: 19,
    level: 6,
    myPokemonId: 25,
    myLevel: 8,
    medal: '🐭'
  },
  {
    type: 'scene',
    bg: 'bosque',
    sprites: [10, 13],
    text: 'Entras en el Bosque Verde. Entre las ramas se oyen aleteos y, de pronto, una sombra grande pasa por encima de ti.'
  },
  {
    type: 'battle',
    bg: 'bosque',
    trainer: 'Chica del Bosque',
    text: 'Una entrenadora baja de un árbol con su Pidgeotto. Esta vez peleas con un Bulbasaur.',
    pokemonId: 17,
    level: 10,
    myPokemonId: 1,
    myLevel: 12,
    medal: '🌿'
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [74],
    text: 'Al otro lado del bosque se abre una cueva de roca. Dentro, el Líder de Roca entrena golpeando piedras con su Geodude.'
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Líder de Roca',
    text: '"Veamos si sabes elegir." Te presta un Squirtle: el agua puede con la roca.',
    pokemonId: 74,
    level: 14,
    myPokemonId: 7,
    myLevel: 16,
    medal: '🪨'
  },
  {
    type: 'scene',
    bg: 'mar',
    sprites: [120],
    text: 'Sales de la cueva y el mar brilla al sol. En el muelle, la Líder de Agua te saluda con la mano desde su barca.'
  },
  {
    type: 'battle',
    bg: 'mar',
    trainer: 'Líder de Agua',
    text: '"El mar es mi casa." Su Staryu gira como un trompo. Llevas un Pikachu: el rayo manda en el agua.',
    pokemonId: 120,
    level: 18,
    myPokemonId: 25,
    myLevel: 20,
    medal: '💧'
  },
  {
    type: 'scene',
    bg: 'volcan',
    sprites: [59],
    text: 'El camino sube hasta un volcán dormido. Hace un calor horrible y se oye el ladrido de un Arcanine entre el humo.'
  },
  {
    type: 'battle',
    bg: 'volcan',
    trainer: 'Líder de Fuego',
    text: '"Aquí se entrena con fuego de verdad." Peleas con un Blastoise prestado.',
    pokemonId: 59,
    level: 24,
    myPokemonId: 9,
    myLevel: 26,
    medal: '🔥'
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [65],
    text: 'En lo alto de una torre morada te espera la Líder Psíquica, sentada en el aire con los ojos cerrados.'
  },
  {
    type: 'battle',
    bg: 'torre',
    trainer: 'Líder Psíquica',
    text: '"Sé lo que vas a hacer antes que tú." Su Alakazam ya te está mirando. Llevas un Snorlax que aguanta lo que le echen.',
    pokemonId: 65,
    level: 28,
    myPokemonId: 143,
    myLevel: 30,
    medal: '🔮'
  },
  {
    type: 'scene',
    bg: 'liga',
    sprites: [149],
    text: 'Las puertas de la Liga se abren. Al fondo, el Campeón acaricia a su Dragonite. "Te estaba esperando", dice sin girarse.'
  },
  {
    type: 'battle',
    bg: 'liga',
    trainer: 'Campeón',
    text: 'El último combate. La profesora aparece corriendo y te presta su Charizard: "¡Termina lo que empezaste!"',
    pokemonId: 149,
    level: 34,
    myPokemonId: 6,
    myLevel: 36,
    medal: '👑'
  },
  {
    type: 'scene',
    bg: 'liga',
    sprites: [6, 149],
    text: '¡Lo lograste! El Campeón te da la mano y la profesora no para de hacer fotos. Hoy Pueblo Chispa tiene un campeón nuevo: tú.'
  }
];

// Las medallas que se ganan, para pintarlas en la pantalla de la Historia
export const MEDALS = STORY.filter(step => step.type === 'battle').map(step => step.medal);

// Cuántos combates hay ganados según por dónde vaya la historia
export const medalsWon = (stage) =>
  STORY.slice(0, stage).filter(step => step.type === 'battle').length;
