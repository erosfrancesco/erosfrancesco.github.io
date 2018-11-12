import BattleControllerScene from '../battle_menus/index.js';
import FightMenu from '../battle_menus/Fight.js';

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
		const MenuScene = this.scene.get('BattleControllerScene');
		MenuScene.loadMenu('fightMenu', new FightMenu());
		MenuScene.buildMenu('fightMenu', {
			x: 500,
			y: 200,
			items: [
			[
				{
					label: "Hello",
					onSelected: () => { console.log("hello menu"); }
				}
				, {
					label: "World",
					onSelected: () => { console.log("hello menu"); }
				}
			]
			, [
				{
					label: "Zawa",
					onSelected: () => { console.log("hello menu"); }
				}
				, {
					label: "rudo",
					onSelected: () => { console.log("hello menu"); }
				}
			]
		]
		});


		MenuScene.events.on('button_pressed', (event) => {
			event.setBackgroundColor('#893448');
		});

	}
};

game.scene.add('battle', BattleControllerScene, true);
game.scene.add('battle', TestScene, true);