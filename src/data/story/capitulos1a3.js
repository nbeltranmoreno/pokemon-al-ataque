// Capítulos 1 a 3: la salida de Pueblo Chispa, la ruta y el bosque, y la cantera del Líder Bruno

export const CAPITULOS_1_A_3 = [
  // --- Capítulo 1: Pueblo Chispa ---
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
    myLevel: 5
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
    sprites: [16],
    speaker: null,
    text: 'La ruta huele a hierba mojada. Los Pidgey salen disparados a tu paso y, por primera vez, nadie te dice por dónde tienes que ir.'
  },

  // --- Capítulo 2: la ruta y el Bosque Verde ---
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [10, 13],
    speaker: 'Tomás',
    text: 'Un chico con una red persigue algo entre los matorrales y, sin querer, lo espanta hacia ti. "¡Eh, cuidado, que ese es mío!"'
  },
  {
    type: 'battle',
    bg: 'ruta',
    trainer: 'Cazabichos Tomás',
    speaker: 'Tomás',
    text: '"Bueno... si me ganas, para ti." La profesora te deja su Pikachu para este.',
    pokemonId: 13,
    level: 7,
    myPokemonId: 25,
    myLevel: 9
  },
  {
    type: 'scene',
    bg: 'bosque',
    sprites: [12],
    speaker: 'Tomás',
    text: '"Los bichos evolucionan rapidísimo, ¿sabes? Cuídate en el bosque: dentro se hace de noche a mediodía."'
  },
  {
    type: 'scene',
    bg: 'bosque',
    sprites: [25],
    speaker: null,
    text: 'Te pierdes dos veces. Se te acaba el agua. El Pikachu te va marcando el camino con chispitas cada vez que dudas.'
  },
  {
    type: 'scene',
    bg: 'bosque',
    sprites: [11],
    speaker: 'Voz entre los árboles',
    text: '"No te muevas." Una chica con linterna te frena en seco: a un paso de tu bota hay un Metapod dormido en mitad del sendero.'
  },
  {
    type: 'scene',
    bg: 'bosque',
    sprites: [63],
    speaker: 'Guardabosques Elsa',
    text: '"Soy Elsa, cuido el bosque. Llevo tres días viendo gente rara con uniforme negro cavando cerca del río."'
  },
  {
    type: 'battle',
    bg: 'bosque',
    trainer: 'Guardabosques Elsa',
    speaker: 'Elsa',
    text: '"Antes de contarte más, quiero ver si aguantas un combate. Toma, usa mi Abra."',
    pokemonId: 63,
    level: 10,
    myPokemonId: 63,
    myLevel: 11
  },
  {
    type: 'scene',
    bg: 'bosque',
    sprites: [41],
    speaker: 'Elsa',
    text: '"Sirves." Señala una cueva tapada con ramas. "Por ahí se sale a la cantera. Ve con ojo: hoy los Zubat están nerviosos."'
  },

  // --- Capítulo 3: la cantera del Líder Bruno ---
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [41, 74],
    speaker: null,
    text: 'Dentro huele a piedra mojada. Los Zubat pasan rozándote el pelo y un Geodude rueda delante de ti como si te enseñara el camino.'
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [95],
    speaker: 'Minero Paco',
    text: '"¡Alto!" Un minero con casco te corta el paso. "Aquí abajo no entra cualquiera. Si quieres pasar, se pasa ganando."'
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Minero Paco',
    speaker: 'Paco',
    text: '"Mi Onix lleva veinte años conmigo." Te deja un Squirtle de la cantera para que sea justo.',
    pokemonId: 95,
    level: 12,
    myPokemonId: 7,
    myLevel: 13
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [74],
    speaker: 'Bruno',
    text: 'Al fondo, un hombre enorme parte una roca con la mano. "Te he oído desde aquí. Soy Bruno, el líder. ¿Vienes a por la medalla?"'
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Líder Bruno',
    speaker: 'Bruno',
    text: '"Piensa antes de pegar." Te presta un Squirtle: el agua puede con la roca.',
    pokemonId: 74,
    level: 14,
    myPokemonId: 7,
    myLevel: 15,
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
    bg: 'cueva',
    sprites: [95],
    speaker: 'Bruno',
    text: '"Una cosa más. Hay gente de negro comprando piedras raras a precio de oro. Dicen que son del Equipo Sombra. No te acerques."'
  }
];
