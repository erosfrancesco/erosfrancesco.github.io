// Character has been moved
import AtbBattle from '../battle_utils/atb-battle.js';
import PlayerBattleMenu from '../battle-ui/menus/battle-menu.js'

/*

player turn => {
	set flags (init)
	set menu  (init)

	wait for input (input) {
		set action
		set action target
	}
	
	remove menu (cleanup)
	add action to animator (cleanup)
	
	set flags (cleanup)	
	
}

enemy turn same, but with input replaced by AI, and no menu on init (also on cleanup)
*/

/**/
function StartPlayerTurn(player, battle, scene) {
	
	// build player menu
    player.Menus.add( new PlayerBattleMenu({battle, player, scene}) );
    SetActionSelectionPhase(player, battle, scene);
    setTimeout(() => {
    	EndPlayerTurn(player, battle, scene);
   	}, 2000);  
}


function onCharacterTurn(character, battle, scene) {
	// ally
	if (character.isAlly()) {
		StartPlayerTurn(character, battle, scene);
		return;
    }
    
    // enemy
    character.AI(() => { EndCharacterTurn(character, battle, scene); });

}

function SetActionSelectionPhase(character, battle, scene) {
	// set proper flags
	character.isSelectingTarget = false;
	character.isSelectingAction = true;
}

function SetTargetSelectionPhase(character, battle, scene) {
	// set proper flags
	character.isSelectingTarget = true;
	character.isSelectingAction = false;
}


function EndCharacterTurn(character, battle, scene) {

	// add action
	//battle.Animator.loadCharacterAction(character);

	// remove character from turn queue
	let registry = (character.isAlly()) ? battle.Players : battle.Players;
	registry.queue.shift();
	registry.current = false;

	// reset flags
	character.isSelectingTarget = false;
	character.isSelectingAction = false;
	
	//character.ready = false;
	character.TurnSystem.stop();
	//character.TurnSystem.init();
}

function EndPlayerTurn(player, battle, scene) {
	// remove menus
	player.Menus.reset();
	// default
	EndCharacterTurn(player, battle, scene);
}

/**/

export default {onCharacterTurn};