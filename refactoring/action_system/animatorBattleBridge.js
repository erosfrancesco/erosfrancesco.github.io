export default class TurnActionRegistry {
    constructor(character, BattleAnimator) {
        this.character = character;
        this.animator = BattleAnimator;
        this.Actions = [];
    }

    add(action) {
        this.Actions.push(action);
    }

    unshift() {
        this.Actions.splice(0, 1);
    }

    remove(index) {
        this.Actions.splice(index, 1);
    }

    execute() {
        // refactor targets...
        // check if action is permitted
        if (!this.firstAction) { return; }
        const {executor, targets} = this.firstAction;
        if (!executor || !targets) { return; }


        this.animator.add(this.firstAction);
        this.unshift();
    }

    get firstAction() {
        return this.Actions[0];
    }
}

/*
function computeActionTarget(action) {
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


/* computeActionTarget(action) {
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
        const registry = (executor.isAlly) ? battle.Players : battle.Enemies;



        
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
*/