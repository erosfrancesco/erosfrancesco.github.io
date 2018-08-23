import ATBBarGraphics from './atb-bar-graphics.js';


export default class ATBPlayerBar extends ATBBarGraphics {
	constructor(options) {

		let {
			x, y,
			scene,
			player,
			width
		} = options;
        
		super({
			x, y,
			scene,
			width: width,
			height: 16
		});

		this.player = player;
	}
	/*
	update() {
		/*
		if (character.inactive) { return; }
		
		let { _atbCurrent, _atbMax, type } = character;
        
        if ( _atbCurrent < _atbMax ) {

            character._atbCurrent += this.formula(character, this.parameters);

            if (character._atbCurrent >= _atbMax) { 
            	//console.log('im ', character.name); 
            	this.onTurnReady(character);
            }
            
            if (type === 'Ally') { this.bar.percentage = (_atbCurrent * 100 / _atbMax); }
            
            return Boolean( _atbCurrent >= _atbMax );
        }
        return false;
        
    }

    stop(character) {
    	character._atbCurrent = 0;
    	character.inactive = true;
    }

	init(character) {
		character.inactive = false;
        character._atbMax = this.max;
        character._atbCurrent = 0;
	}


	get inactive() {
		return this._inactive;
	}

	set inactive(v) {
		this._inactive = v;
	}
	/**/
}