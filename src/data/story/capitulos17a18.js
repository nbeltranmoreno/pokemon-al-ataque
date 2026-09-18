// Capítulos 17 y 18: el laboratorio del cielo y el mar profundo

export const CAPITULOS_17_A_18 = [
  // --- Capítulo 17: el laboratorio del cielo ---
  {
    type: 'scene',
    bg: 'torre',
    sprites: [150],
    speaker: 'Noa',
    requiere: { nivel: 36 },
    text: 'Los tres trozos juntos dibujan una torre que no está en ningún mapa: flota sobre las nubes, al norte, justo donde los aviones dan la vuelta sin saber por qué.',
    speakerEn: 'Noa',
    textEn: 'The three pieces together draw a tower that is on no map: it floats above the clouds, to the north, exactly where planes turn back without knowing why.'
  },
  {
    type: 'espera',
    bg: 'pueblo',
    sprites: [143, 6],
    speaker: 'Profesora Robles',
    text: '"Arriba no hay aire para correr, así que dormid." La profesora revisa las mochilas una por una. "Mañana os subo yo con el globo del laboratorio."',
    speakerEn: 'Professor Robles',
    textEn: '"There is no air to run up there, so sleep." The professor checks every bag one by one. "Tomorrow I will take you up in the lab balloon."'
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [82, 81],
    speaker: null,
    text: 'La torre del cielo no tiene puerta: tiene un pasillo de máquinas que se enciende cuando pisas. Los Magneton flotan en fila, como cámaras que te siguen.',
    speakerEn: null,
    textEn: 'The sky tower has no door: it has a corridor of machines that lights up when you step on it. The Magneton float in a line, like cameras following you.'
  },
  {
    type: 'battle',
    bg: 'torre',
    trainer: 'Sombra: Ingeniera Ada',
    trainerEn: 'Shadow: Engineer Ada',
    speaker: 'Ada',
    speakerEn: 'Ada',
    text: '"Esta torre la levanté yo en cuatro meses." Una mujer joven con gafas de soldar ni levanta la vista. "No voy a dejar que la pises con esas botas."',
    textEn: '"I built this tower in four months." A young woman in welding goggles does not even look up. "I am not letting you walk on it in those boots."',
    pokemonId: 376,
    level: 62,
    myPokemonId: 448,
    myLevel: 62
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [150],
    speaker: 'Ada',
    text: '"No lo entiendes." Ada se quita las gafas. "Ahí dentro no hay un arma. Hay algo que hicimos nosotros y que ya no sabemos apagar."',
    speakerEn: 'Ada',
    textEn: '"You do not understand." Ada takes off the goggles. "There is no weapon in there. There is something we made and no longer know how to switch off."'
  },
  {
    type: 'battle',
    bg: 'torre',
    trainer: 'Arma 01',
    trainerEn: 'Weapon 01',
    speaker: 'Noa',
    speakerEn: 'Noa',
    text: 'Detrás del cristal hay algo que no se mueve y aun así te llena la cabeza de ruido. "No le hables", dice Noa. "Solo aguanta."',
    textEn: 'Behind the glass there is something that does not move and still fills your head with noise. "Do not talk to it," says Noa. "Just hold on."',
    pokemonId: 150,
    level: 64,
    myPokemonId: 65,
    myLevel: 64,
    medal: '🧬'
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [150],
    speaker: null,
    text: 'El ruido para de golpe. Lo que había detrás del cristal te mira un segundo, elige una ventana y se va volando hacia el norte sin romper nada.',
    speakerEn: null,
    textEn: 'The noise stops all at once. Whatever was behind the glass looks at you for a second, picks a window and flies north without breaking anything.'
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [82],
    speaker: 'Ada',
    text: '"Se ha ido." Ada se sienta en el suelo, aliviada. "Nix va a decir que fue culpa mía. Y esta vez no pienso callarme: la última puerta está en el mar."',
    speakerEn: 'Ada',
    textEn: '"It is gone." Ada sits down on the floor, relieved. "Nix will say it was my fault. And this time I am not keeping quiet: the last door is in the sea."'
  },

  // --- Capítulo 18: el mar profundo ---
  {
    type: 'espera',
    bg: 'mar',
    sprites: [130, 131],
    speaker: 'Marina',
    text: '"Para bajar al fondo hace falta marea baja y luz de la mañana." Marina prepara el barco de noche, sola, canturreando. "Dormid vosotros, que mañana os toca nadar."',
    speakerEn: 'Marina',
    textEn: '"To go down to the bottom you need low tide and morning light." Marina gets the boat ready at night, alone, humming. "You lot sleep, tomorrow you are the ones swimming."'
  },
  {
    type: 'scene',
    bg: 'mar',
    sprites: [131, 121],
    speaker: null,
    requiere: { capturas: 8 },
    text: 'El mar está tan quieto que da miedo. Diez metros abajo se ve una escalera de piedra que baja y baja hasta donde el agua se vuelve negra.',
    speakerEn: null,
    textEn: 'The sea is so still it is frightening. Ten metres down you can see a stone staircase going down and down until the water turns black.'
  },
  {
    type: 'battle',
    bg: 'mar',
    trainer: 'Sombra: Buzo Kai',
    trainerEn: 'Shadow: Diver Kai',
    speaker: 'Kai',
    speakerEn: 'Kai',
    text: 'Un buzo os espera sentado en el último escalón, como si llevara horas. "Nix dijo que vendríais. Dijo hasta el orden en que bajaríais."',
    textEn: 'A diver waits sitting on the last step, as if he had been there for hours. "Nix said you would come. He even said the order you would come down in."',
    pokemonId: 130,
    level: 63,
    myPokemonId: 9,
    myLevel: 63
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [382],
    speaker: 'Marina',
    text: 'Al final de la escalera hay una sala seca en mitad del mar, con el agua parada en las paredes como si fuera un cristal. En el centro duerme algo del tamaño de una casa.',
    speakerEn: 'Marina',
    textEn: 'At the end of the staircase there is a dry room in the middle of the sea, the water held in the walls like glass. Something the size of a house sleeps in the centre.'
  },
  {
    type: 'battle',
    bg: 'mar',
    trainer: 'El del fondo',
    trainerEn: 'The one below',
    speaker: 'Marina',
    speakerEn: 'Marina',
    text: '"Se ha despertado por el ruido de arriba, no por nosotros." Marina retrocede. "Cálmalo tú. A mí no me va a escuchar."',
    textEn: '"It woke up because of the noise from above, not because of us." Marina backs away. "You calm it down. It is not going to listen to me."',
    pokemonId: 382,
    level: 65,
    myPokemonId: 9,
    myLevel: 65,
    medal: '🌀'
  },
  {
    type: 'scene',
    bg: 'mar',
    sprites: [382],
    speaker: null,
    text: 'El agua de las paredes vuelve a su sitio despacio, sin romper nada. Cuando salís a la superficie, el mar está otra vez liso y las gaviotas han vuelto.',
    speakerEn: null,
    textEn: 'The water in the walls settles back slowly, breaking nothing. When you surface, the sea is smooth again and the gulls have come back.'
  },
  {
    type: 'scene',
    bg: 'pueblo',
    sprites: [25, 133, 143],
    speaker: 'Dani',
    text: 'En el pueblo os reciben con toallas y sopa. Dani mira el mapa del laboratorio y frunce el ceño. "Solo queda un sitio donde no hemos mirado. Y está arriba del todo."',
    speakerEn: 'Dani',
    textEn: 'Back in town they meet you with towels and soup. Dani looks at the lab map and frowns. "There is only one place we have not looked. And it is right at the top."'
  },
  {
    type: 'espera',
    bg: 'pueblo',
    sprites: [143, 25],
    speaker: 'Profesora Robles',
    text: '"Mañana." La profesora apaga la luz del laboratorio. "Llevas tres semanas sin parar y lo que viene no se hace con sueño."',
    speakerEn: 'Professor Robles',
    textEn: '"Tomorrow." The professor turns off the lab light. "You have not stopped for three weeks and what comes next cannot be done half asleep."'
  }
];
