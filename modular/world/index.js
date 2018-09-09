import ENGINE from '../engine/index.js';
let {game} = ENGINE;



class topDownTileWorld extends Phaser.Scene {
    constructor (config) {
        super();
    }

    preload () {
        /*
        this.load.spritesheet('tiles', 
            '../assets/Stone.png', 
            {frameWidth: 192 / 6, frameHeight: 160 / 5});
        /**/
        this.load.spritesheet('tiles', 
            '../assets/Stone.png', 
            //'../assets/Chiara_Enterbrain_TileA4_RecoloursWalls_zpshqigdnzs.png', 
            {frameWidth: 16, frameHeight: 16});
    }

    create () {
        
        // Create a blank map
        this.map = this.make.tilemap({
            tileWidth: 16,
            tileHeight: 16,
            width: 10 * 10,
            height: 10 * 10
        });

        // Load up a tileset
        // last two arguments: margin & padding (px)
        const tileset = this.map.addTilesetImage('tiles');
        const numberOfTilesInARow = 4;
        const tileMap = {
            BRICKS: {
                NE: 0 + (0 * numberOfTilesInARow),
                N1: 1 + (0 * numberOfTilesInARow),
                N2: 2 + (0 * numberOfTilesInARow),
                NO: 3 + (0 * numberOfTilesInARow),

                E1: 0 + (1 * numberOfTilesInARow),
                C1: 1 + (1 * numberOfTilesInARow),
                C2: 2 + (1 * numberOfTilesInARow),
                O1: 3 + (1 * numberOfTilesInARow),

                E2: 0 + (2 * numberOfTilesInARow),
                C3: 1 + (2 * numberOfTilesInARow),
                C4: 2 + (2 * numberOfTilesInARow),
                O2: 3 + (2 * numberOfTilesInARow),


                SE: 0 + (3 * numberOfTilesInARow),
                S1: 1 + (3 * numberOfTilesInARow),
                SO: 3 + (3 *numberOfTilesInARow)
            }
        };

        // Create an empty layer and give it the name "Layer 1"
        this.layer = this.map.createBlankDynamicLayer('Layer 1', tileset);

        // fill layer
        //this.layer.fill(tileMap.BRICKS.C2);


        
        this.map.weightedRandomize( 0, 0, 100, 100, [ 
            { index: tileMap.BRICKS.C1, weight: 4 }, // Probability is 3 / 4
            { index: tileMap.BRICKS.C2, weight: 3 }, // Probability is 1 / 4
            { index: tileMap.BRICKS.C3, weight: 1 }, // Probability is 3 / 4
            { index: tileMap.BRICKS.C4, weight: 2 }  // Probability is 1 / 4
        ]);

        this.map.weightedRandomize( 2, 1, 4, 1, [ 
            { index: tileMap.BRICKS.N2, weight: 2 }, // Probability is 1 / 3
            { index: tileMap.BRICKS.N1, weight: 1 }, // Probability is 2 / 3
        ]);     


        this.layer.putTileAt(tileMap.BRICKS.NE, 1, 1);
        this.layer.putTileAt(tileMap.BRICKS.NO, 6, 1);


        this.map.weightedRandomize( 1, 2, 1, 4, [ 
            { index: tileMap.BRICKS.E2, weight: 2 },
            { index: tileMap.BRICKS.E1, weight: 1 },
        ]);


        this.map.weightedRandomize( 6, 2, 1, 4, [ 
            { index: tileMap.BRICKS.O2, weight: 1 },
            { index: tileMap.BRICKS.O1, weight: 2 },
        ]);


    }

    update() {

    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    get map() {
        return this._map;
    }
    set map(v) {
        this._map = v;
    }

    get layers() {
        return this._layers;
    }
    set layers(v) {
        this._layers = v;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

}



function BuildScene() { 
    return new topDownTileWorld({
        //assets
    });
}

game.scene.add('battle', BuildScene, true);
/**/
