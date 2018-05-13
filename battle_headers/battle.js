/*******************************************************************************************/
class Battle {
    constructor(options) {
        options = options || {};
        let {Animator, Enemies, Players, Turn} = options;

        this.Animator = Animator || {};
        this.Enemies = Enemies;
        this.Players = Players;
        this.Turn = Turn;

        this.forAllCharacters(character => {
            character._atbMax = this.Turn.max;
        });
    }

    forAllCharacters(f) {
        this.Enemies.forEach((character, index) => { f(character, index); });
        this.Players.forEach((character, index) => { f(character, index); });
    }

    update() {

        // ATB and Turn Order resolution
        this.forAllCharacters( character => {
            if ( character.ready ) { return; }
            if ( this.Turn.update(character) ) { character.ready = true; }
        });
        
        // check if there is a new player turn
        if ( !this.Players.current ) {
            this.Players.current = this.Players.getPlayer( player => { return player.ready; }) || false;
            //console.log(this.Players.current.name); // test
        }

        // check if there is a new enemy turn
        if ( !this.Enemies.current ) {
            this.Enemies.current = this.Enemies.getPlayer( enemy => { return enemy.ready; }) || false;
        }
    }

    get Animator() {
        return this._Animator;
    }
    set Animator(v) {
        this._Animator = v;
    }

    get Enemies() {
        return this._Enemies;
    }
    set Enemies(v) {
        this._Enemies = v;
    }

    get Players() {
        return this._Players;
    }
    set Players(v) {
        this._Players = v;
    }

    get Turn() {
        return this._Turn;
    }
    set Turn(v) {
        this._Turn = v;
    }
}


/*
// Boot scene
GAME.addScene('Preloader', {
    preload: () => {
        // set physic engine
        GAME.game.physics.startSystem(Phaser.Physics.ARCADE);
        GAME.Win = function() {
            console.log('You win!')
        }
        GAME.Over = function() {
            console.log('You lose');
        }
    },

    create: () => {

        // players
        let p1 = new Player({
            commands: {},
            name: "SuperPippo",
            stats: {
                "str": 50,
                "dex": 1,
                "lvl": 5
            },
            sprite: {}
        });
        //p1.Statuses.set('haste', true);

        // enemies
        let e1 = new Enemy({
            commands: {},
            name: 'BigBadFox',
            stats: {
                "str": 50,
                "dex": 1,
                "lvl": 5
            },
            sprite: {}
        });


        // player registry
        let Players = new CharacterRegistry({
            characters: [p1],
            onRemove: (player) => {
                player.setDeadStatus();
                if (!Player.length) {
                    GAME.Over();
                }
            }
        });

        // enemy registry
        let Enemies = new CharacterRegistry({
            characters: [e1],
            onRemove: (enemy) => {
                enemy.setDeadStatus();
                if (!GAME.Enemies.length) {
                    GAME.Win();
                }
            }
        });
        
        // Set the turn system
        let ATBParam1 = 10;
        let Turn = new ATB({
            formula: function (character, options) {
                let dex = character.getVelocity();
                if (character.type === 'Ally') {
                    dex += options.ATBParam1;
                }
                return dex;
            },
            parameters: { ATBParam1 }
        });

        // set the Animator
        let Animator = new PhaserAnimator();

        // Battle
        GAME.Battle = new Battle({
            Animator,
            Enemies,
            Players,
            Turn
        });


    },

    update: () => {

        // animator check
        if (GAME.Battle.Animator.busy) { return; }
        GAME.Battle.update();
          
    }
});
/**/