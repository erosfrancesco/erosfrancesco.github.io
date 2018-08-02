class ActionManager extends ActionRegistry {
    constructor(options) {
        let { scene, battle } = options;
        super();
        this.scene = scene;
        this.battle = battle;
    }

    resolve() {
        
        if (!this.actions[0]) return;

        this.busy = true;

        let {targets, executor} = this.actions[0];

        // check executor
        let registry = (executor.type === 'Ally') ? this.battle.Players : this.battle.Enemies;
        let exist = registry.find(c => { return c.index === executor.index; });
        
        
        
        if (!exist) {
        registry.current = false; 
            this.currentPlayerActionToBeExecuted = false;
            this.removeFirstAction();
            console.log(executor.name, 'must not be: ', this);
            return; 
        }

            

        // check targets
        targets.forEach(target => {
            let registry = (target.type === 'Ally') ? this.battle.Players : this.battle.Enemies;
            let exist = registry.find(c => { return c.index === target.index; });
            
            if (!exist) {
                // refactor target
                let newTarget = registry.random();
                this.actions[0].targets = [newTarget];
            }
        });

        this.busy = true;
        // resolve action
        super.resolve();
    }

    addCharacterAction(character) {
        if (character.type === 'Ally') {
            this.currentPlayerActionToBeExecuted = character.Action;
        }
    }

    setPlayerActionTargets(targets) {
    	// check those targets!
        this.currentPlayerActionToBeExecuted.targets = targets;
        this.add( this.currentPlayerActionToBeExecuted );
        this.battle.endPlayerTurn(this.battle.Players.current, player => console.log('end turn for: ', player.name));
    }

    set currentPlayerActionToBeExecuted(v) {
        this._currentPlayerActionToBeExecuted = v;
    }
    get currentPlayerActionToBeExecuted() {
        return this._currentPlayerActionToBeExecuted;
    }
}




