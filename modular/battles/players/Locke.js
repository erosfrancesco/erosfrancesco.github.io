import slotMaps from '../slotMaps.js';

const PLAYERLOCKECONFIG = {
    commands: [ 'FIGHT' ],
    name: 'Locke',
    sprite: {
        type: 'sprite',
        key: 'FFVICast', 
        frame: 2,
        slotMap: slotMaps.players,
        config: {
            scaleX: 1.1,
            scaleY: 1.1
        }
    },
    stats: {
        "str": 5,
        "def": 1,
        "dex": 4,
        "lvl": 5,
        "lif": 100,
        "man": 19
    }
};

export default PLAYERLOCKECONFIG;