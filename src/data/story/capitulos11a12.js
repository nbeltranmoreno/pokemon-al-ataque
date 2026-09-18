// Capítulos 11 y 12: la vida del campeón y la isla de la niebla
// Estos capítulos ya traen el texto en inglés dentro de cada escena

export const CAPITULOS_11_A_12 = [
  // --- Capítulo 11: el campeón no descansa ---
  {
    type: 'scene',
    bg: 'liga',
    sprites: [6],
    speaker: 'Liga Pokémon',
    text: 'Una semana después todavía te suena raro que te llamen Campeón. El carnet pesa lo mismo, pero ahora la gente se aparta cuando pasas.',
    speakerEn: 'Pokémon League',
    textEn: 'A week later it still sounds strange to be called Champion. The licence weighs the same, but now people step aside when you walk past.'
  },
  {
    type: 'scene',
    bg: 'pueblo',
    sprites: [25, 4],
    speaker: 'Profesora Robles',
    text: '"Ser campeón no es un premio, es un trabajo." La profesora te pone un mapa nuevo delante. "Hay tres sitios de la región donde están pasando cosas raras."',
    speakerEn: 'Professor Robles',
    textEn: '"Being champion is not a prize, it is a job." The professor puts a new map in front of you. "There are three places in the region where strange things are happening."'
  },
  {
    type: 'scene',
    bg: 'pueblo',
    sprites: [143],
    speaker: 'Profesora Robles',
    text: '"Pero hoy no. Hoy duermes." Señala la ventana: ya es de noche. "Mañana empiezas, y esta vez vas con tu equipo, no con Pokémon prestados."',
    speakerEn: 'Professor Robles',
    textEn: '"But not today. Today you sleep." She points at the window: it is already dark. "You start tomorrow, and this time you go with your own team, not borrowed Pokémon."'
  },
  {
    type: 'espera',
    bg: 'pueblo',
    sprites: [143, 25],
    speaker: 'Tu casa',
    text: 'Tu habitación sigue igual que siempre. Los Pokémon se reparten la cama sin pedir permiso y tú te quedas con un trozo de manta.',
    speakerEn: 'Your house',
    textEn: 'Your room is exactly the same as always. Your Pokémon share the bed without asking and you are left with a corner of the blanket.'
  },
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [22, 17],
    speaker: null,
    text: 'A la salida del pueblo hay cola. Se ha corrido la voz de que el Campeón sale hoy y media región quiere su combate.',
    speakerEn: null,
    textEn: 'There is a queue at the edge of town. Word got out that the Champion is setting off today and half the region wants a battle.'
  },
  {
    type: 'battle',
    bg: 'ruta',
    trainer: 'Retadora Vega',
    trainerEn: 'Challenger Vega',
    speaker: 'Vega',
    speakerEn: 'Vega',
    text: '"Soy la primera de la cola desde las cinco de la mañana. Ni se te ocurra dejarme ganar." Su Pidgeot ya está en el aire.',
    textEn: '"I have been first in this queue since five in the morning. Do not you dare let me win." Her Pidgeot is already in the air.',
    pokemonId: 18,
    level: 46,
    myPokemonId: 6,
    myLevel: 46
  },
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [18],
    speaker: 'Vega',
    text: '"Vale, ya entiendo por qué eres tú el campeón." Se aparta y grita a la cola: "¡El siguiente que no se queje!"',
    speakerEn: 'Vega',
    textEn: '"Fine, now I understand why you are the champion." She steps aside and shouts to the queue: "Next one, and no complaining!"'
  },
  {
    type: 'battle',
    bg: 'ruta',
    trainer: 'Dani',
    trainerEn: 'Dani',
    speaker: 'Dani',
    speakerEn: 'Dani',
    text: '"Yo no hago cola." Dani se cuela con las manos en los bolsillos. "Solo quiero comprobar una cosa."',
    textEn: '"I do not queue." Dani cuts in with his hands in his pockets. "I just want to check something."',
    pokemonId: 3,
    level: 47,
    myPokemonId: 6,
    myLevel: 47
  },
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [3, 6],
    speaker: 'Dani',
    text: '"Comprobado: sigues siendo mejor." Se ríe, y por primera vez no parece que le duela. "Me voy contigo. Alguien tiene que llevarte la mochila."',
    speakerEn: 'Dani',
    textEn: '"Checked: you are still better." He laughs, and for the first time it does not seem to hurt him. "I am coming with you. Somebody has to carry your bag."'
  },
  {
    type: 'scene',
    bg: 'mar',
    sprites: [130],
    speaker: 'Marina',
    requiere: { nivel: 22 },
    text: 'En el puerto, Marina amarra una barca grande. "El primer sitio raro del mapa es una isla que no sale en los mapas. Pero no te llevo si tu equipo no aguanta el viaje."',
    speakerEn: 'Marina',
    textEn: 'At the port, Marina ties up a bigger boat. "The first strange place on the map is an island that is not on any map. But I am not taking you if your team cannot handle the trip."'
  },
  {
    type: 'espera',
    bg: 'mar',
    sprites: [120, 121],
    speaker: 'Marina',
    text: '"Con la marea de ahora no se sale. Duerme aquí, en el barco, y zarpamos con el sol." El agua golpea el casco toda la noche.',
    speakerEn: 'Marina',
    textEn: '"With this tide we cannot leave. Sleep here, on the boat, and we set off with the sun." The water knocks against the hull all night.'
  },

  // --- Capítulo 12: la isla de la niebla ---
  {
    type: 'scene',
    bg: 'mar',
    sprites: [130, 131],
    speaker: null,
    text: 'A media mañana la niebla se cierra de golpe, como una puerta. Marina apaga el motor. "A partir de aquí no se usa el mapa, se usa el oído."',
    speakerEn: null,
    textEn: 'Halfway through the morning the fog closes in all at once, like a door. Marina cuts the engine. "From here on you do not use a map, you use your ears."'
  },
  {
    type: 'scene',
    bg: 'bosque',
    sprites: [92, 93],
    speaker: 'Dani',
    text: 'La isla huele a madera vieja. Entre los árboles hay lucecitas que se mueven solas. "Eso no son luciérnagas", dice Dani, muy bajito.',
    speakerEn: 'Dani',
    textEn: 'The island smells of old wood. Among the trees there are little lights moving on their own. "Those are not fireflies," says Dani, very quietly.'
  },
  {
    type: 'battle',
    bg: 'bosque',
    trainer: 'Médium Lía',
    trainerEn: 'Psychic Lía',
    speaker: 'Lía',
    speakerEn: 'Lía',
    text: 'Una chica sentada en una raíz abre un ojo. "Los de tierra firme siempre llegáis gritando. Mi Gengar os oyó desde el muelle."',
    textEn: 'A girl sitting on a root opens one eye. "You mainlanders always arrive shouting. My Gengar heard you from the pier."',
    pokemonId: 94,
    level: 48,
    myPokemonId: 65,
    myLevel: 48
  },
  {
    type: 'scene',
    bg: 'bosque',
    sprites: [94],
    speaker: 'Lía',
    text: '"Perdona el recibimiento." Se levanta y te hace un gesto. "Si has venido por lo de la cueva, será mejor que lo veas tú mismo."',
    speakerEn: 'Lía',
    textEn: '"Sorry about the welcome." She stands up and waves you on. "If you came about the cave, you had better see it for yourself."'
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [249],
    speaker: 'Lía',
    text: 'Dentro hay dibujos pintados en la roca: un pájaro enorme sobre el mar y, debajo, gente pequeñita ofreciéndole algo. "Lleva aquí más años que el pueblo."',
    speakerEn: 'Lía',
    textEn: 'Inside there are drawings painted on the rock: a huge bird above the sea and, below it, tiny people offering it something. "It has been here longer than the village."'
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Guardián de la isla',
    trainerEn: 'Guardian of the island',
    speaker: 'Lía',
    speakerEn: 'Lía',
    text: '"No es un dibujo. Está aquí y quiere ver quién eres." El aire se llena de agua y algo enorme abre las alas al fondo de la cueva.',
    textEn: '"It is not a drawing. It is here, and it wants to see who you are." The air fills with water and something huge spreads its wings at the back of the cave.',
    pokemonId: 249,
    level: 50,
    myPokemonId: 9,
    myLevel: 50,
    medal: '🌊'
  },
  {
    type: 'scene',
    bg: 'mar',
    sprites: [249],
    speaker: 'Lía',
    text: 'El guardián se va volando sin hacer ruido y deja en el suelo una escama azul. Lía la recoge y te la pone en la mano. "Ahora la isla te conoce."',
    speakerEn: 'Lía',
    textEn: 'The guardian flies off without a sound and leaves a blue scale on the ground. Lía picks it up and puts it in your hand. "Now the island knows you."'
  },
  {
    type: 'espera',
    bg: 'mar',
    sprites: [131],
    speaker: 'Marina',
    text: '"La niebla no deja salir de noche." Marina reparte mantas en la cubierta. Dani se duerme el primero, como siempre.',
    speakerEn: 'Marina',
    textEn: '"The fog will not let us leave at night." Marina hands out blankets on deck. Dani falls asleep first, as always.'
  },
  {
    type: 'scene',
    bg: 'pueblo',
    sprites: [25, 133],
    speaker: null,
    text: 'De vuelta en el pueblo, la escama azul se queda en el laboratorio, dentro de una caja de cristal. La profesora no le quita ojo.',
    speakerEn: null,
    textEn: 'Back in town, the blue scale ends up in the lab, inside a glass case. The professor cannot take her eyes off it.'
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [65],
    speaker: 'Noa',
    text: 'Esa tarde llama Noa desde la torre. "He visto cosas otra vez. Gente de negro en el desierto, cavando de noche. No son los mismos de antes: estos saben lo que buscan."',
    speakerEn: 'Noa',
    textEn: 'That afternoon Noa calls from the tower. "I have been seeing things again. People in black in the desert, digging at night. They are not the same as before: these ones know what they are looking for."'
  }
];
