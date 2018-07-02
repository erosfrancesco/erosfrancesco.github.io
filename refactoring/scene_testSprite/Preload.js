/*
let MenuItem1 = new MenuItem({
            scene: GAME.game,
            text: 'Start Game',
            onSelect: () => { console.log('New game'); }
        });
        let MenuItem2 = new MenuItem({
            scene: GAME.game,
            text: 'Load Game',
            onSelect: () => { console.log('Load game'); }
        });
*/

// Preload scene
GAME.addScene('Preloader', {
    preload: () => {
        // set physic engine
        GAME.game.physics.startSystem(Phaser.Physics.ARCADE);


        //  37x45 is the size of each frame
	    //  There are 16 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, 
	    //  but in this case there are some blank frames at the end, so we tell the loader how many to load
	    GAME.load.spritesheet('ffviCast', '../assets/ffviCast.png', 680 / 4, 756 / 4, 16);


	    /*
	        //load game assets
		    this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
		    this.load.image('gameTiles', 'assets/images/tiles.png');
		    this.load.image('greencup', 'assets/images/greencup.png');
		    this.load.image('bluecup', 'assets/images/bluecup.png');
		    this.load.image('player', 'assets/images/player.png');
		    this.load.image('browndoor', 'assets/images/browndoor.png');
		*/
    	//GAME.load.tilemap('level1', './LevelMap.json', null, Phaser.Tilemap.TILED_JSON);
    },

    create: () => {

        let pg1 = GAME.add.sprite(GAME.world.centerX, GAME.world.centerY, 'ffviCast', 0);
        let pg2 = GAME.add.sprite(GAME.world.centerX - 200, GAME.world.centerY, 'ffviCast', 1);

       	// animation example
       	//pg.animations.add('change');
	    //pg.animations.play('change', 10, true);
	    //GAME.add.tween(pg).to({ x: 100 }, 1000, Phaser.Easing.Linear.None, true);

        // players
        let p1 = new Player({
            name: "SuperPippo",
            stats: {
            	"lif": 1300,
            	"dmg": 10,
            	"man": 999,
            	"usedMana": 10,
                "str": 50,
                "dex": 1,
                "lvl": 5
            }
        });

        let p2 = new Player({
            name: "Ndu'",
            stats: {
            	"lif": 1300,
            	"dmg": 10,
            	"man": 999,
            	"usedMana": 10,
                "str": 50,
                "dex": 1,
                "lvl": 5
            }
        });
        /**/

       
		GAME.Player1Menu = new PlayerMenu(p1);
		//GAME.Player2Menu = new PlayerMenu(p2);


		/*
		GAME.Player2Menu = new PlayerMenu({
			y: GAME.game.height * 1 / 4
		});

		GAME.Player3Menu = new PlayerMenu({
			y: GAME.game.height * 2 / 4
		});

		GAME.Player4Menu = new PlayerMenu({
			y: GAME.game.height * 3 / 4
		});
		/**/
    },

    update: () => {
    	/*
    	GAME.progress.clear();
    	
    	GAME.percentDone+=0.01;
    	//GAME.progress.drawRoundedRect(0, 0, 298 * GAME.percentDone, 25, 10);
		GAME.progress.lineStyle(2, '0xff00ff');
		GAME.progress.beginFill('0xff00ff',1);
		GAME.progress.drawRoundedRect(0, 0, 298 * GAME.percentDone, 27, 10);
		GAME.progress.endFill();
		GAME.progress.beginFill('0x999999',1) //For drawing progress
		/**/

		
		if (GAME.Player1Menu.atb.percentage < 99) {
			GAME.Player1Menu.atb.percentage++;
			GAME.Player1Menu.atb._update();

			GAME.Player2Menu.atb.percentage++;
			GAME.Player2Menu.atb._update();
		}
	}
});



/*
	preload: function () {
		this.load.image('playButton', 'assets/images/play.png');
		this.load.spritesheet('tiles', 'assets/images/tiles.png', 16, 16);
		this.load.audio('openingMusic', 'assets/sound/opening.ogg');
		game.load.tilemap('level3', 'assets/tilemaps/maps/cybernoid.json', null, Phaser.Tilemap.TILED_JSON);
	},

	create: function() {
	
	    //GAME.map = GAME.add.tilemap('level1');
	    //GAME.map.addTilesetImage('tumblr_inline_mqzmkhxgZg1qz4rgp', 'gameTiles');

	    // pg.remove(sprite, true);

	    //left = player.animations.add('left', [8,9], 10, true);
    	//right = player.animations.add('right', [1,2], 10, true);
    	//player.animations.add('up', [11,12,13], 10, true);
    	//player.animations.add('down', [4,5,6], 10, true);

    	//let bar = new Phaser.Rectangle(0, 450, 800, 50);
    	//GAME.game.debug.geom(bar,'#0fffff');
	}

/**/