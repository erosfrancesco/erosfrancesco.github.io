class BattleUI {
	constructor(options) {
		options = options || {};

        let {scene, players, sceneHeight } = options;

        // Menu stack
        // ATB status
        // optional banner
        this.Menus = new MenuRegistry();
        this.UIMenus = new MenuRegistry();

        players.forEach((player, playerIndex) => {
            
            let menu = new PlayerMenu({ 
                scene, 
                player, 
                sceneHeight, 
                numberOfPlayers: players.length, 
                playerIndex 
            });
            this.Menus.add(menu);
            player.StatusMenu = menu;
        });

	}

    setPlayerStartMenu(options) {
        let { player, battle, scene } = options;
        let menu = new PlayerBattleMenu({ player, battle, scene });

        console.log('set up', menu, this.UIMenus);


        this.UIMenus.add(menu);
    }

    resetMenus() {
        this.Menus.reset();    
    }

}