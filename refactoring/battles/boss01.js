const DIOBARDOCONFIG = {
    commands: [ 'FIGHT', 'ITEMS' ],
    name: "Dio Bardo",
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
        key: 'DioBardo',
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
    // mp3
    image: [
    {
        key: 'battleBackground', 
        src: '../assets/backgrounds/world_over_heavens.png'
    },
    {
        key: 'DioBardo',
        src: '../assets/sprites/DioBardo.png'
    }
    ],
    spritesheet: [
    {
        key: 'FFVICast', 
        params: { frameWidth: 680 / 4, frameHeight: 756 / 4 }, 
        src: '../assets/sprites/ffviCast.png'
    }
    ],
    audio: [{
        key: 'ayayay',
        src: '../assets/audio/Jojo-Awaken.mp3'
    }
    ]
};


const enemies = [DIOBARDOCONFIG];
const players = [PLAYEREDGARCONFIG, PLAYERSHDOWCONFIG, PLAYERLOCKECONFIG, PLAYERTERRACONFIGS];
const music = {};
const background = {
    key: 'battleBackground',
    type: 'image', 
    config: {x: 350, y: 250}
};


