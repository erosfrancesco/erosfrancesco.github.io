const _default_max = 255;
function AtbValueFormula(character) {
    
    // ally
    if ( character.isAlly() ) {
        return ( 20 + character.getVelocity() );
    }

    // enemy
    return ( character.getVelocity() );
}



export default class ATBCharacterBridge {
    
    constructor(options) {
        let {character, onReady} = options;
        
        this.character = character;
        this.onReady = onReady;
        this.max = _default_max;
        this.counter = 0;
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




    update() {

        if (this.character.ready) return;

        this.counter += AtbValueFormula(this.character); // here the formula
        
        if (this.counter > this.max) { 
            this.character.ready = true; 
            this.onReady(this.character); 
        }
    }
}

