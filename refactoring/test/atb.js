import CHARACTERSYSTEM from '../character_system/index.js';
const {Character} = CHARACTERSYSTEM;

import TURNSYSTEM from '../turn_system/index.js';
const {ATBCharacterBridge} = TURNSYSTEM;

import BATTLESYSTEM from '../battle_wrapper/index.js';
const {Battle, AtbBattle} = BATTLESYSTEM;


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


const battle = new AtbBattle({
	onWin: () => { console.log('cool.'); },
	onLose: () => { console.log('dang'); },
	onCharacterTurn: (character, callback) => { console.log('turn of ' + character.name); callback(); }
});


/*
player.ATBBridge = new ATBCharacterBridge({
	character: player, 
	onReady: (character) => {
		console.log('player ', character.name);
		battle.Turn.add(character);
	}
});

enemy.ATBBridge = new ATBCharacterBridge({
	character: enemy, 
	onReady: (character) => {
		console.log('enemy ', character.name);
		battle.Turn.add(character);
	}
});

battle.Turn.update = () => {
	console.log('hello turn');
	player.ATBBridge.update(() => {});
	enemy.ATBBridge.update(() => {});
}

/**/

battle.makePlayer(player);
battle.makeEnemy(enemy);


setInterval( () => battle.update(), 30);


