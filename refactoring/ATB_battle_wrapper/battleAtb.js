class _ATBPlayersTurnWrapper {
    
    constructor(options) {

        let { players, scene, onBarLoaded } = options;

        // set stat menus
        this.UI = new BattleUI({ scene, players, sceneHeight: 500 });

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
        

        
        this.Players.forEach(player => console.log(player));
        this.Players.forEach(player => player.StatusMenu.atb.bar.on('done', e => { onBarLoaded(e, player, this.Players); }) );
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
        options = options || {};
        
        let {
            players,
            enemies, 
            scene
        } = options;

        ///////////////////////////////////////////////////////////

        // player registry
        let Wrapper = new _ATBPlayersTurnWrapper({
            players,
            scene,
            onBarLoaded: (e, player, Players) => {

                if (player.ready) { return; }
                
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



        ///////////////////////////////////////////////////////////

        // Initialize the Animator
        let Animator = new ActionRegistry();

        ///////////////////////////////////////////////////////////




        super({Animator, Enemies, Players: Wrapper.Players});

        this.Animator = Animator;
        this.Enemies = Enemies;
        this.Players = Wrapper.Players;
        this.UI = Wrapper.UI;

        this.scene = scene;


        this.Players.forEach(player => {
            player.Commands = [ 
                new FightCommand({battle: this})
            ];
        });


                
    }

    endPlayerTurn(player, callback) {

        // remove menus too...

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
        
        /**/
        // manage player menu and input
		if (!this.UI.UIMenus.length) {
			this.UI.setPlayerStartMenu({player: this.Players.current, battle: this, scene: this.scene});
            
            
            setTimeout(() => {
                // set action
                console.log('building action');
                this.UI.UIMenus.current.items[0][0].onSelect();
                this.endPlayerTurn(this.Players.current, player => console.log('end turn for: ', player.name));
            }, 400);
            /**/
		}
        /**/

    }
}

