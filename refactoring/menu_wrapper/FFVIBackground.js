let _BackgroundFFVITextureId     = 'FFVIBlueGradient';
let _BackgroundFFVITextureWidth  = 256;
let _BackgroundFFVITextureHeight = 256;

_BackgroundFFVIStyling = (parent) => {

    let {scene, width, height, x, y, noArrows} = parent;

    if (!scene.textures.exists(_BackgroundFFVITextureId)) {
        
        let canvas = scene.textures.createCanvas(_BackgroundFFVITextureId, _BackgroundFFVITextureWidth, _BackgroundFFVITextureHeight);
        let grd = canvas.context.createLinearGradient(0, 0, 0, _BackgroundFFVITextureHeight);

        grd.addColorStop(0, window.colors.aqua);
        grd.addColorStop(1, window.colors.navy);

        canvas.context.fillStyle = grd;
        canvas.context.fillRect(0, 0, _BackgroundFFVITextureWidth, _BackgroundFFVITextureHeight);

        canvas.refresh();
    }

    this.background = scene.add.image(x, y, _BackgroundFFVITextureId );
    this.background.setScale(width / _BackgroundFFVITextureWidth, height / _BackgroundFFVITextureHeight);

    
    return this.background;
}


class FFVIMenuBackground extends MenuBackground {
    constructor(options) {

        let {width, height, x, y, scene, noArrows} = options;

        super({width, height, x, y, scene, noArrows, styling: _BackgroundFFVIStyling});

        //this.sprite.setDepth(100);

        this.wrapper = scene.add.container(x, y);
        this.wrapper.setSize(width, height / 2);
        this.wrapper.setInteractive();
        //this.wrapper.on('pointerover', () => console.log('hello') ) // test
        
        this.noArrows = noArrows;
        if (!this.noArrows) {
            //this.upArrow    = new UpArrowButton   ({scene, x, y: y - 40 - height / 2 });
            //this.downArrow  = new DownArrowButton ({scene, x, y: y - 5 + height / 2 });
            this.leftArrow  = new LeftArrowButton ({scene, x: x - 20 - width / 2, y: y - 20 });
            this.rightArrow = new RightArrowButton({scene, x: x + 20 + width / 2, y: y - 20 });
        }
        

    }

    destroy() {
        super.destroy();
        if (!this.noArrows) {
            //this.upArrow.destroy();
            //this.downArrow.destroy();
            this.leftArrow.destroy();
            this.rightArrow.destroy();
        }
    }

    setEvent(evnt, callback) {
        this.wrapper.on(evnt, callback);
    }
}

