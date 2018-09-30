import ENGINE from '../engine/index.js';
let {game} = ENGINE;



class topDownIsometricWorld extends Phaser.Scene {
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

        // map building
        const {tileheight, tilewidth, layers} = this.cache.tilemap.get('map').data;
        const tileMap = this.cache.json.get('isoblocks01').frames;

        this.tiles = [];

        this.multiLayerParser({layers, tilewidth, tileheight, x: -300, y: 0},  ({id, tx, ty, centerX, centerY}) => { 
            const tilesId = 'isoblocks01';
            const tileId = Object.keys(tileMap)[id];
            const tile = this.physics.add.image(centerX + tx, centerY + ty, tilesId, tileId);
            this.tiles.push(tile);
            return tile;
        });


        /*        
        // camera effect
        this.tweens.add({
            targets: this.cameras.main,
            scrollX: 500,
            ease: 'Sine.Power2',
            duration: 5000,
            repeat: -1,
            yoyo: true
        });
        /**/

        // staticGroup || group
        this.collider = this.physics.add.group({});
        this.tiles.forEach(tile => {
            let a = this.collider.add(tile);
            tile.body.setBounce(0, 0); 
        });

        this.player = this.physics.add.sprite(450, 100, 'isoblocks01', 'block-001');
        this.player.depth = 120;

        this.physics.add.collider(this.player, this.collider);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
        } else {
            this.player.setVelocityX(0);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

    multiLayerParser ({layers, tilewidth, tileheight, x, y}, iterator) {
        layers.forEach((layer, i) => {
            const {width, height, data} = layer;
            const z = i * height;
            this.layerParser({data, tilewidth, tileheight, width, height, x, y, z}, iterator);
        });   
    }

    layerParser({data, tilewidth, tileheight, width, height, x, y, z}, iterator) {

        z = z || 0;

        const tileWidthHalf = tilewidth / 2;
        const tileHeightHalf = tileheight / 2;
        const centerX = (x || 0) + width * tileWidthHalf;
        const centerY = 16 + (y || 0);

        data.forEach((frameNumber, index) => {
            if (!frameNumber) return;

            const x = index % width;
            const y = Math.floor(index / height);
            const tx = (x - y) * tileWidthHalf;
            const ty = (x + y) * tileHeightHalf;

            let tile = iterator({id: frameNumber, tx, ty, centerX, centerY});
            tile.depth = centerY + ty + z;
        });
    }
}



function BuildScene() { 
    return new topDownIsometricWorld({});
}

game.scene.add('battle', BuildScene, true);
