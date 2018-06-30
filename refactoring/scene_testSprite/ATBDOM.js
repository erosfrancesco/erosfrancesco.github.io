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
    	this.fillColor   = fill;
    	this.strokeColor = color;
    	this.strokeWidth = line;
    	this.parent = parent;
    	this.x = x;
    	this.y = y;

    	this._DOM = this.scene.add.graphics(this.x, this.y);
    	if (this.parent) { this.parent.addChild(this._DOM); }

    	this._update();
	}

	_update() {
		this._DOM.clear();

    	if (this.fillColor) { this._DOM.beginFill(this.fillColor, 1); }
    	if (this.strokeColor) { this._DOM.lineStyle(this.strokeWidth, this.strokeColor, 1); }

    	this._DOM.drawRoundedRect(this.x, this.y, this.width, this.height, this.radius);
    	this._DOM.endFill();
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

	get parent() {
		return this._parent;
	}
	set parent(v) {
		this._parent = v;
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
    	width  = width  || 180;
    	color  = color || false;
    	line   = line  || 4;
    	fill   = fill  || false;
    	parent = parent || false;

    	this._sprite = scene.add.sprite(0, 0);
    	if (parent) { parent.addChild(this._sprite); }

		this.shell = new RoundBar({
			x,
			y,
			height,
			width,
			color,
			line,
			scene,
			parent: this._sprite
		});
		
		this.bar = new RoundBar({
			x: 1 + x / 2,
			y: 1 + y / 2,
			height: height - 4,
			width: 1,
			fill,
			scene,
			parent: this.shell._DOM
		});

		this.parent = parent;
		this.scene = scene;
		this.percentage = 0;
	}

	_update() {
    	this.bar.width = (this.shell.width - 2) * this._percentage / 100;
    	this.bar._update();
	}

	onDone() {
		this.bar.fillColor = 0x40ea19;
	}

	onLoad() {
		this.bar.fillColor = 0xeae019;
	}

	set percentage(v) {
		v %= 100;
		this._percentage = v;
		if (v === 99) { this.onDone(); }
		this._update();
	}
	get percentage() {
		return this._percentage;
	}
}

/**/