///////////////////////////////////////////////////////////////////////////////////////////////////////

BuildCharacterCommands = (scene, battle, commands) => {
    const COMMANDNAMEMAP = {
        'FIGHT': (options) => { return new FightCommand(options) },
        'ITEMS': (options) => { return new ItemsCommand(options) }
    };

    let C = commands.map(name => { return COMMANDNAMEMAP[name]({battle, scene}); });
    return C
}

ApplySpriteTint = (sprite, color) => { sprite.setTint(color); }


///////////////////////////////////////////////////////////////////////////////////////////////////////

RGBATween = (scene, tweenConfig) => {

    let TintTween = {
        r: 255,
        g: 255,
        b: 255,
        a: 1
    };

    let {targets, onUpdate} = tweenConfig;
    if ( !Array.isArray(targets) ) { targets = [targets]; }
    onUpdate = onUpdate || function(sprite, tint, a) {
        sprite.tint = tint;
        sprite.alpha = a;
    }

    tweenConfig.targets = TintTween;
    tweenConfig.onUpdate = () => {

        let {r, g, b, a} = TintTween;

        r = Math.floor(TintTween.r).toString(16);
        g = Math.floor(TintTween.g).toString(16);
        b = Math.floor(TintTween.b).toString(16);

        if (r.length < 2) { r = '0' + r ;}
        if (g.length < 2) { g = '0' + g ;}
        if (b.length < 2) { b = '0' + b ;}
        let tint = '0x' + r + '' + g + '' + b;

        targets.forEach(sprite => onUpdate(sprite, tint, a) );

    }

    return scene.tweens.add(tweenConfig);
}


CharacterDeathAnimation1 = (player, callback) => {

    console.log(player);

    let {Sprite} = player;
    let {scene} = Sprite;

    let tween = RGBATween(scene, {
        targets: Sprite,
        props: {
            g: 0, 
            //r: 128,
            b: 128,
            a: 0,
            ease: 'Linear' },
        duration: 500,
        onComplete: callback
    });

}

///////////////////////////////////////////////////////////////////////////////////////////////////////

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



class _ATBActionProto {
    constructor(options) {

        let {executor, battle} = options;

        this.executor = executor;
        this.battle = battle;
    }

    resolve(callback) {
        setTimeout(() => callback(), 1000); 
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