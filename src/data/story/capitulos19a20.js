// Capítulos 19 y 20: el dragón del cielo y el último día

export const CAPITULOS_19_A_20 = [
  // --- Capítulo 19: el dragón del cielo ---
  {
    type: 'scene',
    bg: 'volcan',
    sprites: [384],
    speaker: 'Iker',
    requiere: { nivel: 40 },
    text: 'Desde la boca del volcán se ve una raya verde cruzando el cielo cada pocas horas, siempre a la misma altura. "Lleva así desde que salió lo de la torre", dice Iker.',
    speakerEn: 'Iker',
    textEn: 'From the mouth of the volcano you can see a green streak crossing the sky every few hours, always at the same height. "It has been doing that since the tower business," says Iker.'
  },
  {
    type: 'scene',
    bg: 'volcan',
    sprites: [6, 149],
    speaker: 'Profesora Robles',
    text: '"Para subir ahí hace falta algo que vuele y no se maree." La profesora mira a tu equipo y luego a ti. "Y hace falta que confíe en ti. Lo primero lo tengo yo; lo segundo, tú."',
    speakerEn: 'Professor Robles',
    textEn: '"To get up there you need something that flies and does not get dizzy." The professor looks at your team, then at you. "And it needs to trust you. I have the first part; you have the second."'
  },
  {
    type: 'battle',
    bg: 'volcan',
    trainer: 'Sombra: Comandante Rex',
    trainerEn: 'Shadow: Commander Rex',
    speaker: 'Rex',
    speakerEn: 'Rex',
    text: 'Rex os corta el paso en la ladera, solo, sin refuerzos. "Si os dejo subir, Nix me borra a mí también. Lo siento, chaval."',
    textEn: 'Rex blocks the slope, alone, with no backup. "If I let you up, Nix erases me too. Sorry, kid."',
    pokemonId: 445,
    level: 66,
    myPokemonId: 149,
    myLevel: 66
  },
  {
    type: 'scene',
    bg: 'volcan',
    sprites: [445],
    speaker: 'Rex',
    text: '"Subid." Rex se aparta y se sienta en una piedra, agotado. "Y cuando lo veáis... no le habléis como le hablo yo. Eso no funciona."',
    speakerEn: 'Rex',
    textEn: '"Go up." Rex steps aside and sits on a rock, exhausted. "And when you see it... do not talk to it the way I do. That does not work."'
  },
  {
    type: 'espera',
    bg: 'volcan',
    sprites: [59, 58],
    speaker: 'Iker',
    text: '"El viento de arriba se calma al amanecer y solo entonces." Iker echa leña al fuego del refugio. "Dormid pegados al calor. Mañana toca volar."',
    speakerEn: 'Iker',
    textEn: '"The wind up there only calms at dawn, and only then." Iker feeds the shelter fire. "Sleep close to the heat. Tomorrow we fly."'
  },
  {
    type: 'battle',
    bg: 'torre',
    trainer: 'El dragón del cielo',
    trainerEn: 'The sky dragon',
    speaker: null,
    speakerEn: null,
    text: 'Arriba del todo no hay suelo: solo nubes y una cosa larga y verde que da vueltas alrededor del globo, midiendo si merecéis estar tan alto.',
    textEn: 'At the very top there is no ground: only clouds and something long and green circling the balloon, judging whether you deserve to be this high.',
    pokemonId: 384,
    level: 68,
    myPokemonId: 149,
    myLevel: 68,
    medal: '🐉'
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [384],
    speaker: 'Profesora Robles',
    text: 'El dragón deja de dar vueltas y se queda quieto a tu lado, enorme, respirando despacio. La profesora susurra: "Creo que acaba de decidir que vas con él".',
    speakerEn: 'Professor Robles',
    textEn: 'The dragon stops circling and holds still beside you, enormous, breathing slowly. The professor whispers: "I think it just decided it is coming with you."'
  },

  // --- Capítulo 20: el último día ---
  {
    type: 'scene',
    bg: 'liga',
    sprites: [384, 150, 249],
    speaker: 'Noa',
    text: 'Esa misma tarde los tres grandes aparecen a la vez sobre la Liga: el del mar, el del cielo y el del laboratorio. No atacan. Esperan, como si supieran algo que vosotros no.',
    speakerEn: 'Noa',
    textEn: 'That same afternoon the three great ones appear over the League at once: the one from the sea, the one from the sky and the one from the lab. They do not attack. They wait, as if they know something you do not.'
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [487],
    speaker: 'Vera',
    text: 'Vera llega corriendo, sin abrigo por primera vez. "Nix ha abierto la última puerta él solo. La de abajo. La que no había que tocar."',
    speakerEn: 'Vera',
    textEn: 'Vera comes running, without her coat for the first time. "Nix opened the last door by himself. The one below. The one nobody was supposed to touch."'
  },
  {
    type: 'espera',
    bg: 'liga',
    sprites: [6, 3, 149],
    speaker: 'Dani',
    text: '"Entramos mañana, todos juntos, con el equipo entero y descansados." Dani reparte las mochilas. "Hoy no discutas conmigo, campeón. Hoy mando yo."',
    speakerEn: 'Dani',
    textEn: '"We go in tomorrow, all together, full teams and rested." Dani hands out the bags. "Do not argue with me today, champion. Today I am in charge."'
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [487],
    speaker: null,
    requiere: { nivel: 45, equipo: 3 },
    text: 'La puerta de abajo no es una puerta: es un agujero en el aire, y al otro lado el suelo está del revés. Al cruzar, el ruido del mundo se apaga.',
    speakerEn: null,
    textEn: 'The door below is not a door: it is a hole in the air, and on the other side the floor is upside down. As you cross, the noise of the world switches off.'
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Sombra: Ingeniera Ada',
    trainerEn: 'Shadow: Engineer Ada',
    speaker: 'Ada',
    speakerEn: 'Ada',
    text: 'Ada está dentro, peleando contra sus propias máquinas. "¡No vengo con él! ¡Vengo a apagarlo! Pero para pasar tienes que ganarme: es la única forma de abrir la compuerta."',
    textEn: 'Ada is inside, fighting her own machines. "I am not with him! I came to shut it down! But to get through you have to beat me: it is the only way the hatch opens."',
    pokemonId: 376,
    level: 68,
    myPokemonId: 448,
    myLevel: 68
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Sombra: Nix',
    trainerEn: 'Shadow: Nix',
    speaker: 'Nix',
    speakerEn: 'Nix',
    text: 'Nix es más joven de lo que esperabas y habla muy bajito. "Un mundo sin Pokémon sería un mundo tranquilo. Vosotros lo llamáis vacío; yo lo llamo descansar."',
    textEn: 'Nix is younger than you expected and speaks very quietly. "A world without Pokémon would be a calm world. You call that empty; I call it rest."',
    pokemonId: 487,
    level: 70,
    myPokemonId: 384,
    myLevel: 70
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [487],
    speaker: 'Nix',
    text: 'Nix se queda mirando a su propio Pokémon, que por primera vez se pone delante de él para protegerlo. Se le rompe algo en la cara. "¿Por qué haces eso? Yo nunca te he cuidado."',
    speakerEn: 'Nix',
    textEn: 'Nix stares at his own Pokémon, which for the first time steps in front of him to protect him. Something breaks in his face. "Why would you do that? I never looked after you."'
  },
  {
    type: 'battle',
    bg: 'liga',
    trainer: 'La puerta',
    trainerEn: 'The door',
    speaker: 'Noa',
    speakerEn: 'Noa',
    text: '"La puerta no se cierra sola: hay que convencerla." Noa te empuja hacia delante. "Y aquí dentro solo te queda uno. Elige bien lo que haces con él."',
    textEn: '"The door will not close by itself: it has to be convinced." Noa pushes you forward. "And in here you only have one left. Choose well what you do with it."',
    pokemonId: 493,
    level: 72,
    myPokemonId: 384,
    myLevel: 72,
    medal: '🌟'
  },
  {
    type: 'scene',
    bg: 'liga',
    sprites: [384, 493],
    speaker: null,
    text: 'El agujero en el aire se cierra como se cierra un ojo: despacio y sin ruido. Cuando salís, es de noche y hay estrellas, y eso de repente parece muchísimo.',
    speakerEn: null,
    textEn: 'The hole in the air closes the way an eye closes: slowly and without a sound. When you come out it is night and there are stars, and that suddenly feels like an enormous amount.'
  },
  {
    type: 'scene',
    bg: 'pueblo',
    sprites: [487],
    speaker: 'Vera',
    text: 'A Nix se lo lleva la Liga. Va andando, sin forcejear, con su Pokémon detrás sin que nadie se lo pida. Vera los mira desde lejos. "Ese es el castigo de verdad: ahora sabe lo que tenía."',
    speakerEn: 'Vera',
    textEn: 'The League takes Nix away. He walks, without struggling, his Pokémon following behind without being asked. Vera watches from a distance. "That is the real punishment: now he knows what he had."'
  },
  {
    type: 'scene',
    bg: 'liga',
    sprites: [6, 3, 149, 384],
    speaker: 'Profesora Robles',
    text: '"Se acabó." La profesora te devuelve el carnet con un sello nuevo. "Y antes de que preguntes: no, no hay otro mapa. Lo que hagas a partir de aquí ya es tuyo."',
    speakerEn: 'Professor Robles',
    textEn: '"It is over." The professor hands your licence back with a new stamp on it. "And before you ask: no, there is no other map. What you do from here is yours."'
  },
  {
    type: 'scene',
    bg: 'pueblo',
    sprites: [25, 1, 4, 7, 133],
    speaker: 'Pueblo Chispa',
    text: 'En el tejado de tu casa ya no cabe todo el mundo. El Pikachu del vecindario se sienta donde siempre, Dani discute con Vega por el sitio y tú te callas y miras el cielo. Mañana también hay día.',
    speakerEn: 'Spark Town',
    textEn: 'There is no longer room on your roof for everyone. The neighbourhood Pikachu sits where it always does, Dani argues with Vega over the spot, and you keep quiet and look at the sky. Tomorrow is another day.'
  }
];
