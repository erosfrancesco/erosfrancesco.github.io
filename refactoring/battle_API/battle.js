/*******************************************************************************************/
class Battle {
    constructor(options) {

        let {Animator, Enemies, Players, Turn, scene} = options;

        this.Animator = Animator || {};
        this.Enemies = Enemies;
        this.Players = Players;
        this.Turn = Turn;
        this.Input = new KeyInputMapper({ scene });
    }

    

    forAllCharacters(f) {
        this.Enemies.forEach((character, index) => { f(character, index); });
        this.Players.forEach((character, index) => { f(character, index); });
    }

    // set current player and enemy
    update(callback) {

        // check if there is a new player turn
        if ( !this.Players.current ) {
            //let player = this.Players.find( player => { return player.ready } ) || false;
            this.Players.current = this.Players.queue[0]; //player;
        }

        // check if there is a new enemy turn
        if ( !this.Enemies.current ) {
            
            let enemy = this.Enemies.find( enemy => { return enemy.ready; }); 
            this.Enemies.current = enemy || false;
        }

        callback();
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

    get Input() {
        return this._Input;
    }
    set Input(v) {
        this._Input = v;
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