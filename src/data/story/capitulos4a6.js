// Capítulos 4 a 6: el puerto y la Líder Marina, el Equipo Sombra y el volcán del Líder Iker

export const CAPITULOS_4_A_6 = [
  // --- Capítulo 4: el puerto ---
  {
    type: 'scene',
    bg: 'mar',
    sprites: [5],
    speaker: 'Dani',
    text: 'En el cruce te espera Dani, con una medalla más que tú y su Bulbasaur ya evolucionado. "Segundo asalto. Esta vez va en serio."'
  },
  {
    type: 'battle',
    bg: 'mar',
    trainer: 'Dani',
    speaker: 'Dani',
    text: '"Nada de prestados de principiante." La profesora te pasa un Charmeleon por videollamada.',
    pokemonId: 2,
    level: 16,
    myPokemonId: 5,
    myLevel: 16
  },
  {
    type: 'scene',
    bg: 'mar',
    sprites: [5],
    speaker: 'Dani',
    text: '"Vale. Igual sí sabes lo que haces." Es lo más parecido a un cumplido que le has oído nunca. Se va hacia el puerto sin despedirse.'
  },
  {
    type: 'scene',
    bg: 'mar',
    sprites: [129, 118],
    speaker: null,
    text: 'El puerto huele a sal y a gasolina. En el agua, los Magikarp saltan como palomitas y un Goldeen te mira desde debajo del muelle.'
  },
  {
    type: 'scene',
    bg: 'mar',
    sprites: [98],
    speaker: 'Pescador Simón',
    text: '"Chaval, ¿tú eres el que anda ganando combates?" Un pescador deja la caña. "Échame uno, que llevo toda la mañana sin picar nada."'
  },
  {
    type: 'battle',
    bg: 'mar',
    trainer: 'Pescador Simón',
    speaker: 'Simón',
    text: '"Mi Krabby pellizca fuerte, aviso." Te presta un Pikachu de su nieta.',
    pokemonId: 98,
    level: 17,
    myPokemonId: 25,
    myLevel: 18
  },
  {
    type: 'scene',
    bg: 'mar',
    sprites: [120],
    speaker: 'Marina',
    text: 'La líder Marina repara su barca con un Staryu girando a su lado. "¿Vienes a por la medalla o a mirar? Aquí no se puede hacer las dos cosas."'
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
    bg: 'mar',
    sprites: [121],
    speaker: 'Marina',
    text: '"Toma la medalla." Baja la voz. "Y hazme un favor: si ves un barco negro sin nombre, no te acerques. Llevan dos semanas rondando la costa."'
  },

  // --- Capítulo 5: el Equipo Sombra ---
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [19, 20],
    speaker: null,
    text: 'De vuelta a la ruta encuentras la hierba pisoteada y cajas rotas. Alguien ha estado aquí con prisa, y no hace mucho.'
  },
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [23],
    speaker: 'Recluta Sombra',
    text: '"Estás donde no debes." Uniforme negro, gorra calada, un Ekans enroscado en el brazo. "Última vez que te lo digo por las buenas."'
  },
  {
    type: 'battle',
    bg: 'ruta',
    trainer: 'Recluta Sombra',
    speaker: 'Recluta Sombra',
    text: '"Tú lo has querido." Elsa aparece por detrás y te lanza una Poké Ball: "¡Usa mi Kadabra!"',
    pokemonId: 23,
    level: 20,
    myPokemonId: 64,
    myLevel: 21
  },
  {
    type: 'scene',
    bg: 'ruta',
    sprites: [64],
    speaker: 'Elsa',
    text: '"Se ha ido corriendo, pero ha dejado esto." Te enseña un mapa arrugado con un círculo rojo justo encima del volcán.'
  },
  {
    type: 'scene',
    bg: 'bosque',
    sprites: [43, 44],
    speaker: 'Elsa',
    text: '"Llevan meses llevándose Pokémon del bosque. Los que quedan están asustados." Un Gloom se esconde detrás de ella al oírla."'
  },
  {
    type: 'battle',
    bg: 'bosque',
    trainer: 'Recluta Sombra',
    speaker: 'Recluta Sombra',
    text: 'Otro uniforme negro sale de entre los árboles. "¿Otra vez tú?" Elsa te presta su Kadabra sin decir nada.',
    pokemonId: 44,
    level: 22,
    myPokemonId: 64,
    myLevel: 23
  },
  {
    type: 'scene',
    bg: 'bosque',
    sprites: [12],
    speaker: 'Elsa',
    text: '"Ve al volcán y avisa a Iker. Es un bocazas, pero es el más fuerte de por aquí." Se queda cuidando el bosque.'
  },

  // --- Capítulo 6: el volcán ---
  {
    type: 'scene',
    bg: 'volcan',
    sprites: [77],
    speaker: null,
    text: 'El camino sube hasta un volcán dormido. Hace tanto calor que el aire tiembla, y un Ponyta te adelanta al galope sin quemar la hierba.'
  },
  {
    type: 'scene',
    bg: 'volcan',
    sprites: [126],
    speaker: 'Domador Rubén',
    text: '"¿Subes a ver a Iker? Antes pasa por mí." Un chico con guantes ignífugos sonríe. "Nadie llega arriba sin sudar."'
  },
  {
    type: 'battle',
    bg: 'volcan',
    trainer: 'Domador Rubén',
    speaker: 'Rubén',
    text: '"Mi Magmar calienta rápido." Te presta un Wartortle del refugio.',
    pokemonId: 126,
    level: 23,
    myPokemonId: 8,
    myLevel: 24
  },
  {
    type: 'scene',
    bg: 'volcan',
    sprites: [59],
    speaker: 'Iker',
    text: 'Arriba, entre el humo, un Arcanine ladra tan fuerte que retumba la roca. "¡Tranquilo! Es su forma de saludar", grita Iker.'
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
    text: '"Ya no pierde nunca en casa... menos hoy." Se ríe y te da la medalla. Luego mira el mapa que traes y se le quita la risa de golpe.'
  },
  {
    type: 'scene',
    bg: 'volcan',
    sprites: [58],
    speaker: 'Iker',
    text: '"Ese círculo es la boca del volcán. Ahí abajo hay túneles viejos." Aprieta los puños. "Si están usando eso, esto es más gordo de lo que pensaba."'
  }
];
