export default class BattleScene extends Phaser.Scene {

    constructor({inputSceneKey}) {
        
        super("Battle");
      
        this.Animator = new ActionRegistry();

        this.Enemies = new CharacterRegistry();
        this.Players = new CharacterRegistry();
        this.inputScene = inputSceneKey;
    }

    // forEach
    forAllCharacters(f) {
        this.Enemies.forEach((character, index) => f(character, index) );
        this.Players.forEach((character, index) => f(character, index) );
    }
    
    // input from
    set inputScene(key) {
        this._inputSceneKey = key;
    }
    
    get inputScene() {
        return this.scene.getScene(this._inputSceneKey);
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
}
