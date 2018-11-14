export default class StatRegistry {

    constructor({}) {
        this.stats = {};

        Object.keys(StatRegistry.defaults).forEach(stat => {
            this.stats[stat] = options[stat] || StatRegistry.defaults[stat];
        });
    }

    // mod stat here.
    static get defaults() {
        return {
            'life':         1,
            'damage':       0,
            'mana':         1,
            'usedMana':     0,
            
            'level':        1,
            'dexterity':    1,
            'strength':     1,
            'defense':      1,
            'intelligence': 1
        }
    }


    get stats() {
        return this._stats;
    }
    set stats(v) {
        this._stats = v;
    }


    set(key, value) {
        this.stats[key] = value;
    }

    get(key) {
        return this.stats[key];
    }

    remove(key) {
        delete this.stats[key];
    }

}
