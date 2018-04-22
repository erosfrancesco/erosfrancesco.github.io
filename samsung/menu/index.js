class PhaserFFVIMenuBackground extends ScrollableMenu {
    constructor(options) {
        
        super(options);

        let game = options.game;
        
        this.width = options.width || 100;
        this.height = options.height || 100;
        this.x = options.x || 0;
        this.y = options.y || 0;

        this.bitmapData = options.game.make.bitmapData(this.width, this.height);
        this.bitmapData.addToWorld(this.x, this.y); // x, y, anchorX, anchorY, scaleX, scaleY
    }

    setRoundedBlue() {
        setBlueWithRoundedBorders(this.bitmapData.context, this);
    }

    setItemDOM(item, rowI, lineI) {
        console.log(item, rowI, lineI);
    }
}


window.game = new Phaser.Game({
    renderer: Phaser.AUTO,
    width: 900,
    height: 500,
    state: {

        preload: function() {
            //this.load.baseURL = 'https://cdn.jsdelivr.net/gh/samme/phaser-examples-assets@v1.0.0/';
            //this.load.crossOrigin = 'anonymous';
            //this.load.image('sprite', 'sprites/phaser.png');
        },

        create: function() {

            let menu = new PhaserFFVIMenuBackground({
                items: [['hello', 'world'], ['za', 'warudo']],
                game: this, 
                width: 200,
                height: 125,
                x: 700,
                y: 0
            });
            menu.setRoundedBlue();
/*
            let a = new PhaserFFVIMenuBackground({
                game: this, 
                width: 200,
                height: 125,
                x: 700,
                y: 0
                
            });
            a.setRoundedBlue();

            let b = new PhaserFFVIMenuBackground({
                game: this, 
                width: 200,
                height: 125,
                x: 700,
                y: 125
                
            });
            b.setRoundedBlue();


            let c = new PhaserFFVIMenuBackground({
                game: this, 
                width: 200,
                height: 125,
                x: 700,
                y: 250
                
            });
            c.setRoundedBlue();

            let d = new PhaserFFVIMenuBackground({
                game: this, 
                width: 200,
                height: 125,
                x: 700,
                y: 375
                
            });
            d.setRoundedBlue();
/**/
        }
    }
});