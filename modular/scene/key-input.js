import KeyMapper from '../engine/key-mapper.js';

function checkCurrentPlayerMenu(battle) {
    if (!battle.Players.current) return false;
    if (!battle.Players.current.Menu) return false;
    if (!battle.Players.current.Menu.current) return false;

    return battle.Players.current.Menu.current;
}

export default class BattleKeyInput extends KeyMapper {
    constructor(options) {
        super(options);
        this.battle = options.battle;

        this.setKeyCommand(40, key => {
            console.log('down'); 
            // all checks necessary
            let current = checkCurrentPlayerMenu(this.battle);
            if (current) return;
            current.down();
        });


        this.setKeyCommand( Phaser.Input.Keyboard.KeyCodes.A, key => {
            console.log('a',  ); 
            // all checks necessary
            // this.ATBBattle.Players.current.Menus.current.currentItem.command()
        });
        /**/
    }


    setKeyCommand(key, command) {
        
        if (!key) {
            this.noKeyPressed = command;
            return;
        }

        this.mapKey(key, command);
    }


    set battle(v) {
        this._battle = v;
    }
    get battle() {
        return this._battle;
    }
}
