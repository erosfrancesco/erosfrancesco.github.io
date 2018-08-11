const PLAYERTERRACONFIGS = {
    commands: [ 'FIGHT', 'ITEMS' ],
    name: 'Terra',
    sprite: {
        type: 'sprite',
        key: 'FFVICast', 
        frame: 0,
        slotMap: slotMaps.players,
        config: {
            scaleX: 1.1,
            scaleY: 1.1
        }
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