const _default_max = 255;
function AtbValueFormula(character) {

    
    // ally
    if ( character.isAlly() ) {
        return ( 2 + character.getVelocity() );
    }

    // enemy
    return ( character.getVelocity() );
}



export default class ATBCharacterBridge {
    
    constructor(options) {
        let {character, onReady, inactive} = options;
        
        this.character = character;
        this.onReady = onReady;
        this.max = _default_max;
        this.counter = 0;
        this.inactive = inactive || false;
    }



    get character () {
        return this._character;
    }
    set character (v) {
        this._character = v;
    }

    get max () {
        return this._max;
    }
    set max (v) {
        this._max = v;
    }

    get counter () {
        return this._counter;
    }
    set counter(v) {
        this._counter = v;
    }

    get onReady () {
        return this._onReady;
    }
    set onReady(v) {
        this._onReady = v;
    }




    update(callback) {

        if (this.character.ready || this.inactive) return;

        this.counter += AtbValueFormula(this.character); // here the formula
        
        if (this.counter >= this.max) { 
            this.counter = this.max;
            this.character.ready = true;
            this.onReady(this.character); 
        }

        callback(this.character);
    }




    //
    stop() {
        this.counter = 0;
        this.inactive = true;
    }

    pause(character) {
        this.inactive = true;
    }

    init(character) {
        this.inactive = false;
    }


    get inactive() {
        return this._inactive;
    }

    set inactive(v) {
        this._inactive = v;
    }
}

