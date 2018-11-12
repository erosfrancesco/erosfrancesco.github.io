function ApplySpriteTint(Sprite, color) { Sprite.setTint(color); }

function PhaserTimeout(delay, scene, callback) { return scene.time.addEvent({ delay, callback }); }

function RGBATween({Sprite}, tweenConfig) {

    const TintTween = {
        r: 255,
        g: 255,
        b: 255,
        a: 1
    };

    tweenConfig.targets = TintTween;
    tweenConfig.onUpdate = () => {

        let {r, g, b, a} = TintTween;

        r = Math.floor(TintTween.r).toString(16);
        g = Math.floor(TintTween.g).toString(16);
        b = Math.floor(TintTween.b).toString(16);

        if (r.length < 2) { r = '0' + r ;}
        if (g.length < 2) { g = '0' + g ;}
        if (b.length < 2) { b = '0' + b ;}
        
        const tint = '0x' + r + '' + g + '' + b;

        Sprite.tint = tint;
        Sprite.alpha = a;
    }

    return Sprite.scene.tweens.add(tweenConfig);
}


export default {ApplySpriteTint, RGBATween, PhaserTimeout};