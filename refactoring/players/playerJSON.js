const FFVICastSpritesheetKey = 'FFVICastSprites';

const PLAYERTERRACONFIG = {
    commands: [ 'FIGHT', 'ITEMS' ],
    name: 'Terra',
    sprite: {
        type: 'sprite',
        key: FFVICastSpritesheetKey,
        frame: 0,
        config: {}
    },
    stats: {
        "str": 4,
        "dex": 3,
        "lvl": 5,
        "lif": 90,
        "man": 29
    },
    Animations: {
        "Death": CharacterDeathAnimation1
    }
};

const PLAYERLOCKECONFIG = {
    commands: [ 'FIGHT', 'ITEMS' ],
    name: 'Locke',
    sprite: {
        type: 'sprite',
        key: FFVICastSpritesheetKey,
        frame: 2,
        config: {}
    },
    stats: {
        "str": 5,
        "dex": 4,
        "lvl": 5,
        "lif": 100,
        "man": 19
    }
};

const PLAYEREDGARCONFIG = {
    commands: [ 'FIGHT', 'ITEMS' ],
    name: 'Edgar',
    sprite: {
        type: 'sprite',
        key: FFVICastSpritesheetKey,
        frame: 3,
        config: {}
    },
    stats: {
        "str": 5,
        "dex": 4,
        "lvl": 5,
        "lif": 100,
        "man": 19
    }
};

const PLAYERSHDOWCONFIG = {
    commands: [ 'FIGHT', 'ITEMS' ],
    name: 'ShdoW',
    sprite: {
        type: 'sprite',
        key: FFVICastSpritesheetKey,
        frame: 4,
        config: {}
    },
    stats: {
        "str": 6,
        "dex": 6,
        "lvl": 5,
        "lif": 70,
        "man": 9
    }
};



function loadFFVICast(scene) {
    const FFVICastSpritesheetUrl = '../assets/ffviCast.png';
    scene.load.spritesheet(FFVICastSpritesheetKey, FFVICastSpritesheetUrl, { frameWidth: 680 / 4, frameHeight: 756 / 4 });
}