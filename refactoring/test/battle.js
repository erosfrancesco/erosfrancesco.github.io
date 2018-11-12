import CHARACTERSYSTEM from '../character_system/index.js';
const {Character} = CHARACTERSYSTEM;

import BATTLESYSTEM from '../battle_system/index.js';
const {Battle} = BATTLESYSTEM;

const battle = new Battle({
	onWin: () => { console.log('cool.'); },
	onLose: () => { console.log('dang'); },
	onCharacterTurn: (character, callback) => { console.log('turn of ' + character.name); callback(); }
});


const stats = {
	'life': 40,
	'mana': 10, 
	'level': 5,
	'dexterity': 4,
	'strength': 10,
	'defense': 5,
	'intelligence': 3
};

const player = new Character({name: 'pg', stats});
const enemy = new Character({name: 'bad', stats});

battle.update();
battle.makePlayer(player);
battle.update();
battle.makeEnemy(enemy);

battle.Turn.add(enemy);
battle.update();

battle.Animator.add({
	executor: player,
	targets: [],
	resolve: (executor, targets, callback) => {
		console.log('ok');
		callback();
	}
});
battle.update();



