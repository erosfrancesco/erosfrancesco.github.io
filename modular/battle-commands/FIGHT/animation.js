// battle damage
import Damage from './logic.js';
import Animation from './animation.js';

import AwaitWaterfall from '../awaitWaterfall.js';
import Utils from '../animation-utils.js';
const {ApplySpriteTint, RGBATween} = Utils;


/*
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
/**/



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
            (next) => {
                ApplySpriteTint(this.executor.Sprite, 0xff00ff);
                this.executor.Sprite.__FightActionEvent1 = this.scene.time.addEvent({ 
                    delay: 1000,
                    callback: next
                });
            }, 

            // second step
            (next) => {
                delete this.executor.Sprite.__FightActionEvent1;
                ApplySpriteTint(this.executor.Sprite, 0xffffff);
                next();
            },

            // final step
            (next) => {
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
            (next) => {
                ApplySpriteTint(target.Sprite, 0x00ff00);
                const damage = new Damage({}, this.executor, target);
                next(damage);
            },

            // target second step
            (next, damage) => {
                target.Sprite.__FightActionEvent1 = this.scene.time.addEvent({
                    delay: 1000,
                    callback: () => next(damage)
                });
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




