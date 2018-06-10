let colors = window.colors;

/**
 * Draws a rounded rectangle using the current state of the canvas. 
 * If you omit the last three params, it will draw a rectangle 
 * outline with a 5 pixel border radius 
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate 
 * @param {Number} width The width of the rectangle 
 * @param {Number} height The height of the rectangle
 * @param {Number} radius The corner radius. Defaults to 5;
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
 */
roundRect = (ctx, options) => {

    let x = options.x || 0;
    let y = options.y || 0;
    let width  = options.width  || 0;
    let height = options.height || 0;
    let radius = options.radius || 0;
    let fill   = options.fill   || true;
    let stroke = options.stroke || false;

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
        ctx.fill();
    }        
}


setBlueWithRoundedBorders = (canvas) => {

    let ctx = canvas.context;
        
    let grad1 = ctx.createLinearGradient(0, 0, 0, canvas.height );
    let w = (canvas.width < canvas.height) ? canvas.width : canvas.height;
    w = Math.floor(w * 4 / 150);

    grad1.addColorStop(0, colors.gray);
    grad1.addColorStop(0.2, colors.blue);
    grad1.addColorStop(1, colors.black);

    ctx.fillStyle = grad1;
    ctx.lineWidth = w;
    ctx.strokeStyle = colors.silver;
    roundRect(ctx, {
        x: w / 2,
        y: w / 2,
        width: canvas.width - w,
        height: canvas.height - w,
        radius: w * 2,
        stroke: true
    });
}



_BackgroundFFVIStyling = (parent) => {

    let {scene, width, height, x, y} = parent;

    if (!scene.textures.exists('FFVIBlueGradient')) {
        
        let canvas = scene.textures.createCanvas('FFVIBlueGradient', 256, 256);
        let grd = canvas.context.createLinearGradient(0, 0, 0, 256);

        grd.addColorStop(0, '#8ED6FF');
        grd.addColorStop(1, '#004CB3');

        canvas.context.fillStyle = grd;
        canvas.context.fillRect(0, 0, 256, 256);

        canvas.refresh();
    }

    let sprite = scene.add.image(x, y, 'FFVIBlueGradient' );

    sprite.setScale(width / 256, height / 256);

    return sprite;
}


class FFVIMenuBackground extends MenuBackground {
    constructor(options) {

        let {width, height, x, y, scene} = options;

        super({width, height, x, y, scene, styling: _BackgroundFFVIStyling});

    }
}

