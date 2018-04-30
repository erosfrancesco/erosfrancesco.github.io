class MenuBackground {
    constructor(options) {

    	// options decostruction
		let {
			width, height,
			x, y,
			scene,
			style
		} = options;

		// options sanitization
		if (!scene) { return; }
		
		width  = width  || 100;
        height = height || 100;
        x = x || 0;
        y = y || 0;
        style = style || 'default';

        this._availableStyling = {
            'default': _BackgroundFFVIStyling // ffvi
        };
        
        // Properties
        this.x = x;
        this.y = y;
        this.width  = width;
        this.height = height;

        this._bitmapData = scene.make.bitmapData(this.width, this.height);
        this._sprite = scene.add.sprite(this.x, this.y, this._bitmapData);
        this.style = style;
    }

    get style() {
    	return this._style;
    }
    set style(v) {
    	this._style = v;
    	if (this._availableStyling[v]) {
    		this._availableStyling[v](this);
    	}
    }

    get width() {
        return this._width;
    }
    set width(v) {
        this._width = v;
    }

    get height() {
        return this._height;
    }
    set height(v) {
        this._height = v;
    }
}
