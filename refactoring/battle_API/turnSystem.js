class ATBTurnSystemCore {
    constructor(options) {

        options = options || {};

        let {
            max,
            parameters,
            formula
        } = options;

        max = max || 255;
        formula = formula || function(character) { return character.getVelocity(); };
        parameters = parameters || {};

        
        this.max = max;
        this.counter = 0;
        this.formula = formula;
        this.parameters = parameters;
    }

  
    get formula () {
        return this._formula;
    }
    set formula (v) {
        this._formula = v;
    }

    get parameters () {
        return this._parameters;
    }
    set parameters (v) {
        this._parameters = v;
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

    update(character) {
        if ( this.counter < this.max ) {
            this.counter += this.formula(character, this.parameters);
            return Boolean( this.counter >= this.max );
        }

        return false;
    }
}
