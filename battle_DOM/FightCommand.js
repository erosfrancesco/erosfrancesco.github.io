class FightCommand {
    constructor(options) {

        options = options || {};
        let {battle} = options;

        this.label = 'FIGHT';
        this.action = (options) => {

            options = options || {};
            let {player, battle} = options;

            let target = battle.Players.getPlayer(p => { return p.menuIndex === 1 });

            player.Action = new TestActionObject({
                executor: player,
                targets:  [ target ],
                battle
            });

            battle.Animator.add( player.Action );

        };

       
    }
}



class TestActionObject {
    constructor(options) {

        let {executor, targets, battle} = options;

        this.executor = executor;
        this.targets = targets;
        this.battle = battle;
            
        this.resolve = callback => {

            ApplySpriteTint(this.executor.Sprite, 0xff00ff);

            setTimeout(() => {

                ApplySpriteTint(this.executor.Sprite, 0xffffff);

                this.targets.forEach(target => {
                    ApplySpriteTint(target.Sprite, 0x00ff00);
                });

                setTimeout(() => {

                    this.targets.forEach(target => {
                        ApplySpriteTint(target.Sprite, 0xffffff);
                    });

                    this.battle.endPlayerTurn(this.executor);
                    callback();
                }, 1000);
                                
            }, 1000);
        };
    }
}


function ApplySpriteTint(sprite, color) {
    sprite.tint = color;
}
