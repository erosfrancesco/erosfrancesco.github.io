class ActionManager extends ActionRegistry {
    constructor(options) {
        let { scene, battle } = options;
        super();
        this.scene = scene;
        this.battle = battle;
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




