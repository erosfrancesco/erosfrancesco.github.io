import slotMaps from '../slotMaps.js';

const PLAYERTERRACONFIG = {
    commands: [ 'FIGHT' ],
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
        "strenght": 4,
        "defense": 1,
        "dexterity": 1,
        "level": 5,
        "life": 90,
        "mana": 29
    },
    Animations: {
        //"Death": CharacterDeathAnimation1
    }
};

export default PLAYERTERRACONFIG;