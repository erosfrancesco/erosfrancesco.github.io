import slotMaps from '../slotMaps.js';

const PLAYERSHDOWCONFIG = {
    commands: [ 'FIGHT' ],
    name: 'ShdoW',
    sprite: {
        type: 'sprite',
        key: 'FFVICast', 
        frame: 4,
        slotMap: slotMaps.players,
        config: {
            scaleX: 1.1,
            scaleY: 1.1
        }
    },
    stats: {
        "str": 6,
        "def": 1,
        "dex": 6,
        "lvl": 5,
        "lif": 70,
        "man": 9
    }
};

export default PLAYERSHDOWCONFIG;