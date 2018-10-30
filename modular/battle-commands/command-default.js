export default class DefaultBattleCommand {

    constructor(options) {
        const {label, action, battle} = options;

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