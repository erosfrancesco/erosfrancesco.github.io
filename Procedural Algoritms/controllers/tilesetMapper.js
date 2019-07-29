const tileWidth = 48 + 2
const tileHeight = 48 + 2
const aaaa = 18

class TilesetMapperScene extends Phaser.Scene {
    constructor(...args) {
        super(args)
        
        this.tileset = TilesetMapperScene.sceneData.tileset
    }

    static key = "Tileset-View"

    preload() {
        this.load.image(this.tileset)
    }

    create() {
        //
        this.img = this.add.sprite(0, 0, this.tileset)
        this.img.setOrigin(0)

        //
        this.graphic = this.add.graphics()
        this.graphic.lineStyle(1, 0x1624FF)
        this.graphic.fillStyle(0x222222, 0.7)

        //
        this.label = this.add.text(0, 0, '', { 
            fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' 
        })
        this.label.setOrigin(0.5)

        //
        this.input.on("pointerdown", pointer => this.onInput(pointer))
    }


    onInput({x, y}) {
        const tX = ( x - (x % tileWidth) ) / tileWidth
        const tY = ( y - (y % tileHeight) ) / tileHeight

        this.drawBorder(tX * tileWidth, tY * tileHeight)

        this.label.x = (tX + 1 / 2) * tileWidth 
        this.label.y = (tY + 1 / 2) * tileHeight
        this.label.text = tX + tY * aaaa
    }

    drawBorder(x, y) {
        this.graphic.clear()
        this.graphic.fillRect(x, y, tileWidth, tileHeight)
        this.graphic.strokeRect(x, y, tileWidth, tileHeight)
    }


    update(time, delta) {
    }
}


Game.addScene(TilesetMapperScene, true, {tileset: "borders-tileset-extruded"});

export default true