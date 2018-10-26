import slotMaps from './slotMaps.js';


const KEFKACONFIG = {
    commands: [ 'FIGHT' ],
    name: "Kefka",
    boss: true,
    stats: {
        "str": 50,
        "def": 1,
        "dex": 4,
        "lvl": 5,
        "lif": 200,
        "man": 199
    },
    sprite: {
        type: 'image',
        key: 'Kefka',
        slot: 0,
        slotMap: slotMaps.boss,
        config: {
            scaleX: 1.10,
            scaleY: 1.10
        }
    }
};

////////////////////////////////////////////////////////

const assets = {

    baseUrl: '../../assets',
    image: [{
        key: 'battleBackground', 
        src: './backgrounds/world_over_heavens.png'
    }, {
        key: 'Kefka',
        src: './sprites/Kefka.png'
    }],

    // mp3
    audio: [{
        key: 'ayayay',
        src: './audio/Jojo-Awaken.mp3'
    }]
};



const enemies = [KEFKACONFIG];
const music = {
    key: 'ayayay'
};
const background = {
    key: 'battleBackground',
    type: 'image', 
    config: {x: 350, y: 250}
};

///////////////////////////////////////////////////


export default {assets, enemies, music, background};