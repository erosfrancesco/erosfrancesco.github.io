class ATBLoadingBar extends Phaser.Events.EventEmitter {
	constructor(options) {

		// used for background and outline
		function graphicOptions(graphics) {
    		graphics.lineStyle(2, 0x929292, 1);
			graphics.fillStyle( 0xD2D2D2, 0.5 );
    	}

		options = options || {};

		super();

		let {
			x,
			y,
			scene,
			width,
		} = options;

		x = x || 0;
    	y = y || 0;
    	
    	this.height = 16;
    	this.width = width || 160;
    	this.scene = scene;


    	let graphics = this.scene.add.graphics();
    	graphicOptions(graphics);

		
		this.outline = new RoundedRectFill({
			graphics, 
			graphicsBar: graphics, 
			graphicsEnd: graphics,
			x, y, 
			width: this.width, height: this.height,
			fullWidth: width
		});

		this.background = new RoundedRectStroke({graphics, x, y, width: this.width, height: this.height});

    	this.bar = new ATBBar({x, y, width, height:16, scene});

    	this.x = x;
    	this.y = y;
    	this.percentage = 0;
	}

	set x(v) {
		this.background.x = v;
		this.outline.x = v;
		this.bar.x = v;
	}

	set y(v) {
		this.background.y = v;
		this.outline.y = v;
		this.bar.y = v;
	}


	set percentage(v) {
		this.bar.percentage = v;

		if (v > 99) {
			this.emit('done', {});
			this.tint = 0x12FF32;
		}else{
			this.tint = 0x3252D2;
		}
	}

	get percentage() {
		return this.bar.percentage;
	}

	set tint(v) {
		this.bar.tint = v;
	}

	get tint() {
		return this.bar.tint;
	}

}


class ATBBar {
	constructor(options) {
		let {
			scene,
			width, height,
			x, y
		} = options;

		this.scene = scene;
		this.height = height;
		this.width = width;


    	function graphicOptions1(graphics) {
    		graphics.fillStyle( 0xD2D2D2, 1 );
    	}


		let graphics1 = this.scene.add.graphics();
		graphicOptions1(graphics1);

		let graphics2 = this.scene.add.graphics();
		graphicOptions1(graphics2);

		let graphics3 = this.scene.add.graphics();
		graphicOptions1(graphics3);


		graphics2.beginPath();
		graphics2.arc( width, height / 2, height / 2, Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(-90) );
		graphics2.closePath();
		this.startEclipse = graphics2.fillPath();

		graphics1.beginPath();
		graphics1.arc( width, height / 2, height / 2, Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(-90), true );
		this.endEclipse = graphics1.fillPath();

		this.middleRect = graphics3.fillRect( 0, 0, width, height );


		
		this.startEclipse.generateTexture('ATB-Start', width, height );
		this.middleRect.generateTexture('ATB-Middle', width, height );
		this.endEclipse.generateTexture('ATB-End', width + height, height );
		
		
		graphics1.destroy();
		graphics2.destroy();
		graphics3.destroy();
		/**/


		this.barStart  = this.scene.add.image( 0, 0, 'ATB-Start' );
		this.barMiddle = this.scene.add.image( 0, 0, 'ATB-Middle' );
		this.barEnd    = this.scene.add.image( 0, 0, 'ATB-End' );

	}

	get x() {
		return this._x;
	}

	set x(v) {
		this._x = v;
		this.barStart.x  = v - ( this.width / 2 );
		this.barMiddle.x = v + ( this.width / 2 );
		this.barEnd.x    = v + ( this.height + this.width ) / 2 ;
	}

	get y() {
		return this._y;
	}

	set y(v) {
		this._y = v;
		this.barStart.y  = v;
		this.barMiddle.y = v;
		this.barEnd.y    = v;
	}


	set percentage(v) {
		this._percentage = v;

		let factor = v / 100;
		
		this.barMiddle.scaleX = factor;
		this.barMiddle.x = this.x + ( factor * this.width / 2 );
		this.barEnd.x    = this.x - 1 + ( factor * this.width ) - ( (this.width - this.height) / 2 );
	}

	get percentage() {
		return this._percentage;
	}

	set tint(v) {
		this._tint = v;
		this.barStart.setTint(v);
		this.barMiddle.setTint(v);
		this.barEnd.setTint(v);
	}

	get tint() {
		return this._tint;
	}
}


class RoundedRectStroke {
	constructor(options) {

		let { width, height, graphics } = options;

		graphics.beginPath();
		graphics.arc( 0, 0, height / 2, Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(-90) );
		graphics.closePath();
		this.startEclipse = graphics.strokePath();

		graphics.beginPath();
		graphics.arc( width, 0, height / 2, Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(-90), true );
		this.endEclipse = graphics.strokePath();
		graphics.closePath();

		graphics.beginPath();
		graphics.moveTo(0, -height / 2);
	    graphics.lineTo(width, -height / 2);
		graphics.closePath();
		this.topLine = graphics.strokePath();
		
		graphics.beginPath();
		graphics.moveTo(0, height / 2);
	    graphics.lineTo(width, height / 2);
		this.bottomLine = graphics.strokePath();
	}

}


class RoundedRectFill {
	constructor(options) {

		let { width, height, graphics, graphicsBar, graphicsEnd } = options;


		this.graphics = graphics;
		this.graphicsBar = graphicsBar || graphics;
		this.graphicsEnd = graphicsEnd || graphics;

		this.fullWidth = width;
		this.height = height;


		this.graphics.beginPath();
		this.graphics.arc( 0, 0, height / 2, Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(-90) );
		this.graphics.closePath();
		this.startEclipse = graphics.fillPath();

		this.graphicsEnd.beginPath();
		this.graphicsEnd.arc( width, 0, height / 2, Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(-90), true );
		this.endEclipse = graphicsEnd.fillPath();

		this.middleRect = this.graphicsBar.fillRect( 0, -height / 2, width, height );

	}


	set x(v) {
		this._x = v;

		this.startEclipse.x = v;
		this.endEclipse.x = v;
		this.middleRect.x = v;
	}

	set y(v) {
		this._y = v;

		this.startEclipse.y = v;
		this.endEclipse.y = v;
		this.middleRect.y = v;
	}


	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}


	set width(v) {
		this._width = v;
	}

	get width() {
		return this._width;
	}
}



/**/
class ATBPlayerBridge extends ATBTurnSystemCore {
	constructor(options) {

		options = options || {};
		
		let {
			parameters, formula, max, 
			x, y,
			scene,
			width
		} = options;
        
		super({});

		this.bar = new ATBLoadingBar({
			x, y,
			scene,
			width
		});

		parameters = parameters || { ATBParam1: 10 };
        max = max || 4096;
		formula = formula || function (character, options) {

            let dex = character.getVelocity();
            let {ATBParam1} = options;
            
            if (character.type === 'Ally') { dex += ATBParam1; }

            return dex;
        };

        this.parameters = parameters;
        this.max = max;
        this.formula = formula;

	}

	update(character) {
		
		let { _atbCurrent, _atbMax, type } = character;
        
        if ( _atbCurrent < _atbMax ) {

            character._atbCurrent += this.formula(character, this.parameters);
            
            if (type === 'Ally') { this.bar.percentage = (_atbCurrent * 100 / _atbMax); }
            
            return Boolean( _atbCurrent >= _atbMax );
        }
        return false;
    }

	init(character) {
        character._atbMax = this.max;
        character._atbCurrent = 0;
	}
}