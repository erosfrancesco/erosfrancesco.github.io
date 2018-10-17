// import modules (es6)
import MenuBackground from '../logic/background.js';



// return the stylized background
const _BackgroundFFVIStyling = menu => {

    let {
        scene, 
        width, height, x, y, 
        noArrows, verticalArrows, horizontalArrows
    } = menu;

    if (!scene.textures.exists(_BackgroundFFVITextureId)) {
        
        let canvas = scene.textures.createCanvas(_BackgroundFFVITextureId, _BackgroundFFVITextureWidth, _BackgroundFFVITextureHeight);
        let grd = canvas.context.createLinearGradient(0, 0, 0, _BackgroundFFVITextureHeight);

        grd.addColorStop(0, ColorMap.colors.aqua);
        grd.addColorStop(1, ColorMap.colors.navy);

        canvas.context.fillStyle = grd;
        canvas.context.fillRect(0, 0, _BackgroundFFVITextureWidth, _BackgroundFFVITextureHeight);

        canvas.refresh();
    }

    let background = scene.add.image(x, y, _BackgroundFFVITextureId );
    background.setScale(width / _BackgroundFFVITextureWidth, height / _BackgroundFFVITextureHeight);
    
    return background;
}





export default class FFVIMenuBackground extends MenuBackground {
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
            styling: _BackgroundFFVIStyling
        });
    }
}



const _BackgroundFFVITextureId     = 'FFVIBlueGradient';
const _BackgroundFFVITextureWidth  = 256;
const _BackgroundFFVITextureHeight = 256;

