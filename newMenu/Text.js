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
        this.sprite.setOrigin(0.5 , 1);
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
}


_TextStylingBlueGradient = (scene) => {

    let o = scene.add.text(0, 0, "")
    .setStyle({ align: 'center' })
    .setFontFamily('Arial')
    .setFontSize(32)
    .setFontStyle('bold')
    .setShadow(1, 2, "#333333", 2);

    //  Here we create a linear gradient on the Text context.
    //  This uses the exact same method of creating a gradient as you do on a normal Canvas context.
    let grd = o.context.createLinearGradient(0, 0, 0, o.height);
    grd.addColorStop(0, '#8ED6FF');   
    grd.addColorStop(1, '#004CB3');
    o.setColor(grd);

    //o.advancedWordWrap( o.text, o.context, 300 );

    o.selected    = () => { o.setColor("#EACA2F"); };
    o.notSelected = () => { o.setColor("#D2D2D2"); };

    return o;
};


_TextStylingFFVI = (scene, callback) => {
    
    let o = scene.add.text(0, 0, "")
    .setStyle({ 
    })
    .setFontFamily('Arial')
    .setFontSize(32)
    .setFontStyle('bold')
    .setShadow(1, 2, "#333333", 2)
    .setColor('#D2D2D2');

    //o.setOrigin(0.5, 0);

    o.selected    = () => { o.setColor("#EACA2F"); };
    o.notSelected = () => { o.setColor("#D2D2D2"); };

    return o;
};


class FFVIText extends _PhaserText {
    constructor(options) {

        // options decostruction
        let { scene, text, x, y, width, height } = options;
        
        super({ scene, text, x, y, width, height, styling: _TextStylingFFVI });
    }
}

class BlueText extends _PhaserText {
    constructor(options) {

        // options decostruction
        let { scene, text, x, y, width, height } = options;
        
        super({ scene, text, x, y, width, height, styling: _TextStylingBlueGradient });
    }
}