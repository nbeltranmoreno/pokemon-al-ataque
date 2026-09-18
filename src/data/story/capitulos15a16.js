// Capítulos 15 y 16: el torneo de los ocho y la vuelta del Equipo Sombra

export const CAPITULOS_15_A_16 = [
  // --- Capítulo 15: el torneo de los ocho ---
  {
    type: 'scene',
    bg: 'liga',
    sprites: [6, 3],
    speaker: 'Liga Pokémon',
    text: 'La Liga convoca un torneo de ocho entrenadores para elegir quién investiga lo del desierto. El campeón entra directo... pero tiene que ganárselo igual.',
    speakerEn: 'Pokémon League',
    textEn: 'The League calls a tournament of eight trainers to choose who investigates the desert business. The champion goes straight in... but still has to earn it.'
  },
  {
    type: 'espera',
    bg: 'liga',
    sprites: [143],
    speaker: 'Recepcionista',
    text: '"El torneo empieza mañana a las nueve." Te da una llave de habitación. "Duerme aquí. Y no te quedes jugando hasta tarde, que te conozco."',
    speakerEn: 'Receptionist',
    textEn: '"The tournament starts tomorrow at nine." She hands you a room key. "Sleep here. And do not stay up playing all night, I know you."'
  },
  {
    type: 'battle',
    bg: 'liga',
    trainer: 'Cuartos: Vega',
    trainerEn: 'Quarter-final: Vega',
    speaker: 'Vega',
    speakerEn: 'Vega',
    text: '"Esta vez no hay cola ni excusas." Vega sonríe de medio lado. "Y he entrenado desde aquel día en la ruta."',
    textEn: '"No queue and no excuses this time." Vega grins sideways. "And I have trained since that day on the route."',
    pokemonId: 18,
    level: 55,
    myPokemonId: 6,
    myLevel: 55
  },
  {
    type: 'battle',
    bg: 'liga',
    trainer: 'Semifinal: Iris',
    trainerEn: 'Semi-final: Iris',
    speaker: 'Iris',
    speakerEn: 'Iris',
    text: 'La médium de la torre morada abre los ojos por primera vez. "Quería ver tu cara cuando pierdas. Por eso los abro hoy."',
    textEn: 'The psychic from the purple tower opens her eyes for the first time. "I wanted to see your face when you lose. That is why I opened them today."',
    pokemonId: 94,
    level: 57,
    myPokemonId: 143,
    myLevel: 57
  },
  {
    type: 'scene',
    bg: 'liga',
    sprites: [3],
    speaker: 'Dani',
    text: 'En la otra semifinal Dani gana en dos minutos y ni celebra. Te busca con la mirada desde la pista. Ya sabíais los dos cómo iba a acabar esto.',
    speakerEn: 'Dani',
    textEn: 'In the other semi-final Dani wins in two minutes and does not even celebrate. He looks for you from the court. You both already knew how this would end.'
  },
  {
    type: 'battle',
    bg: 'liga',
    trainer: 'Final: Dani',
    trainerEn: 'Final: Dani',
    speaker: 'Dani',
    speakerEn: 'Dani',
    text: '"Desde los seis años quería esta final." Suelta a su Venusaur. "No me la quites en tres turnos, por favor."',
    textEn: '"I have wanted this final since I was six." He sends out his Venusaur. "Do not take it from me in three turns, please."',
    pokemonId: 3,
    level: 59,
    myPokemonId: 6,
    myLevel: 59,
    medal: '🏆'
  },
  {
    type: 'scene',
    bg: 'liga',
    sprites: [3, 6],
    speaker: 'Dani',
    text: 'Duró veinte turnos. Cuando acaba, Dani levanta tu brazo él mismo delante de todo el estadio. "Que quede claro que perdí contra el mejor."',
    speakerEn: 'Dani',
    textEn: 'It lasted twenty turns. When it ends, Dani lifts your arm himself in front of the whole stadium. "Let it be clear I lost to the best."'
  },
  {
    type: 'espera',
    bg: 'liga',
    sprites: [6, 3, 143],
    speaker: null,
    text: 'Esa noche hay fiesta en la Liga. Se come demasiado, se duerme poco y nadie habla del desierto. Mañana sí.',
    speakerEn: null,
    textEn: 'That night there is a party at the League. Everyone eats too much, sleeps little, and nobody mentions the desert. Tomorrow they will.'
  },

  // --- Capítulo 16: la sombra vuelve ---
  {
    type: 'scene',
    bg: 'torre',
    sprites: [65, 64],
    speaker: 'Noa',
    requiere: { nivel: 32 },
    text: 'Noa extiende sobre la mesa el metal del desierto y la escama de la isla. Encajan. "Son dos trozos de lo mismo. Y falta uno."',
    speakerEn: 'Noa',
    textEn: 'Noa lays the desert metal and the island scale on the table. They fit together. "They are two pieces of the same thing. And one is missing."'
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [130],
    speaker: 'Vera',
    text: 'La puerta de la torre se abre sola. Vera entra sin prisa, con el abrigo largo mojado de lluvia. "El tercero lo tengo yo."',
    speakerEn: 'Vera',
    textEn: 'The tower door opens on its own. Vera walks in without hurrying, her long coat wet with rain. "I have the third one."'
  },
  {
    type: 'battle',
    bg: 'torre',
    trainer: 'Vera',
    trainerEn: 'Vera',
    speaker: 'Vera',
    speakerEn: 'Vera',
    text: '"No vengo a hablar contigo, vengo a comprobar si sigues siendo un problema." Su Gyarados es el mismo, pero ahora la mira antes de atacar.',
    textEn: '"I am not here to talk to you, I am here to check whether you are still a problem." Her Gyarados is the same one, but now it looks at her before attacking.',
    pokemonId: 130,
    level: 60,
    myPokemonId: 65,
    myLevel: 60
  },
  {
    type: 'scene',
    bg: 'torre',
    sprites: [130],
    speaker: 'Vera',
    text: '"Sigues siéndolo." Y entonces hace algo que nadie espera: deja el tercer trozo sobre la mesa. "No lo hago por vosotros. Lo hago porque el que manda ahora me da más miedo que tú."',
    speakerEn: 'Vera',
    textEn: '"You still are." And then she does something nobody expects: she puts the third piece on the table. "I am not doing this for you. I am doing it because whoever is in charge now scares me more than you do."'
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [109, 110],
    speaker: 'Vera',
    text: '"Se llama Nix. Cogió el Equipo Sombra cuando yo escapé y lo convirtió en otra cosa." Baja los ojos. "Ellos no quieren obedecer a los Pokémon. Quieren borrarlos y empezar otra vez."',
    speakerEn: 'Vera',
    textEn: '"His name is Nix. He took Team Shadow when I escaped and turned it into something else." She looks down. "They do not want Pokémon to obey. They want to erase them and start again."'
  },
  {
    type: 'espera',
    bg: 'torre',
    sprites: [64, 65],
    speaker: 'Noa',
    text: '"Mañana sabremos dónde está la puerta." Noa junta los tres trozos y se sienta delante, sin moverse. "Esto tarda toda la noche en hablar."',
    speakerEn: 'Noa',
    textEn: '"Tomorrow we will know where the door is." Noa joins the three pieces and sits in front of them, still. "This takes all night to speak."'
  },
  {
    type: 'battle',
    bg: 'cueva',
    trainer: 'Sombra: Comandante Rex',
    trainerEn: 'Shadow: Commander Rex',
    speaker: 'Rex',
    speakerEn: 'Rex',
    text: 'Bajando de la torre os esperan seis uniformes. El de delante lleva galones. "Nix me dijo que no volviera sin los tres trozos."',
    textEn: 'On the way down from the tower six uniforms are waiting. The one in front has stripes on his shoulder. "Nix told me not to come back without all three pieces."',
    pokemonId: 248,
    level: 61,
    myPokemonId: 445,
    myLevel: 61
  },
  {
    type: 'scene',
    bg: 'cueva',
    sprites: [248],
    speaker: 'Rex',
    text: '"No sabes lo que has hecho", dice Rex desde el suelo, y por primera vez un uniforme negro parece asustado de verdad. "Ahora va a venir él."',
    speakerEn: 'Rex',
    textEn: '"You have no idea what you have done," says Rex from the ground, and for the first time a black uniform looks genuinely afraid. "Now he will come himself."'
  },
  {
    type: 'scene',
    bg: 'volcan',
    sprites: [59, 121, 65],
    speaker: 'Iker',
    text: 'Los líderes llegan de madrugada, uno detrás de otro, sin que nadie los llame. "Nos hemos enterado", dice Iker. "¿Dónde hay que ir?"',
    speakerEn: 'Iker',
    textEn: 'The leaders arrive before dawn, one after another, without anyone calling them. "We heard," says Iker. "Where do we need to go?"'
  }
];
