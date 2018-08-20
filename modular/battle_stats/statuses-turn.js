// these statuses modify the updateTurn loop

export default class TurnStatuses {
    constructor() {}

    static get map() {
        return {
            
            'poison':   {},
            'sap':      {},
            'float':    {},
            'zombie':   {},
            'berserk':  {},
            'stop':     {},
            'confused': {}
        }
    }

    static forEach(f) { 
        Object.keys(TurnStatuses.map).forEach(status => f(status) );
    }

    static checkFor(stat, value) {
        TurnStatuses.forEach(status => {
            let modifier = TurnStatuses.map[status][stat];
            if (modifier) { value = modifier(value); }
        });
        return value;
    }
}
