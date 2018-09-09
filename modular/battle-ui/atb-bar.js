import ATBBarGraphics from './atb-bar-graphics.js';


export default class ATBPlayerBar extends ATBBarGraphics {
	constructor(options) {

		let {
			x, y,
			scene,
			player,
			width,
			onBarLoaded
		} = options;
        
		super({
			x, y,
			scene,
			onBarLoaded,
			width,
			height: 16
		});

		this.player = player;
	}

}