import StylizableText from './phaser/text.js';
import ENGINE from '../engine/index.js';
// colorMap must be imported some other way...
const {game, ColorMap} = ENGINE;


// options is the parent text to be stylized.
// return it.
const FFVItextStyling = ({scene}) => {
    
    const o = scene.add.text(0, 0, "")
    // styling options
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


export default class FFVIText extends StylizableText {
    constructor(options) {
        options.styling = FFVItextStyling;
        super(options);
    }
}
