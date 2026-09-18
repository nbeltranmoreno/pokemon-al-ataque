// La Historia en inglés, escena por escena y en el mismo orden que la española.
// Solo cambian los textos: los Pokémon, los niveles y las medallas son los mismos.

const EN_1_A_3 = [
  {
    speaker: 'Spark Town',
    text: 'Six in the morning. Your bag has been packed since last night and you have not slept a wink. A Pikachu from the neighbourhood watches you from the roof, as if saying "about time you left".'
  },
  {
    speaker: 'Professor Robles',
    text: '"Before I give you your licence I want to see how you manage. These three belong to the lab, not to you. I am lending you one for the road and you bring it back in one piece."'
  },
  {
    speaker: 'Professor Robles',
    text: '"Charmander. It has a temper in the mornings, just like you." You laugh so you will not get nervous. Outside you hear a voice you know far too well.'
  },
  {
    speaker: 'Dani',
    text: '"They really gave one to you?" Dani lives two houses down and has been beating you at everything your whole life. His Bulbasaur is already out of its Poké Ball.'
  },
  {
    trainer: 'Dani',
    speaker: 'Dani',
    text: '"One battle. If I win, you go home." He is not joking.'
  },
  {
    speaker: 'Dani',
    text: '"Beginner\'s luck." He picks up his Bulbasaur and leaves without looking at you. Your Charmander puffs out smoke, proud. So are you, even if your hands are shaking.'
  },
  {
    speaker: null,
    text: 'The route smells of wet grass. The Pidgey shoot off as you pass and, for the first time, nobody is telling you which way to go.'
  },
  {
    speaker: 'Tomás',
    text: 'A boy with a net is chasing something in the bushes and accidentally scares it towards you. "Hey, careful, that one is mine!"'
  },
  {
    trainer: 'Bug Catcher Tomás',
    speaker: 'Tomás',
    text: '"Well... if you beat me, it is yours." The professor lends you her Pikachu for this one.'
  },
  {
    speaker: 'Tomás',
    text: '"Bug Pokémon evolve super fast, you know? Watch yourself in the forest: in there it gets dark at noon."'
  },
  {
    speaker: null,
    text: 'You get lost twice. You run out of water. The Pikachu marks the path with little sparks every time you hesitate.'
  },
  {
    speaker: 'A voice among the trees',
    text: '"Don\'t move." A girl with a torch stops you dead: one step from your boot there is a Metapod asleep in the middle of the path.'
  },
  {
    speaker: 'Ranger Elsa',
    text: '"I am Elsa, I look after the forest. For three days I have been seeing strange people in black uniforms digging near the river."'
  },
  {
    trainer: 'Ranger Elsa',
    speaker: 'Elsa',
    text: '"Before I tell you more, I want to see if you can hold your own. Here, use my Abra."'
  },
  {
    speaker: 'Elsa',
    text: '"You will do." She points at a cave covered with branches. "That way leads out to the quarry. Be careful: the Zubat are jumpy today."'
  },
  {
    speaker: null,
    text: 'Inside it smells of wet stone. The Zubat brush past your hair and a Geodude rolls ahead of you as if showing you the way.'
  },
  {
    speaker: 'Miner Paco',
    text: '"Stop!" A miner with a helmet blocks your path. "Not just anyone comes down here. If you want through, you get through by winning."'
  },
  {
    trainer: 'Miner Paco',
    speaker: 'Paco',
    text: '"My Onix has been with me for twenty years." He lends you a Squirtle from the quarry so it is fair.'
  },
  {
    speaker: 'Bruno',
    text: 'At the back, a huge man splits a rock with his hand. "I heard you from here. I am Bruno, the leader. Have you come for the badge?"'
  },
  {
    trainer: 'Leader Bruno',
    speaker: 'Bruno',
    text: '"Think before you hit." He lends you a Squirtle: water beats rock.'
  },
  {
    speaker: 'Bruno',
    text: '"You picked the right type. That is not luck, that is brains." He gives you the badge and a pat that nearly knocks you over.'
  },
  {
    speaker: 'Bruno',
    text: '"One more thing. There are people in black buying rare stones for a fortune. They say they are from Team Shadow. Stay away."'
  }
];

const EN_4_A_6 = [
  {
    speaker: 'Dani',
    text: 'At the crossroads Dani is waiting, one badge ahead of you and his Bulbasaur already evolved. "Round two. This time I mean it."'
  },
  {
    trainer: 'Dani',
    speaker: 'Dani',
    text: '"No beginner loaners." The professor sends you a Charmeleon over video call.'
  },
  {
    speaker: 'Dani',
    text: '"Fine. Maybe you do know what you are doing." It is the closest thing to a compliment you have ever heard from him. He heads for the port without saying goodbye.'
  },
  {
    speaker: null,
    text: 'The port smells of salt and petrol. In the water the Magikarp jump like popcorn and a Goldeen watches you from under the pier.'
  },
  {
    speaker: 'Fisherman Simón',
    text: '"Hey kid, are you the one winning battles around here?" A fisherman puts down his rod. "Give me one, I have not had a bite all morning."'
  },
  {
    trainer: 'Fisherman Simón',
    speaker: 'Simón',
    text: '"My Krabby pinches hard, fair warning." He lends you his granddaughter\'s Pikachu.'
  },
  {
    speaker: 'Marina',
    text: 'Leader Marina is fixing her boat with a Staryu spinning beside her. "Are you here for the badge or to watch? You cannot do both here."'
  },
  {
    trainer: 'Leader Marina',
    speaker: 'Marina',
    text: '"In the water I am in charge. Out of the water... also." You take the Pikachu: lightning rules the sea.'
  },
  {
    speaker: 'Marina',
    text: '"Take the badge." She lowers her voice. "And do me a favour: if you see a black ship with no name, stay away. They have been circling the coast for two weeks."'
  },
  {
    speaker: null,
    text: 'Back on the route you find the grass trampled and boxes smashed. Somebody was here in a hurry, and not long ago.'
  },
  {
    speaker: 'Shadow Grunt',
    text: '"You are where you should not be." Black uniform, cap pulled down, an Ekans coiled around the arm. "Last time I ask you nicely."'
  },
  {
    trainer: 'Shadow Grunt',
    speaker: 'Shadow Grunt',
    text: '"You asked for it." Elsa appears behind you and throws you a Poké Ball: "Use my Kadabra!"'
  },
  {
    speaker: 'Elsa',
    text: '"He ran off, but he left this." She shows you a crumpled map with a red circle right over the volcano.'
  },
  {
    speaker: 'Elsa',
    text: '"They have been taking Pokémon from the forest for months. The ones left are scared." A Gloom hides behind her as she says it.'
  },
  {
    trainer: 'Shadow Grunt',
    speaker: 'Shadow Grunt',
    text: 'Another black uniform steps out from the trees. "You again?" Elsa lends you her Kadabra without a word.'
  },
  {
    speaker: 'Elsa',
    text: '"Go to the volcano and warn Iker. He is a loudmouth, but he is the strongest around here." She stays behind to guard the forest.'
  },
  {
    speaker: null,
    text: 'The path climbs to a sleeping volcano. It is so hot the air shivers, and a Ponyta gallops past you without burning the grass.'
  },
  {
    speaker: 'Tamer Rubén',
    text: '"Going up to see Iker? You go through me first." A boy with fireproof gloves smiles. "Nobody reaches the top without sweating."'
  },
  {
    trainer: 'Tamer Rubén',
    speaker: 'Rubén',
    text: '"My Magmar heats up fast." He lends you a Wartortle from the shelter.'
  },
  {
    speaker: 'Iker',
    text: 'At the top, through the smoke, an Arcanine barks so loudly the rock rumbles. "Relax! That is how it says hello," shouts Iker.'
  },
  {
    trainer: 'Leader Iker',
    speaker: 'Iker',
    text: '"My Arcanine has never lost at home." They lend you a Blastoise. It weighs more than you do.'
  },
  {
    speaker: 'Iker',
    text: '"It never loses at home... except today." He laughs and hands you the badge. Then he looks at the map you brought and the laugh drops off his face.'
  },
  {
    speaker: 'Iker',
    text: '"That circle is the mouth of the volcano. There are old tunnels down there." He clenches his fists. "If they are using those, this is bigger than I thought."'
  }
];

const EN_7_A_8 = [
  {
    speaker: null,
    text: 'The purple tower is visible from the volcano. Up close it has no stairs, and a Gastly opens the door for you, floating, as if it had been waiting.'
  },
  {
    speaker: 'Psychic Iris',
    text: '"Noa is upstairs. But first you have to prove you do not scare easily." A girl with her eyes closed points at you without looking.'
  },
  {
    trainer: 'Psychic Iris',
    speaker: 'Iris',
    text: '"My Haunter laughs when it wins. Sorry if that bothers you." She lends you a Gengar from the tower.'
  },
  {
    speaker: 'Iris',
    text: '"Take the lift with no buttons. Think of the floor you want and it takes you there." She says it completely seriously.'
  },
  {
    speaker: 'Noa',
    text: 'Upstairs, Noa speaks to you without opening her mouth. "You are late. I have been expecting you since yesterday, when you decided to come."'
  },
  {
    trainer: 'Leader Noa',
    speaker: 'Noa',
    text: '"I know which move you are going to choose." They lend you a Snorlax, which takes whatever you throw at it.'
  },
  {
    speaker: 'Noa',
    text: '"I knew your move, but not that you would hold on that long." She gives you the badge. "And I know the real reason you came."'
  },
  {
    speaker: 'Noa',
    text: '"Team Shadow is after a stone under the volcano. They say it makes any Pokémon obedient." She pauses. "That should not exist."'
  },
  {
    speaker: 'Noa',
    text: '"Iker and Marina are already on their way. Bruno is closing the quarry. If you go, you go with them." She opens the lift door for you. "Good luck."'
  },
  {
    speaker: 'Iker',
    text: 'At the mouth of the volcano the three leaders are waiting. "Well, the kid came," says Iker. Marina elbows him. "The word is trainer."'
  },
  {
    speaker: null,
    text: 'The tunnels are full of cables and red lights. There is a strange smell of smoke, and some Koffing float among the machines like lost balloons.'
  },
  {
    trainer: 'Shadow Grunt',
    speaker: 'Shadow Grunt',
    text: '"Nobody comes in here!" Marina throws you a Poké Ball: "Use my Starmie, quick!"'
  },
  {
    speaker: 'Marina',
    text: '"Nicely done." Bruno tears a metal door off with his bare hands. "I open, you go through."'
  },
  {
    speaker: 'Shadow Scientist',
    text: 'Inside, a woman in a lab coat takes notes without blinking. "Interesting. One child and three leaders. The sample is improving."'
  },
  {
    trainer: 'Shadow Scientist',
    speaker: 'Shadow Scientist',
    text: '"Let us see how long your head holds out." Iker lends you his Rapidash.'
  },
  {
    speaker: 'Bruno',
    text: '"There is the stone." Something violet glows in a case, and every Pokémon in the room goes still, staring at it all at once.'
  },
  {
    speaker: 'Vera',
    text: '"Do not touch it." A woman in a long coat comes slowly down the stairs. "I am Vera. I have spent ten years looking for that stone and no kid is taking it."'
  },
  {
    trainer: 'Boss Vera',
    speaker: 'Vera',
    text: '"My Gyarados does not obey out of affection, it obeys because it knows what happens if it does not." Noa appears and lends you her Alakazam.'
  },
  {
    speaker: 'Vera',
    text: 'The Gyarados goes down and, for the first time, looks at Vera without fear. She steps back. "What did you do to it?" "Nothing," you say. "Just beat you."'
  },
  {
    speaker: 'Noa',
    text: 'The stone cracks on its own once the power is cut. Vera escapes through a side tunnel and nobody chases her: there are too many Pokémon to get out of there.'
  },
  {
    speaker: 'Elsa',
    text: 'Two days later the forest is full again. Elsa counts the ones who came back and the numbers do not add up: there are more than the ones they took.'
  }
];

const EN_9_A_10 = [
  {
    speaker: 'Professor Robles',
    text: '"You have four badges and half the region talking about it." The professor looks at you over video call. "That is enough to enter the League."'
  },
  {
    speaker: 'Trainer Lucía',
    text: 'On the way up there is a queue of trainers waiting. A girl with a Fearow on her shoulder joins the back. "I have been trying for three years."'
  },
  {
    trainer: 'Trainer Lucía',
    speaker: 'Lucía',
    text: '"If you beat me, I will believe someone new gets in this year." The professor lends you a young Charizard.'
  },
  {
    speaker: 'Dani',
    text: 'At the League gate stands Dani, with dark circles under his eyes and his Venusaur beside him. "I have trained every day since you beat me. There is no third chance today."'
  },
  {
    trainer: 'Dani',
    speaker: 'Dani',
    text: '"Everything we have got." The professor lends you her Charizard: "Look after it for me."'
  },
  {
    speaker: 'Dani',
    text: 'He stares at the ground for a while. Then he holds out his hand. "Beat the Champion. If you lose, you make me start training again and I am very tired."'
  },
  {
    speaker: 'Receptionist',
    text: '"Four battles in a row, no going out to heal, no changing your team." She stamps your licence. "The League lends you the Pokémon. Good luck."'
  },
  {
    trainer: 'Elite Four Rita',
    speaker: 'Rita',
    text: '"First room: rock." Her Golem takes up half the chamber. They hand you a Poliwrath.'
  },
  {
    speaker: 'Rita',
    text: '"Go through. And drink some water, the next room is forty degrees." She does not look like she is joking.'
  },
  {
    trainer: 'Elite Four Hugo',
    speaker: 'Hugo',
    text: '"Second room: fire." Hugo\'s Magmar lights the torches as you walk in. They hand you a Blastoise.'
  },
  {
    trainer: 'Elite Four Sira',
    speaker: 'Sira',
    text: '"Third room: water. And yes, the room is flooded on purpose." They hand you a Jolteon.'
  },
  {
    trainer: 'Elite Four Ciro',
    speaker: 'Ciro',
    text: '"Fourth room: ghosts. A lot of people give up here." His Gengar is already waiting inside your shadow. They hand you an Alakazam.'
  },
  {
    speaker: 'Champion Álex',
    text: 'The Champion\'s hall is silent. Álex strokes his Dragonite without turning around. "I saw your battle against Noa. You held on when it mattered. That cannot be trained."'
  },
  {
    trainer: 'Champion Álex',
    speaker: 'Álex',
    text: '"Show me why you made it this far."'
  },
  {
    speaker: 'Professor Robles',
    text: '"I told you to bring it back in one piece." She smiles and puts the licence in your hand. Outside, half of Spark Town has come to see you. Dani first of all.'
  },
  {
    speaker: 'Spark Town',
    text: 'That night, on the roof of your house, the neighbourhood Pikachu sits down next to you. Tomorrow you start training a team of your own.'
  }
];

export const STORY_EN = [...EN_1_A_3, ...EN_4_A_6, ...EN_7_A_8, ...EN_9_A_10];
