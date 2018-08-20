// these statuses modify stat calculation

export default class StatStatuses {
    constructor() {}

    static get map() {
        return {
            'slow':     {
                'dexterity': value => { return value / 2; }
            },
            'haste':    {
                'dexterity': value => { return value * 2; }
            },
            'zombie':   {
                'strength': value => { return value * 5 / 4; }
            },
            'berserk':  {
                'strength': value => { return value * 5 / 4; }
            },
            'old':      {
                'level': value => { return value = value / 4; }
            }
        }
    }

    static forEach(f, c) { 
        Object.keys(StatStatuses.map).forEach(status => f(c, status) );
    }

    static checkFor(character, stat, value) {
        StatStatuses.forEach(status => {
            
            if (!character.Statuses[status]) return;

            let modifier = StatStatuses.map[status][stat];
            if (modifier) { value = modifier(value); }
        });
        return value;
    }
}
