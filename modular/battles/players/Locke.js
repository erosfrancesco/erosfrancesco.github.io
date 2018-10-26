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
        "strenght": 4,
        "defense": 1,
        "dexterity": 2,
        "level": 2,
        "life": 90,
        "mana": 29
    },

    activeStatuses: {
        'berserk': true
    }
};

export default PLAYERLOCKECONFIG;