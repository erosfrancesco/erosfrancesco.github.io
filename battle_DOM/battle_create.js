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

        this.Players.forEach(player => {
            player.Commands = [ 
                    new FightCommand({battle: this})
                ];
        })
        //
                
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

        if (!this.currentMenu) {
            this.currentMenu = new PlayerBattleMenu({
                player: this.Players.current,
                game: GAME,
                battle: this
            });
            GAME.setInput(this.currentMenu.input);
        }

       

        // test
        //LoadPlayerAction(this, GAME);
        
    }
}

/*
function LoadPlayerAction(battle, game) {

    let target = battle.Players.getPlayer(p => { return p.menuIndex === 1 });
    /*
    battle.Players.current.Action = new TestActionObject({
        executor: battle.Players.current,
        targets:  [ target ],
        battle
    });
    /**//*

    // load into animator
    battle.Animator.add( battle.Players.current.Action );
}


/**/
