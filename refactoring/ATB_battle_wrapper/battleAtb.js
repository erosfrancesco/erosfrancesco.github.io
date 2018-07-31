class _ATBPlayersTurnWrapper extends Phaser.Events.EventEmitter {
    
    constructor(options) {

        let { players, scene, onBarLoaded } = options;
        players = players || [];

        super();

        // set stat menus
        this.UI = new BattleUI({ scene, players, sceneHeight: 500 });
        this.onBarLoaded = onBarLoaded;

        // player registry
        this.Players = new CharacterRegistry({

            characters: players,

            onRemove: player => {

                // remove from action list too...
                player.Animations.Death(player, () => {
                    console.log('im dead');
                });

                if (!this.Players.length) {
                    console.log('game over');
                }
            },
            onAdd: player => {
                player.Sprite.setInteractive();
            }
        });
        
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
            onBarLoaded: player => {

                if (player.ready) return;                
                player.ready = true;

                if (this.Players.current) return;
                this.Players.current = player;
            }
        });

        ///////////////////////////////////////////////////////////

        

        ///////////////////////////////////////////////////////////
        
        // enemy registry
        let Enemies = new CharacterRegistry({
            characters: enemies,
            onAdd: enemy => {
                enemy.Sprite.setInteractive();
            },
            onRemove: enemy => {
                enemy.Animations.Death(enemy, () => {
                    console.log('GAH!');
                });

                // game win condition
            }
        });

        ///////////////////////////////////////////////////////////




        super({ Enemies, Players: Wrapper.Players, scene});
        this.onBarLoaded = player => Wrapper.onBarLoaded(player);


        ///////////////////////////////////////////////////////////

        // Initialize the Animator
        let Animator = new ActionManager({scene, battle: this});

        ///////////////////////////////////////////////////////////



        this.Animator = Animator;
        this.Enemies = Enemies;
        this.Players = Wrapper.Players;
        this.UI = Wrapper.UI;

        this.scene = scene;

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


    applyDamageAndCheckLife(player, damage) {

        player.damage = damage;

        if (!player.life) {

            if ( player.type !== 'Ally' ) { 
                this.Enemies.remove(p => { return p === player; });
                return; 
            }

            this.Players.remove(p => { return p === player; });
            player.StatusMenu.atb.stop(player);
            if (this.Players.current === player) { 
                this.endPlayerTurn(player, () => { console.log('removed', player.name); }); 
            }
        }
    }

    displayPlayerDamage(player, damage) {
        player.displayText = new FFVIText({ 
            scene: this.scene, 
            text: damage, 
            width: 50, height: 100,
            x: player.Sprite.x,
            y: player.Sprite.y
        });
        setTimeout(() => player.displayText.destroy(), 500);
    }

    init() {
        this.UI.setPlayersMenu({
            scene: this.scene, 
            battle: this, 
            players: this.Players, 
            sceneHeight: 500,
            onBarLoaded: (player, players) => this.onBarLoaded(player, players)
        });
    }

    endPlayerTurn(player, callback) {

        // remove targets
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

