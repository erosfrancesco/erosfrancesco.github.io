import TURNSYSTEM from '../turn_system/index.js';
const {ATBCharacterBridge} = TURNSYSTEM;

import Battle from './battle.js';

export default class AtbBattle extends Battle {

    constructor(options) {
        super(options);
        this.Turn.update = () => {
            this.forAllCharacters((character, index) => {
                character.ATBBridge.update(() => {}) 
            });
        }
    }

    
    makePlayer(characterConf) {
        const character = super.makePlayer(characterConf);
        character.ATBBridge = new ATBCharacterBridge({
            character, 
            onReady: (c) => { this.Turn.add(c); }
        });
    }

    makeEnemy(characterConf) {
        const character = super.makeEnemy(characterConf);
        character.ATBBridge = new ATBCharacterBridge({
            character, 
            onReady: (c) => { this.Turn.add(c); }
        });
    }

}