class BattleUI {
	constructor(options) {
		options = options || {};

        let {players, battle} = options;

        // Menu stack
        // ATB status
        // optional banner
        this.Menus = new MenuRegistry();

	}

    setPlayerStartMenu(options) {
        let { player, battle } = options;
        let menu = new PlayerBattleMenu({ player, battle, scene: GAME.game });

        this.Menus.add(menu);
        GAME.setInput(menu.input);
    }

    resetMenus() {
        this.Menus.reset();    
    }

}