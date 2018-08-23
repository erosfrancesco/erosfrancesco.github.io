import DefaultBattleAnimation from './animation-default.js';
import Utils from './animation-utils.js';
let {ApplySpriteTint, RGBATween} = Utils;



function ComputeFightDamageValue(exec, target) {

    let value = 30;
    let atkRoll = Phaser.Math.Between(1, exec.Stats.get('str') ) * 2;
    let defRoll = Phaser.Math.Between(1, target.Stats.get('def') ) * 2;
    
    value -= defRoll;
    value += atkRoll;
    value = (value < 0) ? 0 : value;
    
    let damage = new BattleDamage({value, blunt: true});

    Object.keys(damage.types).forEach(type => {
        if (target.events.onDamageType[type])
        target.events.onDamageType[type](damage);
    });

    return value;
}



export default class FightAction extends DefaultBattleAnimation {
    
    constructor(options) {
        super(options);
    }

    resolve(callback) {


        // executor sprite animation
        ApplySpriteTint(this.executor.Sprite, 0xff00ff);

        // targets sprite animation
        setTimeout(() => {
            ApplySpriteTint(this.executor.Sprite, 0xffffff);

            this.targets.forEach(target => {
                ApplySpriteTint(target.Sprite, 0x00ff00);

                // calc damage
                let damage = ComputeFightDamageValue(this.executor, target);
                
                // apply damages
                setTimeout(() => {
                   
                    ApplySpriteTint(target.Sprite, 0xffffff);
                    
                    this.battle.displayPlayerDamage(target, damage, () => {
                        this.resolveCallback(() => {
                            this.battle.applyDamageAndCheckLife(target, damage);
                            callback();
                        });
                    });

                }, 1000);
                
            });
   
        }, 1000);
    }
}
