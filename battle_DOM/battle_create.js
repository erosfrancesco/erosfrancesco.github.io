// all of this must go to create function

class ATBBattle extends Battle {
    constructor(options) {
        options = options || {};
        
        let {
            players,
            enemies
        } = options;

        // player registry
        let Players = new CharacterRegistry({characters: players});
        
        // enemy registry
        let Enemies = new CharacterRegistry({characters: enemies});

        // Initialize turn system
        let Turn = new ATB();

        // Initialize the Animator
        let Animator = new ActionRegistry();

        // 
        super({Animator, Enemies, Players, Turn});

        this.Animator = Animator;
        this.Enemies = Enemies;
        this.Players = Players;
        this.Turn = Turn;
    }
}
    

