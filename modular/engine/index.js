// import modules (es6)
import ColorMap from './color-map.js';
import KeyMapper from './key-mapper.js';
import GameUtilities from './game-utilities.js';


class PauseLoop extends Phaser.Scene {
	constructor(config) { config = config || {}; config.key = 'pauseLoop'; super(config); }
    create() { GameUtilities.PauseEvent(game); }
}

const config = {
	type: Phaser.AUTO,
	width: 900,
	height: 500,
	backgroundColor: '#444',
	parent: "game-container",
//	pixelArt: true,
	scene: PauseLoop,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 }
		}
	}
};

const game = new Phaser.Game(config);

export default { game, ColorMap, KeyMapper, GameUtilities };



/*
// test

class TestScene extends Phaser.Scene {
	constructor(config) {
		super(config);
    }

    preload() {
    	console.log('loading assets');

        this.load.setPath('../assets/');
        this.load.spritesheet('FFVICast', 'sprites/ffviCast.png', { frameWidth: 680 / 4, frameHeight: 756 / 4 });
    }

    create() {


		this.inputKeyb = new KeyMapper({scene: this, debounce: 4});
		this.inputKeyb.mapKey( Phaser.Input.Keyboard.KeyCodes.A, key => console.log('selected') );
		this.inputKeyb.mapKey( Phaser.Input.Keyboard.KeyCodes.S, key => console.log('deselect') );
		this.inputKeyb.removeKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.inputKeyb.noKeyPressed = () => this.sprite.setAccelerationX(0);


		this.inputKeyb.mapKey( Phaser.Input.Keyboard.KeyCodes.UP, key => this.sprite.setVelocityY(-60) );
		this.inputKeyb.mapKey( Phaser.Input.Keyboard.KeyCodes.LEFT, key => this.sprite.setAccelerationX(-160) );
		this.inputKeyb.mapKey( Phaser.Input.Keyboard.KeyCodes.RIGHT, key => this.sprite.setAccelerationX(160) );
   

        this.sprite = this.physics.add.sprite(0, 0, 'FFVICast');
       	this.sprite.x = Phaser.Math.FloatBetween(100, config.width - 100);
       	this.sprite.y = Phaser.Math.FloatBetween(100, config.height - 100);
       	this.sprite.setScale( Phaser.Math.FloatBetween(0.2, 2) )
    	this.sprite.body.setGravityY(100);
    }

    update() {
		this.inputKeyb.update();
    }
}

game.scene.add('test', TestScene, true);
/**/