import STATUSES from './statuses/index.js';
const {BuildStatuses, StatStatuses, TurnStatuses} = STATUSES;

import StatRegistry from './stat.js';

export default {BuildStatuses, StatStatuses, TurnStatuses, StatRegistry};

/*
let dummy = new Character({
	name: 'xiod',
	activeStatuses: {
		'zombie': true
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
/**/