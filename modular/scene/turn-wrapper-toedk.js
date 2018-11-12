import AtbBattle from '../battle_utils/atb-battle.js';
import PlayerBattleMenu from '../battle-ui/menus/battle-menu.js';

import AnimationUtils from '../animations_phaser/index.js';
const {RGBATween, DeathTween} = AnimationUtils;

import FightAction from '../battle-commands/Fight/animation-fight.js';
function StartPlayerTurn({player, battle, scene}, callback) {
	
	// build player menu
    player.Menus.add( new PlayerBattleMenu({battle, player, scene}) );
    SetActionSelectionPhase(player, battle, scene);
    
    setTimeout(() => {

    	const pointer = battle.Players.findIndex(p => p.id === player.id );
    	const registry = battle.Players;

		/////////////////////////////////////////////////////
    	const action1 = new FightAction({
    		executor: player, 
    		battle, 
    		onDone: () => {
    			// compute damage
    			console.log('ok done');
    			action1.targets.forEach(target => {
    				battle.applyDamage(target, 10);
    			});
    		}
    	});

		action1.targets = [ battle.Players.random() ];

		const action2 = new FightAction({
    		executor: player, 
    		battle, 
    		onDone: () => {
    			// compute damage
    			console.log('ok done');
    			action2.targets.forEach(target => {
    				battle.applyDamage(target, 10);
    			});
    		}
    	});

		action2.targets = [ battle.Players.random() ];
		/////////////////////////////////////////////////////
    	player.Actions.add(action1);
    	player.Actions.add(action2);
    	player.Actions.execute();

	    


    	//EndPlayerTurn(player, battle, scene);
    	callback();
   	}, 2000);  
}

function onCharacterTurn(character, battle, scene) {


	// set registry current character
	let registry = (character.isAlly()) ? battle.Players : battle.Enemies;
	registry.current = character;

	//console.log('turn ', character.name, character);

	// if berserk
	if (character.Statuses.berserk) { 
		berserkAI({character, battle}, () => { EndCharacterTurn(character, battle, scene); });
		return;
	}

	// if confused
	if (character.Statuses.confused) { 
		confuseAI({character, battle}, () => { EndCharacterTurn(character, battle, scene); });
		return;
	}

	// ally
	if (character.isAlly()) {
		StartPlayerTurn({player: character, battle, scene}, () => { EndPlayerTurn(character, battle, scene); });
		return;
    }
    
    // enemy
    character.AI({character, battle}, () => { EndCharacterTurn(character, battle, scene); });
}

function berserkAI({character, battle}, callback) {
	console.log('Im berserk', character.name);
	callback();
}

function confuseAI({character, battle}, callback) {
	console.log('Im confused', character.name);
	callback();
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

	// set actions. At the end ?? load to the animator
	
	//battle.Animator.loadCharacterAction(character);

	// reset flags
	character.isSelectingTarget = false;
	character.isSelectingAction = false;
	
	character.ready = false;
	character.TurnSystem.reset();



	// remove character from turn queue
	let registry = (character.isAlly()) ? battle.Players : battle.Enemies;
	registry.queue.shift();
	registry.current = false;
}

function EndPlayerTurn(player, battle, scene) {
	
	// remove menus
	player.Menus.reset();

	setTimeout(() => {
		EndCharacterTurn(player, battle, scene);
	}, 500);
	
}


function onCharacterDeath(character, battle, scene) {
	// remove
	// TODO: need to check if its active turn.
	//DeathTween(character, () => {
		console.log(character.name, ' is dead.');
		const registry = (character.isAlly()) ? battle.Players : battle.Enemies;
		registry.remove(c => c.id === character.id);
		if (registry.current.id === character.id) {
			registry.current = false;
		}
		console.log(registry);
	//});
}
/**/


export default {onCharacterTurn, onCharacterDeath};
