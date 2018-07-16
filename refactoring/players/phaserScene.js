class ATBBattleScene extends Phaser.Scene {

    constructor (config) {
        super(config);
    }

    preload () {}

    create () {

        // Battle
        this.ATBBattle = new ATBBattle({ scene: this });

        this.playerList = [];
        this.enemyList = []; 
    }

    update() {
        this.ATBBattle.update();
    }


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
        let enemy = MakeEnemy(this, this.ATBBattle, options);
        this.enemyList.push(enemy);
    }

    makePlayer(options) {
        let player = MakePlayer(this, this.ATBBattle, options);
        this.playerList.push(player);
    }


    initBattle() {
        this.ATBBattle.addCharacters(this.playerList, this.enemyList);
        this.ATBBattle.init();
    }
}
