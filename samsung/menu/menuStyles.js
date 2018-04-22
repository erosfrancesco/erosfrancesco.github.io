var colors = window.colors;

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


setBlueWithRoundedBorders = (ctx, that) => {
        
    let grad1 = ctx.createLinearGradient(0, 0, 0, that.height );
    let w = (that.width < that.height) ? that.width : that.height;
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
        width: that.width - w,
        height: that.height - w,
        radius: w * 2,
        stroke: true
    });
}