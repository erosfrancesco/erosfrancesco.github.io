class PhaserFFVIMenuBackground extends ScrollableMenu {
    constructor(options) {
        
        super(options);
        
        this.width = options.width || 100;
        this.height = options.height || 100;
        this.x = options.x || 0;
        this.y = options.y || 0;

        this.bitmapData = options.scene.make.bitmapData(this.width, this.height);
        this.bitmapData.addToWorld(this.x, this.y); // x, y, anchorX, anchorY, scaleX, scaleY
    }

    setRoundedBlue() {
        setBlueWithRoundedBorders(this.bitmapData.context, this);
    }
}


window.game = new Phaser.Game({
    renderer: Phaser.AUTO,
    width: 900,
    height: 500,
    state: {

        preload: function() {
        },

        create: function() {


            let d = new TextRectangle({
                scene: game,
                text: 'Hello',
                x: 100,
                y: 100,
                width: 200,
                height:50
            });

            d.visible = false;

            console.log(d.text.visible);

            let menu = new PhaserFFVIMenuBackground({
                items: [['hello', 'world', 'll'], ['za', 'warudo', 'dd']],
                scene: this, 
                width: 200,
                height: 125,
                x: 500,
                y: 100,
                cullX: 2,
                cullY: 2
            });
            menu.setRoundedBlue();

            menu.setItemDOM = function() {

                menu.itemsDOM = [[]];

                menu.itemIterator((item, rowI, lineI) => {

                    let width = menu.width / menu.cullX;
                    let height = menu.height / menu.cullY;
                    let x = menu.x + (width * rowI);
                    let y = menu.y + (height * lineI);

                    menu.itemsDOM[rowI] = menu.itemsDOM[rowI] || [];

                    menu.itemsDOM[rowI][lineI] = new TextRectangle({
                        scene: game,
                        text: item,
                        x,
                        y,
                        width,
                        height
                    });
                });
            }

            menu.setItemDOM();


          


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