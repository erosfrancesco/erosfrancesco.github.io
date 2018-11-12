class ProtoActionRegistry {
	constructor(options) {
        options = options || {};
        const {actions, busy} = options;
		this.busy = busy || false;
        this.actions = actions || [];
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

    add(action) {
        this.actions.push(action);
    }

    removeFirstAction() {
        this.actions.splice(0, 1);
        this.busy = false;
    }

}

export default class ActionRegistry extends ProtoActionRegistry {
    constructor(options) {
        super(options);
    }

    resolve() {
        if (!this.firstAction) { return; }
        
        this.busy = true;
        this.actionResolverBridge(this.firstAction, () => this.removeFirstAction() );
    }

    actionResolverBridge(action, callback) {
        action.resolve(action.targets, action.executor, callback);
    }
    
    
    get firstAction() {
    	return this.actions[0];
    }

    set firstAction(v) {
        this.actions[0] = v;
    }

    get hasAction() {
    	return this.actions.length;
    }
}
