// Preload scene
GAME.addScene('Preloader', {
    preload: () => {
        GAME.game.physics.startSystem(Phaser.Physics.ARCADE);
	    GAME.load.spritesheet('ffviCast', '../assets/ffviCast.png', 680 / 4, 756 / 4, 16);
    },

    create: () => {

        let pg1 = GAME.add.sprite(GAME.world.centerX, GAME.world.centerY, 'ffviCast', 0);
        let pg2 = GAME.add.sprite(GAME.world.centerX - 200, GAME.world.centerY, 'ffviCast', 1);

        //
        let Players = new CharacterRegistry({
            onAdd: (character, registry) => {
                character.menuIndex = registry.length - 1;
                character.menuDOM = new PlayerMenu(character);
            }
        });

        let Enemies = new CharacterRegistry();

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
                "dex": 1,
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

        Players.add(p1);
        Players.add(p2);

        let ATBParam1 = 10;
        Turn = new ATB({
            formula: function (character, options) {
                let dex = character.getVelocity();
                if (character.type === 'Ally') { dex += options.ATBParam1; }

                character.menuDOM.atb.percentage += dex;

                return dex;
            },
            parameters: { ATBParam1 }
        });

        let Animator = new ActionRegistry();

        // Battle
        GAME.Battle = new Battle({
            Animator,
            Enemies,
            Players,
            Turn
        });

        // need to set ATB System for each characters...
        GAME.Battle.forAllCharacters(character => {
            character._atbMax = this.Turn.max;
            character._atbCurrent = 0;
        });

        GAME.Battle._Turn.update = (character) => {
            console.log(character._atbCurrent);
            if ( character._atbCurrent < character._atbMax ) {
                character._atbCurrent += GAME.Battle._Turn.formula(character, GAME.Battle._Turn.parameters);
                
                if (character.type === 'Ally') {
                    character.menuDOM.atb.percentage = character._atbCurrent * 99 / character._atbMax;
                    character.menuDOM.atb._update();
                }
                
                return Boolean( character._atbCurrent >= character._atbMax );
            }
            return false;
        }
    },

    update: () => {

        GAME.Battle.update();

        // animator.update
        if (GAME.Battle._Animator._busy) { return; }
        GAME.Battle._Animator.resolve(); 


        if (!GAME.Battle.Players.current) { return; }

        // input and menu actions

        // load action
        GAME.Battle.Players.current.Action = {
            executor: {name: 'exeggutor'},
            targets: [{name: 'palmapalmapalma'}],
            
            resolve: function(callback) {
                console.log(this.executor.name);
                this.targets.forEach(target => console.log(target.name));
                setTimeout(() => {
                    console.log('DONE');
                    GAME.Battle.Players.current.ready = false;
                    GAME.Battle.Players.current._atbCurrent = 0;
                    GAME.Battle.Players.current = false;
                    callback(); 
                }, 2000);
            }
        };

        GAME.Battle._Animator.add( GAME.Battle.Players.current.Action );

	}
    
});