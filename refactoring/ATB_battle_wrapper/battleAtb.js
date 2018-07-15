class _ATBPlayersTurnWrapper {
    
    constructor(options) {

        let { players, scene, onBarLoaded } = options;
        players = players || [];

        // set stat menus
        this.UI = new BattleUI({ scene, players, sceneHeight: 500 });
        this.onBarLoaded = onBarLoaded;

        // player registry
        this.Players = new CharacterRegistry({

            characters: players,

            onRemove: player => {
                player.setDeadStatus();
                if (!this.Player.length) {
                    console.log('game over');
                }
            }
        });
        
        this.Players.forEach(player => player.StatusMenu.atb.bar.on('done', e => { onBarLoaded(e, player, this.Players); }) );
    }

    set onBarLoaded(v) {
        this._onBarLoaded = v;
    }
    get onBarLoaded() {
        return this._onBarLoaded;
    }

    set Players(v) {
        this._Players = v;
    }
    get Players() {
        return this._Players;
    }

    set UI(v) {
        this._UI = v;
    }
    get UI() {
        return this._UI;
    }
};



class ATBBattle extends Battle {
    constructor(options) {
        
        let {
            players,
            enemies, 
            scene, 
            input
        } = options;


        ///////////////////////////////////////////////////////////

        // player registry
        let Wrapper = new _ATBPlayersTurnWrapper({
            players,
            scene,
            onBarLoaded: (e, player, Players) => {

                if (player.ready) return;
                
                player.ready = true;
                Players.current = Players.current || player;
                console.log('turn on ', player.name);
            }
        });

        ///////////////////////////////////////////////////////////

        

        ///////////////////////////////////////////////////////////
        
        // enemy registry
        let Enemies = new CharacterRegistry({
            characters: enemies
        });

        ///////////////////////////////////////////////////////////




        super({ Enemies, Players: Wrapper.Players, scene});
        this.onBarLoaded = (e, player, players) => { Wrapper.onBarLoaded(e, player, players); }


        ///////////////////////////////////////////////////////////

        // Initialize the Animator
        let Animator = new ActionManager({scene, battle: this});

        ///////////////////////////////////////////////////////////



        this.Animator = Animator;
        this.Enemies = Enemies;
        this.Players = Wrapper.Players;
        this.UI = Wrapper.UI;

        this.scene = scene;


        /*
        this.Players.forEach(player => {
            player.Commands = [ 
                new FightCommand({battle: this, scene}),
                new ItemsCommand({battle: this, scene})
            ];
        });
        /**/

        /////////////////////////////////////////////////////////////////////////////

        // input
        this.Input.mapKey(Phaser.Input.Keyboard.KeyCodes.Z, key => {
            let currentMenu = this.UI.UIMenus.current;
            if (!currentMenu) return;
            // build action
            currentMenu.currentItem.onSelect({battle: this, scene});
        });

        this.Input.mapKey(Phaser.Input.Keyboard.KeyCodes.X, key => {
            let menuRegistry = this.UI.UIMenus;
            if (!menuRegistry.current) return;
            if (menuRegistry.length > 1) menuRegistry.remove();
            
        });
        
        
        this.Input.mapKey(Phaser.Input.Keyboard.KeyCodes.UP, key => { 
            //let currentMenu = this.UI.UIMenus.current;
            //if (currentMenu) currentMenu.up(); 
        });
        
        this.Input.mapKey(Phaser.Input.Keyboard.KeyCodes.DOWN, key => {
            //let currentMenu = this.UI.UIMenus.current;
            //if (currentMenu) currentMenu.down(); 
        });
        
        this.Input.mapKey(Phaser.Input.Keyboard.KeyCodes.LEFT, key => {
            let currentMenu = this.UI.UIMenus.current;
            if (currentMenu) currentMenu.up(); 
        });
        
        this.Input.mapKey(Phaser.Input.Keyboard.KeyCodes.RIGHT, key => {
            let currentMenu = this.UI.UIMenus.current;
            if (currentMenu) currentMenu.down(); 
        });

        /////////////////////////////////////////////////////////////////////////////
                
    }

    addCharacters(players, enemies) {
        players.forEach(player => this.Players.add(player) );
        enemies.forEach(enemie => this.Enemies.add(enemie) );
    }

    init() {
        this.UI.setPlayersMenu({
            scene: this.scene, 
            battle: this, 
            players: this.Players, 
            sceneHeight: 500,
            onBarLoaded: (e, player, players) => this.onBarLoaded(e, player, players)
        });
    }

    endPlayerTurn(player, callback) {

        this.UI.UIMenus.reset();

        player.ready = false;
        player.Action = false;
        player._atbCurrent = 0;
        this.Players.current = false;
        this.Animator._busy = false;

        callback(player);
    }

    endEnemyTurn(callback) {
        this.Enemies.current._atbCurrent = 0;
    }

    update() {

        this.Input.update();

        // battle.update and animator.update
        if (this.Animator._busy) { return; } 

        // resolve atb
        this.Players.forEach( player => player.StatusMenu.turnUpdate() );
        
        super.update();
        this.Animator.resolve();


        // check if there is an action that needs to be loaded or resolved
        if (!this.Players.current) { return; }
        //console.log(this.Players.current.name);
        if (this.Players.current.Action) { return; }
        
        // menu
		if (!this.UI.UIMenus.length) {
			this.UI.setPlayerStartMenu({player: this.Players.current, battle: this, scene: this.scene});
		}

    }
}

