import ATBBattleScene from './scene-build.js';
import ENGINE from '../engine/index.js';
let {game} = ENGINE;
import buildCharacterSprite from './sprite-utils.js';

const KINGGOBLINCONFIG = {
    commands: [ 'FIGHT', 'ITEMS' ],
    name: "G. King",
    boss: true,
    stats: {
        "str": 50,
        "def": 1,
        "dex": 4,
        "lvl": 5,
        "lif": 1900,
        "man": 199
    },
    sprite: {
        type: 'image',
        key: 'goblin_king_boss',
        slot: 0,
        slotMap: [{x: 400, y: 500}],
        config: {
            scaleX: -0.70,
            scaleY: 0.70
        }
    }
};

const assets = {
    image: [{
        key: 'goblin_king_boss',
        src: '../../refactoring/assets/sprites/Goblin_King_Figure.png'
    }]
};

class TestScene extends Phaser.Scene {
    constructor(options) { super(); }
    preload() {
        this.load.image('goblin_king_boss', '../../refactoring/assets/sprites/Goblin_King_Figure.png');
    }
    create() {
        let a = KINGGOBLINCONFIG.sprite;
        a.scene = this;
        let sprite = buildCharacterSprite(a); 
        console.log(sprite);
    }
}

game.scene.add('battle', TestScene, true);
