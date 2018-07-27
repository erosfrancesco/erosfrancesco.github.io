BuildCharacterCommands = (scene, battle, commands) => {
    const COMMANDNAMEMAP = {
        'FIGHT': (options) => { return new FightCommand(options) },
        'ITEMS': (options) => { return new ItemsCommand(options) }
    };

    let C = commands.map(name => { return COMMANDNAMEMAP[name]({battle, scene}); });
    return C
}


class _ATBCommandProto {
    constructor(options) {
        let {label, action, battle} = options;

        this.battle = battle;
        this.label = label;
        this.action = action;
    }


    get action() {
        return this._action;
    }

    set action(v) {
        this._action = v;
    }

    get label() {
        return this._label;
    }

    set label(v) {
        this._label = v;
    }

    get battle() {
        return this._label;
    }

    set battle(v) {
        this._label = v;
    }
}



class _ATBActionProto {
    constructor(options) {

        let {executor, battle} = options;

        this.executor = executor;
        this.battle = battle;
    }

    resolve(callback) {
        setTimeout(() => callback(), 1000); 
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
}