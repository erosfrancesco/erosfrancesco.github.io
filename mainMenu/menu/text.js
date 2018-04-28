class TextRectangle {
    constructor(options) {
            
        let defaultStyle = { font: "bold 32px Arial", fill: "#0f00f0", boundsAlignH: "center", boundsAlignV: "middle" };
        
        this.text = options.scene.add.text(0, 0, options.text, defaultStyle);
        this.text.align = 'center';
        this.text.setTextBounds(options.x, options.y, options.width, options.height);

        let bar = game.add.graphics();
        bar.beginFill(0xffff, 0.4);
        bar.drawRect(options.x, options.y, options.width, options.height);     
    }

    set visible(v) {
        this.text.visible = v;
    }

    get visible() {
        return this.text.visible;
    }

    setStyle() {
        this.text.align = 'center';
        this.text.fontSize = 50;
        this.text.setShadow(2, 2, 'rgba(0, 255, 0, 1)', 0);
    }
}

            /* 

            colorize() {
                  this.text.addColor('#ffff00', 8);
                  //this.text.addColor('#9999', 25);
                  //this.text.addColor('#ff00ff', 28);
                  //this.text.addColor('#ffffff', 32); 
            }

            //omoshinai
            var bar = game.add.graphics();
            bar.beginFill(0xffffff, 0.2);
            bar.drawRect(0, 100, 800, 100);
            /**/