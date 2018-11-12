import BATTLESTATS from '../battle_stats/index.js'
const {BuildStatuses, StatStatuses, TurnStatuses, StatRegistry} = BATTLESTATS;

import CHARACTER from '../character_system/index.js';
const {CharacterRegistry, Character} = CHARACTER;

// battlestats test
const dummy = new Character({
	
	activeStatuses: {
		'zombie': true
	},
	name: 'xiod',
	stats: {
		'life': 40,
		'mana': 10, 
		'level': 5,
		'dexterity': 4,
		'strength': 10,
		'defense': 5,
		'intelligence': 3
	}
});

console.log( 

	dummy.isAlly(), 
	dummy.life,
	dummy.mana,
	dummy.getLevel(),
	dummy.getVelocity(),
	dummy.getStrenght(),
	dummy.Statuses

);