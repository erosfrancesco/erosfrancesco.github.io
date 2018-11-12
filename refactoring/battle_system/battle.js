import ACTIONSYSTEM from '../action_system/index.js';
const {ActionRegistry, TurnActionRegistry} = ACTIONSYSTEM;

import CHARACTERSYSTEM from '../character_system/index.js';
const {CharacterRegistry, Character} = CHARACTERSYSTEM;

import TURNSYSTEM from '../turn_system/index.js';
const {TurnSystem} = TURNSYSTEM;

export default class Battle {
	constructor({ 
		onWin = function() {}, 
		onLose = function() {}, 
		onCharacterTurn = function(c, cb) { cb(); }
	}) {
		
		////////////////////////////////////////////////////////
		this.Players = new CharacterRegistry({
			onAdd: (character) => {
				if(character && character.Animations) {
					character.Animations.entering(character);	
				}
			}
		});
		this.Enemies = new CharacterRegistry({
			onAdd: (character) => {
				if(character && character.Animations) {
					character.Animations.entering(character);	
				}
			}
		});
		////////////////////////////////////////////////////////

		this.Turn = new TurnSystem({});
		this.Animator = new ActionRegistry();
		
		this.onWin = onWin;
		this.onLose = onLose;
		this.onCharacterTurn = onCharacterTurn;

		this.Stopped = false;
	}


	makePlayer(characterObj) {
		characterObj.ally = true;
		const player = new Character(characterObj);
		this.Players.add(player);
		return player;
	}

	makeEnemy(characterObj) {
		characterObj.ally = false;
		const enemy = new Character(characterObj);
		this.Enemies.add(enemy);
		return enemy;
	}

	forAllCharacters(f) {
		this.Enemies.forEach((character, index) => {
			if (!character) return;
			f(character, index) 
		});

		this.Players.forEach((character, index) => {
			if (!character) return;
			f(character, index) 
		});
	}



	// character registry
	// add enemy/player
	// animator
	// object
	// update


	update() {

		// if stopped...
		if (this.Stopped) return;
		
		// check onwin and onlose
		if (!this.Players.length) { this.onLose(); return; }
		if (!this.Enemies.length) { this.onWin(); return; }

		// input

		// check if there is a character that need to initiate its turn
		this.Turn.update();
		if (this.Turn.currentCharacter) {
			this.onCharacterTurn(this.Turn.currentCharacter, () => {
				this.Turn.remove();
			}); 
			return; 
		}

		// otherwise resolve animator	
		this.Animator.resolve();
		
	}


	///////////////////////////////////////

	resume() {
		this.Stopped = false;
	}

	stop() {
		this.Stopped = true;
	}
}