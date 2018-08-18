import _PhaserText from './phaser-text.js';
import ENGINE from '../engine/index.js';
let {game, ColorMap} = ENGINE;


// options is the parent text to be stylized.
// return it.
const _TextStylingFFVI = options => {

    let {scene} = options;
    
    let o = scene.add.text(0, 0, "")
    .setStyle({ 
        //backgroundColor: 'black'
    })
    .setFontFamily('Arial')
    .setFontSize(33)
    .setFontStyle('bold')
    .setOrigin(0.5)
    .setShadow(2, 2, ColorMap.colors.shadow, 3)
    .setColor(ColorMap.colors.silver);

    o.selected    = () => { o.setColor("#EACA2F"); };
    o.notSelected = () => { o.setColor(ColorMap.colors.silver); };
    return o;
};


export default class FFVIText extends _PhaserText {
    constructor(options) {

        // options decostruction
        let { scene, text, x, y, width, height } = options;
        
        super({ scene, text, x, y, width, height, styling: _TextStylingFFVI });

        
    }
}
