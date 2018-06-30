let _BackgroundFFVITextureId     = 'FFVIBlueGradient';
let _BackgroundFFVITextureWidth  = 256;
let _BackgroundFFVITextureHeight = 256;

_BackgroundFFVIStyling = (parent) => {

    let {scene, width, height, x, y} = parent;

    if (!scene.textures.exists(_BackgroundFFVITextureId)) {
        
        let canvas = scene.textures.createCanvas(_BackgroundFFVITextureId, _BackgroundFFVITextureWidth, _BackgroundFFVITextureHeight);
        let grd = canvas.context.createLinearGradient(0, 0, 0, _BackgroundFFVITextureHeight);

        grd.addColorStop(0, window.colors.aqua);
        grd.addColorStop(1, window.colors.navy);

        canvas.context.fillStyle = grd;
        canvas.context.fillRect(0, 0, _BackgroundFFVITextureWidth, _BackgroundFFVITextureHeight);

        canvas.refresh();
    }

    let sprite = scene.add.image(x, y, _BackgroundFFVITextureId );

    sprite.setScale(width / _BackgroundFFVITextureWidth, height / _BackgroundFFVITextureHeight);
    return sprite;
}


class FFVIMenuBackground extends MenuBackground {
    constructor(options) {

        let {width, height, x, y, scene} = options;

        super({width, height, x, y, scene, styling: _BackgroundFFVIStyling});

    }
}

