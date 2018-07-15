class _ATBCommandProto {
    constructor(options) {
        let {label, action, battle} = options;

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

    get label() {
        return this._label;
    }

    set label(v) {
        this._label = v;
    }

    get battle() {
        return this._label;
    }

    set battle(v) {
        this._label = v;
    }
}




class FightCommand extends _ATBCommandProto {
    constructor(options) {

        super({ label: 'FIGHT' });

        this.action = options => {

            let {player, battle, scene} = options;
            let {Players, Enemies, Animator} = battle;

            player.Action = new TestActionObject({executor: player, battle});

            // build player action
            Animator.addCharacterAction(player);
            
            // compute available targets and set the target menu
            let targets = [];
            Players.forEach(p => targets.push(p));
            Enemies.forEach(p => targets.push(p));

            console.log(targets);
            
            battle.UI.UIMenus.add( new TargetMenu({ scene, targets, battle }) );
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

        let {executor, battle} = options;

        this.executor = executor;
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

    get targets() {
        return this._targets;
    }
    set targets(v) {
        this._targets = v;
    }


    get battle() {
        return this._battle;
    }
    set battle(v) {
        this._battle = v;
    }
}


function ApplySpriteTint(sprite, color) {
    sprite.tint = color;
}
