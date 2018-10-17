import slotMaps from './slotMaps.js';

const LEPRECHAUNCONFIG = {
    commands: [ 'FIGHT' ],
    name: "Leprechaun",
    sprite: {
        type: 'image',
        key: 'leprechaun',
        slotMap: slotMaps.boss,
        config: {
            scaleX: 0.3,
            scaleY: 0.3
        }
    },
    stats: {
        "str": 50,
        "def": 1,
        "dex": 4,
        "lvl": 5,
        "lif": 1900,
        "man": 199
    },
    onDamageType: {
        blunt: (damage) => { return Math.floor(damage.value * 5 / 2); }
    }
};

const KINGGOBLINCONFIG = {
    commands: [ 'FIGHT' ],
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
        slot: 1,
        slotMap: slotMaps.boss,
        config: {
            scaleX: -0.70,
            scaleY: 0.70
        }
    }
};

////////////////////////////////////////////////////////

const assets = {
    
    baseUrl: '../../assets/',
    
    image: [{
        key: 'battleBackground', 
        src: './backgrounds/battle_background_01.png'
    }, {
        key: 'goblin_king_boss',
        src: './sprites/Goblin_King_Figure.png'
    }, {
        key: 'leprechaun',
        src: './sprites/Leprechaun.png'
    }],

    // mp3
    audio: [{
        key: 'ayayay',
        src: './audio/Jojo-Awaken.mp3'
    }]
};


const enemies = [KINGGOBLINCONFIG, LEPRECHAUNCONFIG, LEPRECHAUNCONFIG];
const music = {
    key: 'ayayay'
};
const background = {
    key: 'battleBackground',
    type: 'image', 
    config: {x: 350, y: 250}
};


export default {assets, enemies, music, background};