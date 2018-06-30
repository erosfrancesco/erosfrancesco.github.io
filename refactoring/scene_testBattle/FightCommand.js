class FightCommand {
    constructor(options) {

        options = options || {};
        let {battle} = options;
        this.battle = battle;

        console.log('Hello', battle);

        this.label = 'FIGHT';
        this.action = (options) => {

            options = options || {};
            let {player, battle} = options;

            console.log(player, battle)

            //let target = battle.Players.getPlayer(p => { return p.menuIndex === 1 });

            // build action
            player.Action = new TestActionObject({
                executor: player,
                //targets:  [ target ],
                battle
            });

            // add action to the animator (action stack)
            battle.Animator.add( player.Action );
            // reset battle.UI
            battle.UI.UIMenus.reset();

        };
    }


    get action() {
        return this._action;
    }

    set action(v) {
        this._action = v;
    }

    get battle() {
        return this._battle;
    }

    set battle(v) {
        this._battle = v;
    }
}



class TestActionObject {
    constructor(options) {

        let {executor, targets, battle} = options;

        this.executor = executor;
        //this.targets = targets;
        this.battle = battle;
            
        this.resolve = callback => {

            //ApplySpriteTint(this.executor.Sprite, 0xff00ff);

            setTimeout(() => {

                console.log('Action');

                /*
                ApplySpriteTint(this.executor.Sprite, 0xffffff);

                this.targets.forEach(target => {
                    ApplySpriteTint(target.Sprite, 0x00ff00);
                    // do some damage
                    target.damage = 40;
                    // display changes
                    target.menuDOM.update();
                });
                /**/

                setTimeout(() => {

                    //this.targets.forEach(target => ApplySpriteTint(target.Sprite, 0xffffff) );

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
