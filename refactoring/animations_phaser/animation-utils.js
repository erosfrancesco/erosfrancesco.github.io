function ApplySpriteTint(Sprite, color) { Sprite.setTint(color); }


function DeathTween({Sprite}, callback) {
	Sprite.__deathPhaserTween = RGBATween({Sprite}, {
        targets: Sprite,
        props: {
            g: 18, 
            r: 128,
            b: 128,
            a: 0,
            ease: 'Linear' 
        },
        duration: 250,
        onComplete: () => {
        	callback();
        	delete Sprite.__deathPhaserTween;
        }
    });
}


function BlinkTween({Sprite}, callback) {
    Sprite.__fightPhaserTween = RGBATween({Sprite}, {
        targets: Sprite,
        props: {
            g: 128, 
            r: 128,
            b: 128,
            a: 255,
            ease: 'Linear' 
        },
        duration: 75,
        repeat: 2,
        yoyo: true,
        onComplete: () => {
            callback();
            delete Sprite.__fightPhaserTween;
        }
    });
}


function TrembleTween({Sprite}, callback) {

    Sprite.__trmblePhaserTween = Sprite.scene.tweens.add({
        targets: Sprite,
        x: Sprite.x + 3,
        ease: 'Linear',
        duration: 100,
        repeat: 1,
        yoyo: true,
        onComplete: () => {
            callback();
            delete Sprite.__trmblePhaserTween;
        }
    });
}


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

function PhaserTimeout(milliseconds, callback) {
    
}

export default {ApplySpriteTint, RGBATween, DeathTween, TrembleTween, BlinkTween};