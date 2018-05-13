class ATBBattle extends Battle {
    constructor(options) {
        options = options || {};
        
        let {
            players,
            enemies
        } = options;

        // player registry
        let Players = new CharacterRegistry({
            onAdd: (character, registry) => {
                character.menuIndex = registry.length - 1;
                character.menuDOM = new PlayerMenu(character);
            }
            // onRemove
        });

        players.forEach(player => Players.add(player) );

        ///////////////////////////////////////////////////////////
        
        // enemy registry
        let Enemies = new CharacterRegistry({
            // onAdd
            // onRemove
        });

        enemies.forEach(enemy => Enemies.add(enemy) );

        ///////////////////////////////////////////////////////////

        // Initialize turn system
        let Turn = new ATBWrapper({max: 2255});

        ///////////////////////////////////////////////////////////

        // Initialize the Animator
        let Animator = new ActionRegistry();

        ///////////////////////////////////////////////////////////

        super({Animator, Enemies, Players, Turn});

        this.Animator = Animator;
        this.Enemies = Enemies;
        this.Players = Players;
        this.Turn = Turn;
        this.Turn.init(this); 
    }

    endPlayerTurn(player, callback) {

        // remove menus too...

        player.ready = false;
        player.Action = false;
        player._atbCurrent = 0;
        this.Players.current = false;
        this.Animator._busy = false;
    }

    endEnemyTurn(callback) {
        this.Enemies.current._atbCurrent = 0;
    }

    update() {

        // battle.update and animator.update
        if (this.Animator._busy) { return; }    
        super.update();
        this.Animator.resolve();

        // check if there is an action that needs to be loaded or resolved
        if (!this.Players.current) { return; }
        if (this.Players.current.Action) { return; }


        // manage player menu input here


        // test
        LoadPlayerAction(this, GAME);
        
    }
}


function LoadPlayerAction(battle, game) {

        battle.Players.current.Action = {
            executor: battle.Players.current,
            targets: [{name: 'palmapalmapalma'}],
            battle,
            
            resolve: function(callback) {

                ApplySpriteTint(this.executor.Sprite, 0xff00ff);

                setTimeout(() => {
                    ApplySpriteTint(this.executor.Sprite, 0xffffff);
                    this.battle.endPlayerTurn(this.executor);
                    callback();
                }, 2000);
            }
        };

        // load into animator
        battle.Animator.add( battle.Players.current.Action );
}



function ApplySpriteTint(sprite, color) {
    sprite.tint = color;
}