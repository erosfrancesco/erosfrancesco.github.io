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


export default {RoundedRectFill, RoundedRectStroke};