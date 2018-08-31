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
    // mp3
    baseUrl: '../../../refactoring/assets/sprites/',
    image: [
    {
        key: 'battleBackground', 
        src: '../backgrounds/battle_background_01.png'
    },
    {
        key: 'goblin_king_boss',
        src: 'Goblin_King_Figure.png'
    },
    {
        key: 'leprechaun',
        src: 'Leprechaun.png'
    } 
    ],
/*
    spritesheet: [
    {
        key: 'FFVICast', 
        params: { frameWidth: 680 / 4, frameHeight: 756 / 4 }, 
        src: 'ffviCast.png'
    }
    /**/ 
    //]
};


const enemies = [KINGGOBLINCONFIG, LEPRECHAUNCONFIG, LEPRECHAUNCONFIG];
//const players = [PLAYEREDGARCONFIG, PLAYERSHDOWCONFIG, PLAYERLOCKECONFIG, PLAYERTERRACONFIGS];
const music = {};
const background = {
    key: 'battleBackground',
    type: 'image', 
    config: {x: 350, y: 250}
};


export default {assets, enemies, music, background};