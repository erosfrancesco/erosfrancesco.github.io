export default class BattleScene extends Phaser.Scene {

    constructor({inputSceneKey}) {
        
        super("Battle");
      
        this.Animator = new ActionRegistry();

        this.Enemies = new CharacterRegistry();
        this.Players = new CharacterRegistry();
        
        this.TurnSystem = new TurnSystem();
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
    update() {
        
        // resolve actions
        if (this.Animator.busy) { return; }
        if (this.Animator.hasAction) { this.Animator.resolve(); return; }

        // update character turns
        this.forAllCharacters(c => TurnSystem.update(c) );
        
        // if there is a character that must resolve its turn...
        

    }
}
