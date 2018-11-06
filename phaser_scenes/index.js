class PauseScene extends Phaser.Scene {
	constructor() { 
		const config = { key: 'PauseScene' }; 
		super(config); 
	}
	
	create() { 
		// on input
		this.input.keyboard.on('keyup_SPACEBAR', event => {
       			this.events.emit('__global_pause');
		}, this);
	}
}

const config = {
	type: Phaser.AUTO,
	width: 900,
	height: 500,
	backgroundColor: '#444',
	// should create game-container
	parent: "game-container",
	scene: [PauseScene],
  
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 }
		}
	}
};

const game = new Phaser.Game(config);
