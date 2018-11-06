class BattleControllerScene extends Phaser.Scene {

	constructor() { 
		const config = { key: 'BattleControllerScene' }; 
		super(config); 
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

		// MENU REGISTRY
		this.MenuRegistry = new MenuRegistry({});
		this.MenuPool = {};
	}
	
	buildMenu(id, config) {
		const Menu = this.MenuPool[id];
		this.MenuRegistry.add( Menu.build(config) );
	}
	
	loadMenu(id, Menu) {
		this.MenuPool[id] = Menu;
	}
	
	removeMenu() {
		this.MenuRegistry.remove();
	}
	
	removeAllMenu() {
		while(this.MenuRegistry.size) {
			this.MenuRegistry.remove();
		}
	}
}
