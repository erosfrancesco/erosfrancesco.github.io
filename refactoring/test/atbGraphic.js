import ATBGRAPHIC from '../phaser_objects/roundedBar/index.js';
const {RoundedRectFill, RoundedRectStroke, ATBBarGraphics, ATBPlayerBarBridge} = ATBGRAPHIC;

import GAMEENGINE from '../main_utils/index.js'; 
const { game, KeyMapper, GameUtilities, AwaitWaterfall } = GAMEENGINE;

// need a scene
class TestScene extends Phaser.Scene {
    constructor () {
        super('TestScene');
    }

    preload (config) {

    }

    create () {
    	const a = new ATBBarGraphics({
    		scene: this, 
    		x: 100, y: 100,
			width: 150,
			height: 20
		});
		a.percentage = 100;

		this.scene.get('PauseScene').events.on('game_paused', () => {
			console.log('hello resume');
		}, this);
    }
};

game.scene.add('battle', TestScene, true);




/*

import CHARACTER from '../character_system/index.js';
const {CharacterRegistry, Character} = CHARACTER;

import ACTIONS from '../action_system/index.js';
const {ActionRegistry, PlayerTurnActionRegistry} = ACTIONS;



/*
const stats = {
	'life': 40,
	'mana': 10, 
	'level': 5,
	'dexterity': 4,
	'strength': 10,
	'defense': 5,
	'intelligence': 3
};

const executor = new Character({name: 'executor', stats});
const target = new Character({name: 'target', stats});

// action registry
const animator = new ActionRegistry();
setInterval(() => animator.resolve(), 30);


// bridge
executor.AnimatorBridge = new PlayerTurnActionRegistry(executor, animator);

setTimeout(() => {
	executor.AnimatorBridge.add({
		executor,
		targets: [target],
		resolve: (t, e, callback) => {
			// it works
			t.forEach(target => console.log( "target: " + target.life ) );
			console.log("executor: ", e.Stats.get("life"));
			callback();
		}
	});

	executor.AnimatorBridge.execute();
}, 1000);
/**/