import slotMaps from '../slotMaps.js';

const PLAYEREDGARCONFIG = {
    commands: [ 'FIGHT' ],
    name: 'Edgar',
    sprite: {
        type: 'sprite',
        key: 'FFVICast', 
        frame: 3,
        slotMap: slotMaps.players,
        config: {
            scaleX: 1.1,
            scaleY: 1.1
        }
    },
    stats: {
        "strenght": 4,
        "defense": 1,
        "dexterity": 1,
        "level": 2,
        "life": 90,
        "mana": 29
    }
};

export default PLAYEREDGARCONFIG;