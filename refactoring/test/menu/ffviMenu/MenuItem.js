const FFVItextStyling = ({ scene,
    label = "",
    width = 200, height=50,
    x=0, y=0
}) => {

    const wrapper = document.createElement('h1');
    wrapper.style.fontFamily = "Arial";
    wrapper.style.fontSize = "33px";
    wrapper.style.fontStyle = "bold";
    wrapper.style.textShadow = "1px 3px #111111";
    wrapper.style.color = "#D2D2D2";

    const sprite = scene.add.dom(x, y, wrapper);

    sprite.setOrigin(0.5);
    sprite.setDepth(1);
    sprite.selected    = () => {
        console.log(sprite);
        wrapper.style.color = "#CAAA2F";
        wrapper.style.textShadow = "1px 3px #111122";
        //sprite.setTint("#EACA2F");
    }
    sprite.notSelected = () => {
        //sprite.setTint("#D2D2D2");
        wrapper.style.color = "#D2D2D2";
        wrapper.style.textShadow = "1px 3px #111111";
    }

    return sprite;
};

export default class MenuItem {
    constructor({
        scene,
        label = "",
        width = 200, height=50,
        x=0, y=0
    }) {

        this.sprite = FFVItextStyling({scene, label, x, y, width, height});
        this.sprite.setInteractive();

        this.scene = scene;
        this.label = label;
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
    }


    on(evnt, callback) { this.sprite.on(evnt, callback); }

    emit(evnt, callback) { this.sprite.emit(evnt, callback); }

    destroy() {
        this.sprite.destroy();
    }


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


    get label() {
        return this._text;
    }
    set label(v) {
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

    get selected() {
        return this._selected;
    }
    set selected(v) {
        this._selected = v;
        const f = v ? this.sprite.selected : this.sprite.notSelected;
        f();
    }

}
