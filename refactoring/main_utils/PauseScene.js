export default class PauseScene extends Phaser.Scene {
	constructor(config) { 
		super('PauseScene');
	}

	create() { 
		// graphic
		this.backgroundTint = this.cameras.add(0, 0, 900, 500); 
		this.backgroundTint.setBackgroundColor('rgba(0, 0, 0, 0.5)');
		this.text = this.add.text(410, 200, "PAUSE");
		
		// input
		this.input.keyboard.on('keydown_SPACE', event => this.togglePause() );

		//
		this.resumeGame();
    }


    togglePause() {
    	this.isPauseInactive = !this.isPauseInactive;
    	this.isPauseInactive ? this.pauseGame() : this.resumeGame();
    }

	pauseGame() {
		this.scene.setVisible(true);
		this.scene.bringToTop();
		this.events.emit('game_paused');
	}

	resumeGame() {
		this.scene.setVisible(false);
		this.scene.sendToBack();
		this.events.emit('game_resumed');
	}
}
