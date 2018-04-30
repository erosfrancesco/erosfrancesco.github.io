_TextStylingDefault = (that) => {

    that._DOM = that.scene.add.text(0, 0, that.text, { 
        // font
        font: 'Arial Black',
        fontSize: 32,
        fontWeight: 'bold',

        // align
        boundsAlignH: 'center',
        boundsAlignV: 'middle',
        align: 'center',

        // fill
        fill: '#D2D2D2',

        // border
        stroke: '#222222',
        strokeThickness: 6
    });
    that._DOM.setTextBounds(that.x, that.y, that.width, that.height);

    that.selected    = () => { that._DOM.fill = "#EACA2F"; };
    that.notSelected = () => { that._DOM.fill = "#D2D2D2"; };

    that._DOM.onTap = () => { that.notSelected(); }
    
}

class MenuItem {
    constructor(options) {

        // options decostruction
        let {
            width, height,
            x, y,
            scene,
            style,
            text,
            onSelect
        } = options;

        // options sanitization
        if (!scene) { return; }

        width  = width  || 100;
        height = height || 100;
        x = x || 0;
        y = y || 0;
        style = style || 'default';
        onSelect = onSelect || function() {};

        this._availableStyling = {
            'default': _TextStylingDefault
        };

        // Properties
        this._DOM = {};
        this.x = x;
        this.y = y;
        this.text = text;
        this.width  = width;
        this.height = height;
        this.scene = scene;
        this.style = style;
        this.onSelect = onSelect;
    }

    get style() {
        return this._style;
    }
    set style(v) {
        this._style = v;
    }

    get width() {
        return this._width;
    }
    set width(v) {
        this._width = v;
        this._DOM.width = v;
    }

    get height() {
        return this._height;
    }
    set height(v) {
        this._height = v;
        this._DOM.height = v;
    }

    get x() {
        return this._x;
    }
    set x(v) {
        this._x = v;
        this._DOM.x = v;
    }

    get y() {
        return this._y;
    }
    set y(v) {
        this._y = v;
        this._DOM.y = v;
    }

    get visible() {
        return this._visible;
    }
    set visible(v) {
        this._visible = v;
        this._DOM.visible = v;
    }

    get stroke() {
        return this._stroke;
    }
    set stroke(v) {
        this._stroke = v;
        this._DOM.stroke = v;
    }

    get fill() {
        return this._fill;
    }
    set fill(v) {
        this._fill = v;
        this._DOM.fill = v;
    }

    set() {
        if (this._availableStyling[this.style]) {
            this._availableStyling[this.style](this);
        }
    }

    size(w, h) {
        this._DOM.width = w;
        this._DOM.height = h;
    }
}