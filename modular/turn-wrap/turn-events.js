// Character has been moved
import AtbBattle from '../battle_utils/atb-battle.js';
import PlayerBattleMenu from '../battle-ui/menus/battle-menu.js';

import AnimationUtils from '../animations_phaser/index.js';
let {DeathTween} = AnimationUtils;


function onCharacterTurnStart({character, battle, scene}, callback) {

	// set registry current character
	((character.isAlly) ? battle.Players : battle.Enemies).current = character;

	// if berserk
	if (character.Statuses.berserk) { 
		berserkAI({character, battle}, () => { onCharacterTurnEnd({character, battle}, callback); });
		return;
	}

	// if confused
	if (character.Statuses.confused) { 
		confuseAI({character, battle}, () => { onCharacterTurnEnd({character, battle}, callback); });
		return;
	}

	// ally
	if (character.isAlly) {
		StartPlayerTurn({character, battle, scene}, () => { EndPlayerTurn(character, battle, scene); });
		return;
    }
    
    // enemy
    character.AI({character, battle}, () => { onCharacterTurnEnd({character, battle}, callback); });
}

function onCharacterTurnEnd({character, battle}, callback) {

	// add action
	battle.Animator.loadCharacterAction(character);

	// reset flags
	character.isSelectingTarget = false;
	character.isSelectingAction = false;
	
	character.ready = false;
	character.TurnSystem.reset();


	// remove character from turn queue
	const registry = (character.isAlly) ? battle.Players : battle.Enemies;
	registry.queue.shift();
	registry.current = false;
	callback();
}



function onCharacterDeath(character, battle, scene) { 

	// remove
	DeathTween(character, () => {
		const registry = (character.isAlly) ? battle.Players : battle.Enemies;
		registry.remove(c => c.id === character.id);
	});
}


export default {onCharacterTurnStart, onCharacterDeath};
/**/