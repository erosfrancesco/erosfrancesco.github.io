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


class BlueText extends _PhaserText {
    constructor(options) {

        // options decostruction
        let { scene, text, x, y, width, height } = options;
        
        super({ scene, text, x, y, width, height, styling: _TextStylingBlueGradient });
    }
}
