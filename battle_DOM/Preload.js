// Preload scene
GAME.addScene('Preloader', {
    preload: () => {
        GAME.game.physics.startSystem(Phaser.Physics.ARCADE);
	    GAME.load.spritesheet('ffviCast', '../assets/ffviCast.png', 680 / 4, 756 / 4, 16);
    },

    create: () => {

        // sprites
        let pg1 = GAME.add.sprite(GAME.world.centerX, GAME.world.centerY, 'ffviCast', 0);
        let pg2 = GAME.add.sprite(GAME.world.centerX - 200, GAME.world.centerY, 'ffviCast', 2);

        // players
        let p1 = new Player({
            name: "SuperPippo",
            sprite: pg1,
            stats: {
            	"lif": 1300,
            	"dmg": 10,
            	"man": 999,
            	"usedMana": 10,
                "str": 50,
                "dex": 2,
                "lvl": 5
            }
        });

        let p2 = new Player({
            name: "Ndu'",
            sprite: pg2,
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

        // Battle
        GAME.Battle = new ATBBattle({
            players: [p1, p2],
            enemies: []
        });
    },

    update: () => {
        GAME.Battle.update();
	}
    
});