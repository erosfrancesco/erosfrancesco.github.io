import ColorsMap from '../colorMap.js';
import ROUNDED from './rounded-rect.js';
let {RoundedRectFill, RoundedRectStroke} = ROUNDED;


function graphicOptions1(graphics) { graphics.fillStyle( ColorsMap.toHex('olive'), 1 ); }

function GradientOptions(obj) {
	obj.alphaBottomLeft = 0;
	obj.alphaBottomRight = 0;
	obj.tint = ColorsMap.toHex('silver');
}

//
function ATBBarLeftGraphic(scene, width, height) {

	let graphic = scene.add.graphics();
	graphicOptions1(graphic);
	
	graphic.beginPath();
	graphic.arc( width, height / 2, height / 2, Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(-90) );
	graphic.closePath();

	let a = graphic.fillPath();
	a.generateTexture('ATB-Start', width, height );
	graphic.destroy();

	return scene.add.image( 0, 0, 'ATB-Start' );
}

function ATBBarRightGraphic(scene, width, height) {

	let graphic = scene.add.graphics();
	graphicOptions1(graphic);

	graphic.beginPath();
	graphic.arc( width - height, height / 2, height / 2, Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(-90), true );
	graphic.closePath();

	let a = graphic.fillPath();
	a.generateTexture('ATB-End', width + height, height );
	graphic.destroy();

	return scene.add.image( 0, 0, 'ATB-End' );
}

function ATBBarMiddleGraphic(scene, width, height) {
	let graphic = scene.add.graphics();
	graphicOptions1(graphic);

	let a = graphic.fillRect( 0, 0, width, height );
	a.generateTexture('ATB-Middle', width, height );
	graphic.destroy();
	return scene.add.image( 0, 0, 'ATB-Middle' );
}



export default class ATBBarGraphics {
	constructor(options) {
		let {
			scene,
			width, height,
			x, y,
			onBarLoaded
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


		this.tint = ColorsMap.toHex('olive');

	}

	get x() {
		return this._x;
	}

	set x(v) {
		this._x = v;
		this.barStart.x  = v - (this.height / 4) - (this.width / 2);
		this.barMiddle.x = v + (this.width / 2);
		this.barEnd.x    = v - (this.height / 4) + (this.width / 2);

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

		let factor = v / 100;

		//console.log(v);
		
		this.barMiddle.scaleX = factor;

		this.barMiddle.x = this.x - ( this.height / 4 ) + ( this.barMiddle.displayWidth / 2 );
		this.barEnd.x    = this.x + this.height + this.barMiddle.displayWidth - (( - 7.5 + this.width) / 2 );

		this.barMiddle1.scaleX = factor;
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