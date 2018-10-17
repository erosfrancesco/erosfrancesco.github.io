// import modules (es6)
import StylizedMenuBackground from './phaser/background.js';


// Some settings
const _backgroundFFVITextureId     = 'FFVIBlueGradient';
const _backgroundFFVITextureWidth  = 256;
const _backgroundFFVITextureHeight = 256;



// return a FFVI-style background
const backgroundFFVIStyling = menu => {

    let {
        scene, 
        width, height, x, y, 
        noArrows, verticalArrows, horizontalArrows
    } = menu;

    if (!scene.textures.exists(_backgroundFFVITextureId)) {
        
        let canvas = scene.textures.createCanvas(_backgroundFFVITextureId, _backgroundFFVITextureWidth, _backgroundFFVITextureHeight);
        let grd = canvas.context.createLinearGradient(0, 0, 0, _backgroundFFVITextureHeight);

        grd.addColorStop(0, ColorMap.colors.aqua);
        grd.addColorStop(1, ColorMap.colors.navy);

        canvas.context.fillStyle = grd;
        canvas.context.fillRect(0, 0, _backgroundFFVITextureWidth, _backgroundFFVITextureHeight);

        canvas.refresh();
    }

    let background = scene.add.image(x, y, _backgroundFFVITextureId );
    background.setScale(width / _backgroundFFVITextureWidth, height / _backgroundFFVITextureHeight);
    
    return background;
}





export default class FFVIMenuBackground extends StylizedMenuBackground {
    constructor(options) {

        let {
            width, height, x, y, 
            scene, 
            noArrows, verticalArrows, horizontalArrows
        } = options;

        super({
            width, height, 
            x, y, 
            scene, 
            noArrows, verticalArrows, horizontalArrows, 
            styling: backgroundFFVIStyling
        });
    }
}


