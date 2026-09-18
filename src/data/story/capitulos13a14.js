// Capítulos 13 y 14: las ruinas del desierto y la montaña helada

export const CAPITULOS_13_A_14 = [
  // --- Capítulo 13: las ruinas del desierto ---
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [27, 28],
    speaker: null,
    requiere: { capturas: 5 },
    text: 'El desierto empieza donde se acaba la carretera. Hace tanto calor que el aire se dobla, y los Sandshrew se esconden bajo la arena en cuanto te oyen.',
    speakerEn: null,
    textEn: 'The desert starts where the road ends. It is so hot the air bends, and the Sandshrew dive under the sand as soon as they hear you.'
  },
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [104],
    speaker: 'Excavadora Rut',
    text: 'Una mujer con sombrero de paja limpia un hueso con un pincel. "Llevo nueve años desenterrando esto. Y hace dos semanas alguien empezó a cavar por la noche, sin permiso."',
    speakerEn: 'Digger Rut',
    textEn: 'A woman in a straw hat is cleaning a bone with a brush. "I have spent nine years digging this up. And two weeks ago somebody started digging at night, without permission."'
  },
  {
    type: 'battle',
    bg: 'ruta',
    trainer: 'Recluta Sombra',
    trainerEn: 'Shadow Grunt',
    speaker: 'Recluta Sombra',
    speakerEn: 'Shadow Grunt',
    text: '"Aquí no hay nada que ver." El uniforme es negro, pero lleva una raya roja nueva en el hombro. "Y menos para un campeón."',
    textEn: '"There is nothing to see here." The uniform is black, but there is a new red stripe on the shoulder. "Least of all for a champion."',
    pokemonId: 105,
    level: 49,
    myPokemonId: 62,
    myLevel: 49
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [377],
    speaker: 'Rut',
    text: 'Debajo de la arena hay una puerta de piedra con tres huecos redondos. "Esto no lo cavó nadie", dice Rut. "Esto estaba aquí antes que el desierto."',
    speakerEn: 'Rut',
    textEn: 'Under the sand there is a stone door with three round holes. "Nobody dug this," says Rut. "This was here before the desert was."'
  },
  {
    type: 'espera',
    bg: 'cueva',
    sprites: [104, 27],
    speaker: 'Rut',
    text: '"De noche aquí abajo se congela y arriba hace un horno. Se duerme y se abre mañana." Enciende un farol y se pone a dibujar la puerta en su cuaderno.',
    speakerEn: 'Rut',
    textEn: '"At night it freezes down here and it is an oven up top. We sleep and we open it tomorrow." She lights a lamp and starts drawing the door in her notebook.'
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [377, 378],
    speaker: null,
    text: 'La puerta se abre sola al amanecer, como si hubiera estado esperando la luz. Dentro, dos figuras de piedra se ponen de pie.',
    speakerEn: null,
    textEn: 'The door opens by itself at dawn, as if it had been waiting for the light. Inside, two stone figures stand up.'
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Guardián de piedra',
    trainerEn: 'Stone guardian',
    speaker: 'Rut',
    speakerEn: 'Rut',
    text: '"¡No es una estatua!" El primer guardián baja de su sitio y la cueva entera tiembla con cada paso.',
    textEn: '"It is not a statue!" The first guardian steps down from its place and the whole cave shakes with every step.',
    pokemonId: 377,
    level: 51,
    myPokemonId: 9,
    myLevel: 51
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Guardián de hielo',
    trainerEn: 'Ice guardian',
    speaker: 'Dani',
    speakerEn: 'Dani',
    text: '"¡Hay otro!" El segundo no hace ruido: solo baja la temperatura hasta que se te ve el aliento.',
    textEn: '"There is another one!" The second makes no noise: it just drops the temperature until you can see your own breath.',
    pokemonId: 378,
    level: 52,
    myPokemonId: 59,
    myLevel: 52,
    medal: '🏜️'
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [377, 378],
    speaker: 'Rut',
    text: 'Los dos guardianes vuelven a sus sitios y se quedan quietos, otra vez de piedra. En el suelo queda un trozo de metal con marcas que no son de aquí.',
    speakerEn: 'Rut',
    textEn: 'Both guardians return to their places and go still, stone again. On the floor there is a piece of metal with markings that are not from around here.'
  },
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [104, 105],
    speaker: 'Rut',
    text: '"Los de negro buscaban esto." Rut guarda el metal en una caja. "Y si buscan esto, el siguiente sitio donde van a cavar es la montaña. Allí hay otra puerta."',
    speakerEn: 'Rut',
    textEn: '"The people in black were after this." Rut puts the metal in a box. "And if they want this, the next place they will dig is the mountain. There is another door up there."'
  },

  // --- Capítulo 14: la montaña helada ---
  {
    type: 'espera',
    bg: 'pueblo',
    sprites: [143],
    speaker: 'Dani',
    text: '"A la montaña no se sube de noche ni de broma." Dani reparte chocolate caliente en el refugio del pueblo. "Mañana, con luz."',
    speakerEn: 'Dani',
    textEn: '"Nobody climbs that mountain at night, not a chance." Dani hands out hot chocolate in the village shelter. "Tomorrow, in daylight."'
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [124, 87],
    speaker: null,
    requiere: { nivel: 28 },
    text: 'La subida se pone blanca a los veinte minutos. Un Dewgong duerme en un charco helado y ni se entera de que pasas.',
    speakerEn: null,
    textEn: 'Twenty minutes up, everything turns white. A Dewgong sleeps in a frozen pool and does not even notice you passing.'
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [225],
    speaker: 'Montañero Teo',
    text: 'Un hombre con barba de hielo te corta el paso. "Arriba hay gente que no sabe andar por la nieve. Han hecho tres agujeros y una avalancha."',
    speakerEn: 'Mountaineer Teo',
    textEn: 'A man with ice in his beard blocks your way. "Up there are people who do not know how to walk in snow. They have made three holes and one avalanche."'
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Montañero Teo',
    trainerEn: 'Mountaineer Teo',
    speaker: 'Teo',
    speakerEn: 'Teo',
    text: '"Antes de dejarte subir quiero ver si tu equipo aguanta el frío. El mío lo lleva haciendo veinte años."',
    textEn: '"Before I let you up I want to see if your team can take the cold. Mine has been doing it for twenty years."',
    pokemonId: 91,
    level: 53,
    myPokemonId: 59,
    myLevel: 53
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [144],
    speaker: 'Teo',
    text: '"Pasa." Señala arriba con el bastón. "Pero sube despacio. Lo que vive en la cumbre no lleva bien las prisas."',
    speakerEn: 'Teo',
    textEn: '"Go on." He points up with his stick. "But climb slowly. What lives at the summit does not deal well with people in a hurry."'
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Científica Sombra',
    trainerEn: 'Shadow Scientist',
    speaker: 'Científica Sombra',
    speakerEn: 'Shadow Scientist',
    text: 'La conoces: la de los túneles del volcán. "Otra vez tú. Esta vez no vengo a estudiar, vengo a llevármelo."',
    textEn: 'You know her: the one from the volcano tunnels. "You again. This time I am not here to study it, I am here to take it."',
    pokemonId: 460,
    level: 54,
    myPokemonId: 6,
    myLevel: 54
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [144],
    speaker: null,
    text: 'La científica se va con la mano rota de frío. Arriba, en la cumbre, algo azul abre los ojos y el viento se para de golpe.',
    speakerEn: null,
    textEn: 'The scientist leaves with her hand numb from the cold. Above, at the summit, something blue opens its eyes and the wind stops all at once.'
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Ave de hielo',
    trainerEn: 'Ice bird',
    speaker: 'Teo',
    speakerEn: 'Teo',
    text: '"Lleva veinte años sin dejarse ver." Teo se quita el gorro. "Y ha bajado por ti. No la decepciones."',
    textEn: '"It has not shown itself for twenty years." Teo takes off his hat. "And it came down for you. Do not disappoint it."',
    pokemonId: 144,
    level: 56,
    myPokemonId: 6,
    myLevel: 56,
    medal: '❄️'
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [144],
    speaker: 'Teo',
    text: 'El ave se posa un segundo a tu lado, te mira como midiéndote, y se va. Donde estaba queda una pluma que no se derrite.',
    speakerEn: 'Teo',
    textEn: 'The bird lands beside you for a second, looks at you as if measuring you, and leaves. Where it stood there is a feather that will not melt.'
  },
  {
    type: 'espera',
    bg: 'cueva',
    sprites: [225, 87],
    speaker: 'Teo',
    text: '"De noche no se baja." Teo enciende fuego dentro del refugio de piedra. Fuera, la nieve tapa las huellas de todo el mundo.',
    speakerEn: 'Teo',
    textEn: '"Nobody goes down at night." Teo lights a fire inside the stone shelter. Outside, the snow covers everybody\'s tracks.'
  }
];
