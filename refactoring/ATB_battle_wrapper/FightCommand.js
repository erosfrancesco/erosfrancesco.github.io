class _ATBCommandProto {
    constructor(options) {
        let {label, action} = options;

        //this.battle = battle;
        this.label = label;
        this.action = action;
    }


    get action() {
        return this._action;
    }

    set action(v) {
        this._action = v;
    }

    /*
    get battle() {
        return this._battle;
    }

    set battle(v) {
        this._battle = v;
    }
    /**/

    get label() {
        return this._label;
    }

    set label(v) {
        this._label = v;
    }
}




class FightCommand extends _ATBCommandProto {
    constructor(options) {

        super({ label: 'FIGHT' });

        this.action = options => {

            let {player, battle} = options;
            let {Players, Enemies, Animator} = battle;

            // select target
            let target = Players.find((p, indx) => { return indx === 0; });

            // build action to be executed and send it to the animator
            Animator.add( new TestActionObject({executor: player, targets: [target], battle}) );
        };
    }
}




class ItemsCommand extends _ATBCommandProto {
    constructor(options) {
        

        super({label: 'ITEMS'});

        this.action = (options) => {

            let {player, battle} = options;
            let {Players, Enemies} = battle;

            // select target
            let target = Players.find((p, indx) => { return indx === 0; });

            // calc damage
            target.damage = 157;
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
                    // do some damage
                    target.damage = 40;
                });
                /**/

                setTimeout(() => {

                    this.targets.forEach(target => ApplySpriteTint(target.Sprite, 0xffffff) );

                    callback();
                }, 1000);
                                
            }, 1000);
        };
    }
}


function ApplySpriteTint(sprite, color) {
    sprite.tint = color;
}
