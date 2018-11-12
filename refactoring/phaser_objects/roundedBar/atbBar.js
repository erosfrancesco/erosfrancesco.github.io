import ATBBarGraphics from './atbBarGraphics.js';


export default class ATBPlayerBarBridge extends ATBBarGraphics {
	constructor(options) {

		const {
			x, y,
			scene,
			player,
			width,
		} = options;
        
		super({
			x, y,
			scene,
			width,
			height: 16
		});

		this.player = player;
	}

}