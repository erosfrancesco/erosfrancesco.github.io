class PhaserAnimator {
	constructor(options) {
        const {busy} = options;
		this.busy = busy || false;
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
        const {actions, busy} = options;
        super({busy});
        
        this.actions = actions || [];
    }
    
    
    get firstAction() {
    	return this.actions[0];
    }

    get hasAction() {
    	return this.actions.length;
    }
    

    add(Action) {
        // Action must be computed
        console.log(Action);
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
        const {targets, battle} = action;
        const computedTargets = [];

        targets.forEach(target => {
            //const {pointer, registry} = target;
            // err management
            //const character = registry._playerList[pointer];
            computedTargets.push(target);
        });
        return computedTargets;
    }

    computeActionExecutor(action) {
        const {executor, battle} = action;
        const registry = (executor.isAlly()) ? battle.Players : battle.Enemies;



        
        //const {pointer, registry} = executor;
        // err management
        //const character = registry._playerList[pointer];
      
        return executor;
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
