class _ATBCommandProto {
    constructor(options) {
        let {battle, label, action} = options;

        this.battle = battle;
        this.label = label;
        this.action = action;
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

    get label() {
        return this._label;
    }

    set label(v) {
        this._label = v;
    }
}




class FightCommand extends _ATBCommandProto {
    constructor(options) {
        let {battle} = options;

        super({battle});
        this.label = 'FIGHT';
        this.action = (options) => {

            options = options || {};
            let {player} = options;

        };
    }
}




class ItemsCommand extends _ATBCommandProto {
    constructor(options) {
        let {battle} = options;

        super({battle});
        this.label = 'ITEMS';
        this.action = (options) => {

            options = options || {};
            let {player} = options;

        };
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
