export default class KeyMapper {
    constructor(options) {
        

        let { debounce, input, keys, scene } = options;
        let keycodes = Phaser.Input.Keyboard.KeyCodes;

        this.PhaserKeyboard = scene.input.keyboard; // can't extend
        this.debounce = debounce || 8;
        this.debounceCounter = 0;
        this.noKeyPressed = function() {};

        let cursors = this.PhaserKeyboard.createCursorKeys();
        cursors.up.command = function (e) {};
        cursors.down.command = function (e) {};
        cursors.left.command = function (e) {};
        cursors.right.command = function (e) {};

        // default input loop
        this.input = input || function(keys) { 
            let allKeyReleased = true;
            keys.forEach(key => { 
                if (key.isDown) { 
                    key.command(key); 
                    allKeyReleased = false; 
                } 
            });
            if (allKeyReleased) this.noKeyPressed();
        };
    }


    get noKeyPressed() { return this._noKeyPressed; }
    set noKeyPressed(v) { this._noKeyPressed = v; }
    
    get debounce() { return this._debounce; }
    set debounce(v) { this._debounce = v; }

    get debounceCounter() { return this._debounceCounter; }
    set debounceCounter(v) { this._debounceCounter = v; }

    get PhaserKeyboard() { return this._PhaserKeyboard; }
    set PhaserKeyboard(v) { this._PhaserKeyboard = v; }

    get input() { return this._input; }
    set input(v) { this._input = v; }

    mapKey(keyCode, onUp) {
        let key = this.PhaserKeyboard.keys[keyCode];
        key = key || this.PhaserKeyboard.addKey(keyCode);
        key.command = onUp || function() {};
    }

    removeKey(keyCode) {
        delete this.PhaserKeyboard.keys[keyCode];
    }

    update() {
        this.debounceCounter++;
        this.debounceCounter %= this.debounce;
        if (!this.debounceCounter) this.input(this.PhaserKeyboard.keys);
    }
    /**/
}