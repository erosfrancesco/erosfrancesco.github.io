class RoundBar {
	constructor(options) {
		options = options || {};

		let {
			x,
			y,
			height,
			width,
			fill,
			color,
			line,
			scene,
			parent
		} = options;

		x = x || 0;
    	y = y || 0;
    	height = height || 12;
    	width  = width  || 160;
    	color  = color || false;
    	line   = line  || 4;
    	fill   = fill  || false;
    	parent = parent || false;

    	this.scene = scene;
    	this.width = width;
    	this.height = height;
    	this.x = x;
    	this.y = y;
    	this.fillColor   = fill;
    	this.strokeColor = color;
    	this.strokeWidth = line;
    	this.parent = parent;

    	this.update();
	}

	update() {
		if (this.round) { this.round.destroy(); }
		
		this.round = this.scene.add.graphics(this.x, this.y);

    	if (this.fillColor) {
    		this.round.beginFill(this.fillColor, 1);
    	}

    	if (this.strokeColor) {
    		this.round.lineStyle(this.strokeWidth, this.strokeColor, 1);
    	}
    	this.round.drawRoundedRect(0, 0, this.width, this.height, this.radius);
    	this.round.endFill();

    	if (this.parent) {
    		this.parent.addChild(this.round);
    	}
	}

	get width() {
		return this._width;
	}
	set width(v) {
		this._width = v;
		if (this.round) { this.round.width = v; }
	}

	get height() {
		return this._height;
	}
	set height(v) {
		this._height = v;
		this.radius = 1 + this._height / 2;
		if (this.round) { this.round.height = v; }
	}

	get radius() {
		return this._radius;
	}
	set radius(v) {
		this._radius = v;
		if (this.round) { this.round.radius = v; }
	}

	get x() {
		return this._x;
	}
	set x(v) {
		this._x = v;
		if (this.round) { this.round.x = v; }
	}

	get y() {
		return this._y;
	}
	set y(v) {
		this._y = v;
		if (this.round) {
			this.round.y = v;
		}
	}
}


class ATBDOM {
	constructor(options) {
		options = options || {};

		let {
			x,
			y,
			height,
			width,
			fill,
			color,
			line,
			scene,
			parent
		} = options;

		x = x || 0;
    	y = y || 0;
    	height = height || 12;
    	width  = width  || 160;
    	color  = color || false;
    	line   = line  || 4;
    	fill   = fill  || false;
    	parent = parent || false;

		this.shell = new RoundBar({
			x,
			y,
			height,
			width,
			color,
			line,
			scene,
			parent
		});

		this.bar = new RoundBar({
			x: 2,
			y: 2,
			height: height - 4,
			width:  1,
			fill,
			scene,
			parent: this.shell.round
		});
	}

	update() {
		this.bar.width++;
    	this.bar.width %= this.shell.width - 2;
    	this.bar.update();
	}	
}