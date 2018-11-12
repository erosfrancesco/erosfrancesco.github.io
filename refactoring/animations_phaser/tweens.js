import HEADERS from './headers.js';
const {ApplySpriteTint, RGBATween, PhaserTimeout} = HEADERS;


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


export default {ApplySpriteTint, RGBATween, DeathTween, TrembleTween, BlinkTween};