// wrapper based on phaser 3 input api
export default class KeyMapper {
    constructor(options) {
        
        let { debounce, input, keys, scene } = options;

        this.scene = scene;
        
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
//                    console.log(key); 
                    key.command(key); 
                    allKeyReleased = false; 
                } 
            });
            if (allKeyReleased) this.noKeyPressed();
        };
    }

    get scene() { return this._scene; }
    set scene(v) { this._scene = v; }

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

    // Phaser.Input.Keyboard.KeyCodes.A
    addKey(key) {
        this.PhaserKeyboard.keys[key] = this.scene.input.keyboard.addKey(key);
    }

    removeKey(keyCode) {
        delete this.PhaserKeyboard.keys[keyCode];
    }

/*
DownDuration(key [, duration])
Returns true if the Key was pressed down within the duration value given, or false if it either isn't down,
or was pressed down longer ago than then given duration.
*/
    update() {
        //console.log('debounce: ', this.debounce);
        this.debounceCounter++;
        this.debounceCounter %= this.debounce;
        if (!this.debounceCounter) this.input(this.PhaserKeyboard.keys);
    }
}