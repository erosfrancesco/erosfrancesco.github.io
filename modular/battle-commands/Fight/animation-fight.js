// battle damage
import BattleDamage from '../../battle_utils/battle-damage.js';
import DefaultBattleAnimation from '../animation-default.js';

import AwaitWaterfall from '../awaitWaterfall.js';
import Utils from '../animation-utils.js';
const {ApplySpriteTint, RGBATween} = Utils;



function ComputeFightDamageValue(exec, target) {

    let value = 30;
    let atkRoll = Phaser.Math.Between(1, exec.Stats.get('strength') ) * 2;
    let defRoll = Phaser.Math.Between(1, target.Stats.get('defense') ) * 2;
    
    value -= defRoll;
    value += atkRoll;
    value = (value < 0) ? 0 : value;
    

    let damage = new BattleDamage({value, blunt: true});

    Object.keys(damage.types).forEach(type => {
        if (target.events.onDamageType[type])
        target.events.onDamageType[type](damage);
    });

    console.log(damage);

    return 100;
}



export default class FightAction extends DefaultBattleAnimation {
    
    constructor(options) {
        super(options);
    }

    resolve(callback) {
        this.executorWaterfall(() => {
            delete this.executor.__FightActionWaterfall;
            callback();
        });        
    }


    // executor
    executorWaterfall(callback) {
        this.executor.__FightActionWaterfall = new AwaitWaterfall([ 

            // first step
            next => {
                // error here !
                //ApplySpriteTint(this.executor.Sprite, 0xff00ff);
                BlinkTween(this.executor, next);
                /*
                this.executor.Sprite.__FightActionEvent1 = this.scene.time.addEvent({ 
                    delay: 1000,
                    callback: next
                });
                /**/
            }, 

            // second step
            next => {
                delete this.executor.Sprite.__FightActionEvent1;
                //ApplySpriteTint(this.executor.Sprite, 0xffffff);
                next();
            },

            // final step
            next => {
                this.targets.forEach(target => this.targetWaterfall(target, next) );
            }
        ], (err) => {
            callback(err);
        });
    }



    // for each target
    targetWaterfall(target, callback) {

        target.__FightActionWaterfallTarget = new AwaitWaterfall([
                        
            // target first step
            next => {
                //ApplySpriteTint(target.Sprite, 0x00ff00);
                const damage = ComputeFightDamageValue(this.executor, target);
                next(damage);
            },

            // target second step
            (next, damage) => {
                TrembleTween(target, (damage) => { next(damage); });
                //target.Sprite.__FightActionEvent1 = this.scene.time.addEvent({
                //    delay: 1000,
                //    callback: () => next(damage)
                //});
            },

            // target final step
            (next, damage) => {
                delete target.Sprite.__FightActionEvent1;
                ApplySpriteTint(target.Sprite, 0xffffff);
                        
                // optional step to display damage
                //battle.displayPlayerDamage(target, damage, () => next({target, damage}) );
                //(next, {damage, target}) => {
                
                this.resolveCallback(() => {
                    console.log('hello there');
                    this.battle.applyDamage(target, damage);
                    callback();
                });
                
                next();
            }

        ], (err) => {});
    }

}




function BlinkTween({Sprite}, callback) {
    Sprite.__fightPhaserTween = RGBATween(Sprite.scene, {
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


function TrembleTween({Sprite, damage}, callback) {
    // display damage

    // trembling
    console.log('Trembling')
    Sprite.__trmblePhaserTween = Sprite.scene.tweens.add({
        targets: Sprite,
        x: Sprite.x + 50,
        ease: 'Linear',
        duration: 75,
        repeat: 2,
        yoyo: true,
        onComplete: () => {
            callback();
            delete Sprite.__trmblePhaserTween;
        }
    });
}

