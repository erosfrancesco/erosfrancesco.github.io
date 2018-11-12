import GAMEENGINE from '../../main_utils/index.js';
const { game, KeyMapper, GameUtilities, AwaitWaterfall } = GAMEENGINE;

import MenuRegistry from "./ffviMenu/MenuRegistry.js";
import FightMenu from './ffviMenu/FightMenu.js';

class BattleControllerScene extends Phaser.Scene {

	constructor() {
		const config = { key: 'BattleControllerScene' };
		super(config);

		// MENU REGISTRY AND POOL
		this.MenuPool = {};
		this.Menus = new MenuRegistry({
			onAdd: (menu, callback) => callback(),
			onDestroy: (menu, callback) => menu.destroy(() => callback())
		});
	}

	create() {
		// INPUT
		this.input.keyboard.on('keyup_UP', event => {
			this.events.emit('__global_pressed_up');
		}, this);

		this.input.keyboard.on('keyup_DOWN', event => {
			this.events.emit('__global_pressed_down');
		}, this);

		this.input.keyboard.on('keyup_LEFT', event => {
			this.events.emit('__global_pressed_left');
		}, this);

		this.input.keyboard.on('keyup_RIGHT', event => {
			this.events.emit('__global_pressed_right');
		}, this);

		this.input.keyboard.on('keyup_Z', event => {
			this.events.emit('__global_pressed_z');
		}, this);

		this.input.keyboard.on('keyup_X', event => {
			this.events.emit('__global_pressed_x');
		}, this);


		this.loadMenu("FightMenu", new FightMenu({scene: this}));
		this.buildMenu("FightMenu", {
			player: {
				Commands: [
					{
						label: "FIGHT",
						onSelected: () => {}
					}
				]
			}
		});
	}

	buildMenu(id, config = {}) {
		config.scene = this;
		const Menu = this.MenuPool[id];
		this.Menus.add(Menu.build(config));
	}

	getTopMenu() {
		return this.Menus.current;
	}

	loadMenu(id, Menu) {
		this.MenuPool[id] = Menu;
	}

	removeMenu() {
		this.Menus.remove();
	}

	resetMenus() {
		this.Menus.reset();
	}
}


/* 
	// need a scene
	class TestScene extends Phaser.Scene {
		constructor() {
			super('TestScene');
		}

		create() {

			// menu logic

			// menu graphic
			const menu = new FFVIMenuGraphic({
				scene: this,
				width: 400, height: 200,
				x: 300, y: 200,
				onComplete: () => {
					setTimeout(() => menu.destroy(() => console.log("Hllo worl") ), 1000);
				}
			});
		}
	};
/** */
game.scene.add("battle", BattleControllerScene, true);
