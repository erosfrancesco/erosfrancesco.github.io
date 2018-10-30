import AtbBattle from '../battle_utils/atb-battle.js';
import PlayerBattleMenu from '../battle-ui/menus/battle-menu.js';

import AnimationUtils from '../battle-commands/animation-utils.js';
const {RGBATween} = AnimationUtils;

//import FightAction from '../battle-commands/Fight/index.js';
import FightAction from '../battle-commands/Fight/animation-fight.js';
function StartPlayerTurn({player, battle, scene}, callback) {
	
	// build player menu
    player.Menus.add( new PlayerBattleMenu({battle, player, scene}) );
    SetActionSelectionPhase(player, battle, scene);
    
    setTimeout(() => {

    	const pointer = battle.Players.findIndex(p => p.id === player.id );
    	const registry = battle.Players;


    	console.log(player.name, " is about to blow.");
    	player.Actions = new FightAction({
    		executor: player, 
    		battle, 
    		onDone: () => {
    			console.log('ehll eoeld');
    		}
    	});

	    player.Actions.targets = [ 
	    battle.Players.random()

	    //{
	        //pointer: battle.Players.randomIndex(),
	        //registry: battle.Players
	    //} 
	    ];

	    console.log(player.Actions);

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

	// add action
	battle.Animator.loadCharacterAction(character);

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
	DeathTween(character, () => {
		console.log(character.name, ' is dead.');
		const registry = (character.isAlly()) ? battle.Players : battle.Enemies;
		registry.remove(c => c.id === character.id);
		if (registry.current.id === character.id) {
			registry.current = false;
		}
		console.log(registry);
	});
}

function DeathTween({Sprite}, callback) {
	Sprite.__deathPhaserTween = RGBATween(Sprite.scene, {
        targets: Sprite,
        props: {
            g: 18, 
            r: 128,
            b: 128,
            a: 0,
            ease: 'Linear' 
        },
        duration: 250,
        onComplete: () => {
        	callback();
        	delete Sprite.__deathPhaserTween;
        }
    });
}


export default {onCharacterTurn, onCharacterDeath};
