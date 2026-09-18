// Capítulos 7 y 8: la torre de la Líder Noa y la guarida del Equipo Sombra

export const CAPITULOS_7_A_8 = [
  // --- Capítulo 7: la torre psíquica ---
  {
    type: 'scene',
    bg: 'torre',
    sprites: [92],
    speaker: null,
    text: 'La torre morada se ve desde el volcán. De cerca no tiene escaleras, y un Gastly te abre la puerta flotando, como si te esperara.'
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [93],
    speaker: 'Médium Iris',
    text: '"Noa está arriba. Pero antes tienes que demostrar que no te asustas." Una chica con los ojos cerrados te señala sin mirarte.'
  },
  {
    type: 'battle',
    bg: 'torre',
    trainer: 'Médium Iris',
    speaker: 'Iris',
    text: '"Mi Haunter se ríe cuando gana. Perdona si te molesta." Te deja un Gengar de la torre.',
    pokemonId: 93,
    level: 26,
    myPokemonId: 94,
    myLevel: 27
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [64],
    speaker: 'Iris',
    text: '"Sube en el ascensor sin botones. Piensa en el piso al que quieres ir y él te lleva." Lo dice completamente en serio.'
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [65],
    speaker: 'Noa',
    text: 'Arriba, Noa te habla sin abrir la boca. "Llegas tarde. Te esperaba desde ayer, cuando decidiste venir."'
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
    text: '"Sabía tu ataque, pero no que fueras a aguantar tanto." Te da la medalla. "Y sé por qué has venido de verdad."'
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [150],
    speaker: 'Noa',
    text: '"El Equipo Sombra busca una piedra que hay bajo el volcán. Dicen que vuelve obediente a cualquier Pokémon." Hace una pausa. "Eso no debería existir."'
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [64, 65],
    speaker: 'Noa',
    text: '"Iker y Marina ya van hacia allí. Bruno cierra la cantera. Si vas, vas con ellos." Te abre la puerta del ascensor. "Suerte."'
  },

  // --- Capítulo 8: la guarida bajo el volcán ---
  {
    type: 'scene',
    bg: 'volcan',
    sprites: [58, 59],
    speaker: 'Iker',
    text: 'En la boca del volcán te esperan los tres líderes. "Vaya, el crío ha venido", dice Iker. Marina le da un codazo. "Se llama entrenador."'
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [109],
    speaker: null,
    text: 'Los túneles están llenos de cables y luces rojas. Huele a humo raro, y unos Koffing flotan entre las máquinas como globos perdidos.'
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Recluta Sombra',
    speaker: 'Recluta Sombra',
    text: '"¡Aquí no entra nadie!" Marina te lanza una Poké Ball: "¡Usa mi Starmie, rápido!"',
    pokemonId: 110,
    level: 29,
    myPokemonId: 121,
    myLevel: 30
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [121],
    speaker: 'Marina',
    text: '"Bien hecho." Bruno arranca una puerta de metal con las manos. "Yo abro, vosotros pasáis."'
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [53],
    speaker: 'Científica Sombra',
    text: 'Dentro, una mujer de bata anota datos sin inmutarse. "Interesante. Un niño y tres líderes. La muestra mejora."'
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Científica Sombra',
    speaker: 'Científica Sombra',
    text: '"Veamos cuánto aguanta tu cabeza." Iker te presta su Rapidash.',
    pokemonId: 53,
    level: 31,
    myPokemonId: 78,
    myLevel: 32
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [78],
    speaker: 'Bruno',
    text: '"Ahí está la piedra." En una vitrina brilla algo violeta, y todos los Pokémon de la sala se quedan quietos mirándola a la vez.'
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [130],
    speaker: 'Vera',
    text: '"No la toques." Una mujer de abrigo largo baja las escaleras despacio. "Soy Vera. Llevo diez años buscando esa piedra y no la va a coger un crío."'
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Jefa Vera',
    speaker: 'Vera',
    text: '"Mi Gyarados no obedece por cariño, obedece porque sabe lo que pasa si no." Noa aparece y te presta su Alakazam.',
    pokemonId: 130,
    level: 33,
    myPokemonId: 65,
    myLevel: 34
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [65, 130],
    speaker: 'Vera',
    text: 'El Gyarados cae y, por primera vez, mira a Vera sin miedo. Ella retrocede. "¿Qué le has hecho?" "Nada", dices. "Solo ganarte."'
  },
  {
    type: 'scene',
    bg: 'volcan',
    sprites: [59, 121],
    speaker: 'Noa',
    text: 'La piedra se rompe sola al quedarse sin corriente. Vera escapa por un túnel lateral y nadie la persigue: hay demasiados Pokémon que sacar de ahí.'
  },
  {
    type: 'scene',
    bg: 'pueblo',
    sprites: [43, 44, 109],
    speaker: 'Elsa',
    text: 'Dos días después, el bosque vuelve a estar lleno. Elsa cuenta a los que han regresado y no le salen las cuentas: hay más de los que se llevaron.'
  }
];
