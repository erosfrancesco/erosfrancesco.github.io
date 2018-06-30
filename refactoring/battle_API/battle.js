/*******************************************************************************************/
class Battle {
    constructor(options) {
        options = options || {};
        let {Animator, Enemies, Players, Turn} = options;

        this.Animator = Animator || {};
        this.Enemies = Enemies;
        this.Players = Players;
        this.Turn = Turn;

        /*
        this.forAllCharacters(character => {
            character._atbMax = this.Turn.max;
        });
        /**/
    }

    forAllCharacters(f) {
        this.Enemies.forEach((character, index) => { f(character, index); });
        this.Players.forEach((character, index) => { f(character, index); });
    }

    // set current player and enemy
    update() {
        
        // check if there is a new player turn
        if ( !this.Players.current ) {
            this.Players.current = this.Players.find( player => { return player.ready; }) || false;
        }

        // check if there is a new enemy turn
        if ( !this.Enemies.current ) {
            this.Enemies.current = this.Enemies.find( enemy => { return enemy.ready; }) || false;
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