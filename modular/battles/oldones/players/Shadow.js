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
        "strenght": 4,
        "defense": 1,
        "dexterity": 1,
        "level": 2,
        "life": 90,
        "mana": 29
    }
};

export default PLAYERSHDOWCONFIG;