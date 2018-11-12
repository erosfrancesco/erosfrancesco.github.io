const _default_max = 255;
function ComputeAtbDelta(character) {
    // ally
    if ( character.ally ) {
        return ( 2 + character.getVelocity() );
    }

    // enemy
    return ( character.getVelocity() );
}

export default class ATBCharacterBridge {
    
    constructor({
        character, 
        onReady = function(c) {}, 
        inactive = false
    }) {
       
        this.character = character;
        this.onReady = onReady;
        this.max = _default_max;
        this.counter = 0;
        this.inactive = inactive;
    }


    update(callback) {

        if (this.character.ready || this.inactive) return;

        this.counter += ComputeAtbDelta(this.character);
        
        if (this.counter >= this.max) { 
            this.counter = this.max;
            this.character.ready = true;
            this.onReady(this.character); 
        }

        callback(this.character);
    }

    stop() {
        this.reset();
        this.pause();
    }

    reset() {
        this.counter = 0;
    }

    pause() {
        this.inactive = true;
    }

    init() {
        this.inactive = false;
    }
}

