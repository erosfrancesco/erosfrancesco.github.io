// import modules (es6)
import ENGINE from '../engine/index.js';
let {game, ColorMap} = ENGINE;
import ARROWBUTTONS from './arrow-button.js';
let {UpArrowButton, DownArrowButton, LeftArrowButton, RightArrowButton} = ARROWBUTTONS;
import MenuBackground from './menu-background.js';

// option is the menu
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

        this.noArrows = noArrows;
        this.verticalArrows = verticalArrows;
        this.horizontalArrows = horizontalArrows;

        this.wrapper = scene.add.container(x, y);
        this.wrapper.setSize(width, height / 2);
        this.wrapper.setInteractive();


        if (this.noArrows) return;

        if (this.verticalArrows) {
            this.upArrow    = new UpArrowButton   ({scene, x, y: y - 40 - height / 2 });
            this.downArrow  = new DownArrowButton ({scene, x, y: y - 5 + height / 2 });
        }

        if (this.horizontalArrows) {
            this.leftArrow  = new LeftArrowButton ({scene, x: x - 20 - width / 2, y: y - 20 });
            this.rightArrow = new RightArrowButton({scene, x: x + 20 + width / 2, y: y - 20 });
        }
    }

    destroy() {
        super.destroy();

        if (this.upArrow) this.upArrow.destroy();
        if (this.downArrow) this.downArrow.destroy();
        if (this.leftArrow) this.leftArrow.destroy();
        if (this.rightArrow) this.rightArrow.destroy();
    }

    setEvent(evnt, callback) {
        this.wrapper.on(evnt, callback);
    }
}



const _BackgroundFFVITextureId     = 'FFVIBlueGradient';
const _BackgroundFFVITextureWidth  = 256;
const _BackgroundFFVITextureHeight = 256;

