import ATBCharacterBridge from './atb-system.js';
import ActionRegistry from './battle-animator.js';


function AttachTurnSystemToCharacter(character, battle) {
    character.TurnSystem = new ATBCharacterBridge({ 
        //inactive: true, 
        character, onReady: () => {
            let registry = ( character.isAlly() ) ? battle.Players : battle.Enemies;
            registry.queue.push(character);
            battle.onCharacterDone(character);
        }
    }); 
}

function ManageRegistryTurn(battle, registry) {
    if ( registry && !registry.current && registry.queue[0] ) {

        // if the player has an action

        registry.current = registry.queue[0]; 
        battle.onCharacterTurn(registry.current);
    }
}


export default class AtbBattle {

    constructor(options) {

        let {
            Enemies, Players, 
            onCharacterUpdate, onCharacterTurn, onCharacterDone, 
            scene
        } = options;

        this.Animator = new ActionRegistry();

        this.Enemies = Enemies;
        this.Players = Players;
        this.onCharacterUpdate = onCharacterUpdate || function () {};
        this.onCharacterTurn = onCharacterTurn || function () {};
        this.onCharacterDone = onCharacterDone || function () {};

        this.forAllCharacters(character => AttachTurnSystemToCharacter(character, this) );
    }

    

    forAllCharacters(f) {
        this.Enemies.forEach((character, index) => f(character, index) );
        this.Players.forEach((character, index) => f(character, index) );
    }

    // set current player and enemy
    update(callback) {
        
        // resolve actions
        if (this.Animator.busy) { return; }
        if (this.Animator.hasAction) { this.Animator.resolve(); return; }

        // update character atb
        this.forAllCharacters(c => c.TurnSystem.update(() => this.onCharacterUpdate(c) ) );
        
        // manage turns
        ManageRegistryTurn(this, this.Players);
        ManageRegistryTurn(this, this.Enemies);

        callback();
    }


    get Animator() {
        return this._Animator;
    }
    set Animator(v) {
        this._Animator = v;
    }

    get Enemies() {
        return this._Enemies;
    }
    set Enemies(v) {
        this._Enemies = v;
    }

    get Input() {
        return this._Input;
    }
    set Input(v) {
        this._Input = v;
    }

    get Players() {
        return this._Players;
    }
    set Players(v) {
        this._Players = v;
    }

    get Turn() {
        return this._Turn;
    }
    set Turn(v) {
        this._Turn = v;
    }



    get onCharacterDone() {
        return this._onCharacterDone;
    }
    set onCharacterDone(v) {
        this._onCharacterDone = v;
    }

    get onCharacterUpdate() {
        return this._onCharacterUpdate;
    }
    set onCharacterUpdate(v) {
        this._onCharacterUpdate = v;
    }

    get onCharacterTurn() {
        return this._onCharacterTurn;
    }
    set onCharacterTurn(v) {
        this._onCharacterTurn = v;
    }
}