class _PhaserText {
    constructor(options) {

        // options decostruction
        let { 
            scene, 
            text, styling, 
            width, height,
            x, y 
        } = options;
        
        this.scene = scene;
        this.sprite = styling(scene);
        this.sprite.setOrigin(0.5);
        this.text = text;

        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;

        this.sprite.setInteractive();
    }


    on(evnt, callback) { this.sprite.on(evnt, callback); }

    emit(evnt, callback) { this.sprite.emit(evnt, callback); }


    get y() {
        return this.sprite.y;
    }
    set y(v) {
        this.sprite.y = v;
    }


    get x() {
        return this.sprite.x;
    }
    set x(v) {
        this.sprite.x = v;
    }


    get text() {
        return this._text;
    }
    set text(v) {
        this._text = v;
        this.sprite.setText(v);
    }


    get width() {
        return this._width;
    }
    set width(v) {
        this._width = v;
        this.sprite.width = v;
    }


    get height() {
        return this._height;
    }
    set height(v) {
        this._height = v;
        this.sprite.height = v;
    }


    get visible() {
        return this._visible;
    }
    set visible(v) {
        this._visible = v;
        this.sprite.setVisible(v);
    }


    get sprite() {
        return this._sprite;
    }
    set sprite(v) {
        this._sprite = v;
    }

    destroy() {
    	this.sprite.destroy();
    }
}
