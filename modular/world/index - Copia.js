import ENGINE from '../engine/index.js';
let {game} = ENGINE;



class topDownTileWorld extends Phaser.Scene {
    constructor (config) {
        super();
    }

    preload () {

        this.load.setBaseURL('./');

        this.load.tilemapTiledJSON('map', 'map.json');


        /*
         * this.load.atlas({
         *     key: 'mainmenu',
         *     textureURL: 'images/MainMenu.png',
         *     atlasURL: 'images/MainMenu.json'
         *     normalMap: 'images/MainMenu-n.png',
         * });
         */
        this.load.atlas({
            key: 'isoblocks01', 
            textureURL: 'isoblocks.png', 
            atlasURL: 'isoblocks.json'
        });
        
    }

    create () {


        const {tileheight, tilewidth, layers} = this.cache.tilemap.get('map').data;
        const tileMap = this.cache.json.get('isoblocks01').frames;

        /*
        const {width, height, data} = layers[0];

        IsometricLayerParser({data, tilewidth, tileheight, width, height, y: 130, x: -220}, ({id, tx, ty, centerX, centerY}) => { 
            const tilesId = 'isoblocks01';
            const tileId = Object.keys(tileMap)[id];
            const tile = this.add.image(centerX + tx, centerY + ty, tilesId, tileId);
            tile.depth = centerY + ty;
        });
        /**/


        IsometricMultiLayerParser({layers, tilewidth, tileheight, x: -300, y: 0},  ({id, tx, ty, centerX, centerY}) => { 
            const tilesId = 'isoblocks01';
            const tileId = Object.keys(tileMap)[id];
            //const tile = 
            return this.add.image(centerX + tx, centerY + ty, tilesId, tileId);
            //tile.depth = centerY + ty;
        });
        
        /*
            //const tileset = this.map.addTilesetImage('isoblocks01');

            //let layer = this.map.createStaticLayer('floor', tileset);

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
        /**/

    }

    update() {

        if (d)
        {
            this.cameras.main.scrollX -= 0.5;

            if (this.cameras.main.scrollX <= 0)
            {
                d = 0;
            }
        }
        else
        {
            this.cameras.main.scrollX += 0.5;

            if (this.cameras.main.scrollX >= 800)
            {
                d = 1;
            }
        }
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

var d = 0;

game.scene.add('battle', BuildScene, true);
/**/

function IsometricMultiLayerParser({layers, tilewidth, tileheight, x, y}, iterator) {
    layers.forEach((layer, i) => {
        const {width, height, data} = layer;
        const z = i * height;
        IsometricLayerParser({data, tilewidth, tileheight, width, height, x, y, z}, ({id, tx, ty, centerX, centerY}) => {
            return iterator({id, tx, ty, centerX, centerY});
        });
    });
    
}

function IsometricLayerParser({data, tilewidth, tileheight, width, height, x, y, z}, iterator) {

    z = z || 0;
    console.log(z);

    const tileWidthHalf = tilewidth / 2;
    const tileHeightHalf = tileheight / 2;
    const centerX = (x || 0) + width * tileWidthHalf;
    const centerY = 16 + (y || 0);
    let i = 0;

    for (let y = 0; y < height; y++)
    {
        for (let x = 0; x < width; x++)
        {
            i++;
            const id = data[i];

            if (id) {
                const tx = (x - y) * tileWidthHalf;
                const ty = (x + y) * tileHeightHalf;
                let tile = iterator({id, tx, ty, centerX, centerY});
                tile.depth = centerY + ty + z;
            }
        }
    }
}

