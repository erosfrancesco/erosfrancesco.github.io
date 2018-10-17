export default class DefaultBattleAnimation {
    constructor(options) {

        let {executor, battle, onDone} = options;

        this.executor = executor;
        this.battle = battle;
        this.onDone = onDone || function () {};
        this.watcher = 0;
    }

    resolve(callback) { // example
        setTimeout(() => callback(), 1000); 
    }


    resolveCallback(callback) {
        this.watcher++;
        if ( this.watcher >= this.targets.length ) { this.onDone(); callback(); }
    }

    
    get onDone() {
        return this._onDone;
    }
    set onDone(v) {
        this._onDone = v;
    }


    get watcher() {
        return this._watcher;
    }
    set watcher(v) {
        this._watcher = v;
    }


    get targets() {
        return this._targets;
    }
    set targets(v) {
        this._targets = v;
    }


    get battle() {
        return this._battle;
    }
    set battle(v) {
        this._battle = v;
    }

    get scene() {
        return this._battle.scene;
    }
}


