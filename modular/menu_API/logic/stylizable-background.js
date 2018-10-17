export default class MenuBackground {
    constructor(options) {

    	// options decostruction
	const {
		width, height,
		x, y,
		scene,
            	styling
	} = options;
		
        // Properties
        this.x = x;
        this.y = y;
        this.width  = width;
        this.height = height;
        this.scene = scene;

        this.sprite = styling(this);
    }

    get scene() {
        return this._scene;
    }
    set scene(v) {
        this._scene = v;
    }


    get sprite() {
        return this._sprite;
    }
    set sprite(v) {
        this._sprite = v;
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


    destroy() {
        this._sprite.destroy();
    }
}
