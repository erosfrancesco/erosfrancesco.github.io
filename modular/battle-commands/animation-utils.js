let ApplySpriteTint = (sprite, color) => { sprite.setTint(color); }


let RGBATween = (scene, tweenConfig) => {

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

export default {ApplySpriteTint, RGBATween};