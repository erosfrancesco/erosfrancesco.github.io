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
