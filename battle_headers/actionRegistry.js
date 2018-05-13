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

}

class ActionRegistry extends PhaserAnimator {
    constructor(options) {
        options = options || {};
        let {actions} = options;
        actions = actions || [];
        super({actions});
        
        this._actions = actions;
    }
    
    add(Action) {
        this._actions.push(Action);
    }
    
    resolve() {

        if (!this._actions[0]) { return; }
        
        //console.log('Starting', this._actions );
        this.busy = true;
        this._actions[0].resolve(() => {
            this._actions.pop();
            this.busy = false;
        });
    }
}

/*
// test action

let TestAction = {
    executor: {name: 'exeggutor'},
    targets: [{name: 'palmapalmapalma'}],
    
    resolve: function(callback) {
        console.log(this.executor.name);
        this.targets.forEach(target => console.log(target.name));
        setTimeout(() => {
            console.log('DONE');
            callback(); 
        }, 2000);
    }
};


let TestAction2 = {
    executor: {name: 'exeggutor again'},
    targets: [{name: 'palmapalmapalma'}],
    
    resolve: function(callback) {
        console.log(this.executor.name);
        this.targets.forEach(target => console.log(target.name));
        setTimeout(() => {
            console.log('DONE');
            callback(); 
        }, 2000);
    }
};

let animator = new ActionRegistry();

animator.add(TestAction);
animator.add(TestAction2);
setInterval(() => { if (!animator.busy) { animator.resolve(); } }, 30);
/**/