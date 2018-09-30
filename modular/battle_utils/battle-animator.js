//import UTILS from '../engine/utils.js';
//let {deepClone} = UTILS;

class PhaserAnimator {
	constructor(options) {
        options = options || {};
        let {busy} = options;
        busy = busy || false;
		this.busy = busy;
	}
	
	get busy() {
		return this._busy;
	}
	set busy(v) {
		this._busy = v;
	}

    get actions() {
        return this._actions;
    }
    set actions(v) {
        this._actions = v;
    }

}

export default class ActionRegistry extends PhaserAnimator {
    constructor(options) {
        options = options || {};
        let {actions, busy} = options;
        actions = actions || [];
        super({busy});
        
        this.actions = actions;
    }
    
    
    get firstAction() {
    	return this.actions[0];
    }

    get hasAction() {
    	return this.actions.length;
    }
    

    add(Action) {
        // Action must be computed
        this.actions.push(Action);
    }

    removeFirstAction() {
        this.currentAction = false;
        this.actions.splice(0, 1);
        this.busy = false;
    }

    resolve() {
        
    	this.busy = true;
        this.currentAction = this.actions[0];

        if (!this.currentAction) { return; }

        this.currentAction.resolve( () => this.removeFirstAction() );
    }

    /////////

    computeActionTarget(action) {
        const {targets} = action;
        const computedTargets = [];

        targets.forEach(target => {
            const {pointer, registry} = target;
            // err management
            const character = registry._playerList[pointer];
            computedTargets.push(character);
        });
        return computedTargets;
    }

    computeActionExecutor(action) {
        const {executor} = action;
        const {pointer, registry} = executor;
        // err management
        const character = registry._playerList[pointer];
      
        return character;
    }

    ///////// character interface

    computeCharacterAction(character) {
        const {Actions} = character;
        return Actions || false;
    }

    loadCharacterAction(character) {
        
        let action = this.computeCharacterAction(character);

        if (!action) { return; }
        action.executor = this.computeActionExecutor(action);
        action.targets = this.computeActionTarget(action);

        this.add(action);
    }

}
