import Character from './character.js';
import MenuRegistry from '../menu_API/menu-registry.js'

class Player extends Character {
	constructor(options) {
		options.ally = true;
		super(options);
		this.Menus = new MenuRegistry();
	}
}


class Enemy extends Character {
	constructor(options) {
		options.ally = false;
		super(options);
	}
}


export default {Enemy, Player};