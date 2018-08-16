_TextStylingFFVI = (scene, callback) => {
    
    let o = scene.add.text(0, 0, "")
    .setStyle({ 
        //backgroundColor: 'black'
    })
    .setFontFamily('Arial')
    .setFontSize(33)
    .setFontStyle('bold')
    .setOrigin(0.5)
    .setShadow(2, 2, window.colors.shadow, 3)
    .setColor(window.colors.silver);

    o.selected    = () => { o.setColor("#EACA2F"); };
    o.notSelected = () => { o.setColor(window.colors.silver); };
    return o;
};


class FFVIText extends _PhaserText {
    constructor(options) {

        // options decostruction
        let { scene, text, x, y, width, height } = options;
        
        super({ scene, text, x, y, width, height, styling: _TextStylingFFVI });

        
    }
}
