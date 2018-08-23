import ATBCharacterBridge from './atb-system.js';

export default class AtbBattle {

    constructor(options) {

        let {Animator, Enemies, Players, onCharacterUpdate, scene} = options;

        //this.Animator = Animator || {};
        this.Enemies = Enemies;
        this.Players = Players;
        this.onCharacterUpdate = onCharacterUpdate || function () {};

        this.forAllCharacters(character => { 
            character.TurnSystem = new ATBCharacterBridge({
                character, 
                onReady: () => {
                    if (character.isAlly()) { this.Players.queue.push(character); return; }
                    this.Enemies.queue.push(character);
                }
            }); 
        });



        //this.forAllCharacters(character => {console.log(character)});
        
        //this.Input = new KeyInputMapper({ scene });
    }

    

    forAllCharacters(f) {
        //this.Enemies.forEach((character, index) => f(character, index) );
        //this.Players.forEach((character, index) => f(character, index) );
    }

    // set current player and enemy
    update(callback) {

        // update character atb
        this.forAllCharacters(character => { 
            character.TurnSystem.update(); 
            this.onCharacterUpdate(character); 
        });

        //console.log(this.Players.queue);
        
        // check if there is a new player turn
        if ( !this.Players.current && this.Players.queue[0] ) { 
            this.Players.current = this.Players.queue[0]; 
            console.log(this.Players.current.name, ' ally is ready');
        }

        // check if there is a new enemy turn
        if ( !this.Enemies.current && this.Enemies.queue[0]) { 
            this.Enemies.current = this.Enemies.queue[0];
            console.log(this.Enemies.current.name, ' enemy is ready');
        }

        callback();
        /**/
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

    get onCharacterUpdate() {
        return this._onCharacterUpdate;
    }
    set onCharacterUpdate(v) {
        this._onCharacterUpdate = v;
    }
}