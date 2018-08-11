class ATBBattleScene extends Phaser.Scene {
    constructor () {
        super();
    }

    preload (config) {

    	let {assets} = config;
    	this.assets = assets;

    	Object.keys(this.assets).forEach(type => {
    		let assetsOfType = this.assets[type];
    		assetsOfType.forEach(config => {
    			this.load[type](config.key, config.src, config.params); 
    			console.log('loading ', config.key);
    		});
    	});        
    }

    create (params) {

    	let {players, enemies, background} = params;

    	// Battle
        this.ATBBattle = new ATBBattle({ scene: this });
        this.playerList = [];
        this.enemyList = []; 

    	// background first and foremost.
    	let {key, config, type} = background;
		this.background = this.make[type]({key});
        Object.keys(config).forEach(p => { this.background[p] = config[p]; });

        // enemies
        enemies.forEach(enemy => this.makeEnemy(enemy) );

        // players
        players.forEach(enemy => this.makePlayer(enemy) );



        this.initBattle();

        // pause loop
        this.input.keyboard.on(__PAUSEEVENTKEYBOARDKEY, () => TogglePause(this.scene) );
    }

    update() {
        if (this.Stopped) return;
        this.ATBBattle.update();
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////


    get Stopped() {
        return this._Stopped;
    }
    set Stopped(v) {
        this._Stopped = v;
    }


    get assets() {
        return this._assets;
    }
    set assets(v) {
        this._assets = v;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////


    get ATBBattle() {
        return this._ATBBattle;
    }
    set ATBBattle(v) {
        this._ATBBattle = v;
    }


    get enemyList() {
        return this._enemyList;
    }
    set enemyList(v) {
        this._enemyList = v;
    }


    get playerList() {
        return this._playerList;
    }
    set playerList(v) {
        this._playerList = v;
    }


    makeEnemy(options) {
        let params = deepClone(options);
        let enemy = MakeEnemy(this, this.ATBBattle, params);
        enemy.id = 'e - ' + this.enemyList.length;
        this.enemyList.push(enemy);
    }

    makePlayer(options) {
        let params = deepClone(options);
        let player = MakePlayer(this, this.ATBBattle, params);
        player.id = 'p - ' + this.playerList.length;
        this.playerList.push(player);
    }


    initBattle() {
        this.ATBBattle.addCharacters(this.playerList, this.enemyList);
        this.ATBBattle.init();
    }
}
