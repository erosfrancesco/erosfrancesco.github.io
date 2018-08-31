import PLAYERTERRACONFIG from './Terra.js';
import PLAYEREDGARCONFIG from './Edgar.js';
import PLAYERLOCKECONFIG from './Locke.js';
import PLAYERSHDOWCONFIG from './Shadow.js';

let playerAssets = {
    // baseUrl...
    spritesheet: [{
        key: 'FFVICast', 
        params: { frameWidth: 680 / 4, frameHeight: 756 / 4 }, 
        src: 'ffviCast.png'
    }]
};

export default { PLAYERTERRACONFIG, PLAYEREDGARCONFIG, PLAYERLOCKECONFIG, PLAYERSHDOWCONFIG, playerAssets };