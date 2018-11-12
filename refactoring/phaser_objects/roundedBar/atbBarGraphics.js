import ROUNDED from './roundedRect.js';
const {RoundedRectFill, RoundedRectStroke} = ROUNDED;


//import ColorsMap from '../../colorMap.js';
const Color1 = "0x118811";//ColorsMap.toHex('olive');
const Color2 = "0xA2D2A2";//ColorsMap.toHex('silver');

function graphicOptions1(graphics) { graphics.fillStyle(Color2, 1 ); }

function GradientOptions(obj) {
	obj.alphaBottomLeft = 0.3;
	obj.alphaBottomRight = 0.3;
	obj.tint = Color2;
}

//
function ATBBarLeftGraphic(scene, width, height) {

	const graphic = scene.add.graphics();
	graphicOptions1(graphic);
	
	graphic.beginPath();
	graphic.arc( height, height / 2, height / 2, Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(-90) );
	graphic.closePath();

	const a = graphic.fillPath();
	a.generateTexture('ATB-Start', height, height );
	graphic.destroy();

	const ret = scene.add.image( 0, 0, 'ATB-Start' );
    scene.physics.world.enable([ret]);
	return ret;
}

function ATBBarRightGraphic(scene, width, height) {

	const img = scene.add.image( 0, 0, 'ATB-Start' );
	img.scaleX = -1;
	scene.physics.world.enable([img]);
	return img;

	/*
	const graphic = scene.add.graphics();
	graphicOptions1(graphic);

	graphic.beginPath();
	graphic.arc( width - height, height / 2, height / 2, Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(-90), true );
	graphic.closePath();

	const a = graphic.fillPath();
	a.generateTexture('ATB-End', width + (height * 2), height );
	graphic.destroy();

	return scene.add.image( 0, 0, 'ATB-End' );
	/**/
}

function ATBBarMiddleGraphic(scene, width, height) {
	const graphic = scene.add.graphics();
	graphicOptions1(graphic);

	const a = graphic.fillRect( 0, 0, width, height );
	a.generateTexture('ATB-Middle', width, height );
	graphic.destroy();
	
	const ret = scene.add.image( 0, 0, 'ATB-Middle' );
	scene.physics.world.enable([ret]);
	return ret;
}



export default class ATBBarGraphics {
	constructor(options) {
		const {
			scene,
			width, height,
			x, y
		} = options;


		this.barStart1  = ATBBarLeftGraphic(scene, width, height);
		this.barStart   = ATBBarLeftGraphic(scene, width, height);
		
		this.barMiddle1 = ATBBarMiddleGraphic(scene, width, height);
		this.barMiddle  = ATBBarMiddleGraphic(scene, width, height);

		this.barEnd1    = ATBBarRightGraphic(scene, width, height);
		this.barEnd     = ATBBarRightGraphic(scene, width, height);

		
		this.scene = scene;
		this.height = height;
		this.width = width;
		this.x = x;
		this.y = y;

		GradientOptions(this.barStart);
		GradientOptions(this.barMiddle);
		GradientOptions(this.barEnd);


		this.tint = Color1; //ColorsMap.toHex('olive');

	}

	get x() {
		return this._x;
	}

	set x(v) {
		this._x = v;
		this.barStart.x  = v - (this.width / 2);
		this.barMiddle.x = v + (this.width / 2);
		this.barEnd.x    = v + (this.width / 2) + (this.height * 2);

		this.barStart1.x = this.barStart.x;
		this.barMiddle1.x = this.barMiddle.x;
		this.barEnd1.x = this.barEnd.x;
	}

	get y() {
		return this._y;
	}

	set y(v) {
		this._y = v;
		this.barStart.y  = v;
		this.barMiddle.y = v;
		this.barEnd.y    = v;

		this.barStart1.y = this.barStart.y;
		this.barMiddle1.y = this.barMiddle.y;
		this.barEnd1.y = this.barEnd.y;
	}


	set percentage(v) {
		this._percentage = v;

		const factor = v / 100;

		this.barMiddle.scaleX = factor;

		this.barStart.x  = this.x;
		this.barMiddle.x = this.x + this.height / 2 + ( this.barMiddle.displayWidth / 2 );
		this.barEnd.x    = this.x 
								+ this.height // because of the flipX
								+ (this.barMiddle.displayWidth);

		this.barMiddle1.scaleX = factor;
		this.barStart1.x = this.barStart.x;
		this.barMiddle1.x = this.barMiddle.x;
		this.barEnd1.x = this.barEnd.x;
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
	
	set gradientTint(v) {
		this._gradientTint = v;

		this.barStart1.setTint(v);
		this.barMiddle1.setTint(v);
		this.barEnd1.setTint(v);
	}

	get gradientTint() {
		return this._gradientTint;
	}
}