import BattleDamage from '../battle_utils/battle-damage.js';

export default class Damage extends BattleDamage {
    constructor(options, exec, target) {

        // intial settings
        options.value = 30;
        options.blunt = true;
        
        // compute exec and target
        const atkRoll = Phaser.Math.Between(1, exec.Stats.get('strength') ) * 2;
        const defRoll = Phaser.Math.Between(1, target.Stats.get('defense') ) * 2;
        options.value -= defRoll;
        options.value += atkRoll;
        options.value = (options.value < 0) ? 0 : options.value;
        
        super(options);
        
        Object.keys(this.types).forEach(type => {
            if (target.events.onDamageType[type])
            target.events.onDamageType[type](this);
        });
    }
}

/*
export function ComputeDamage(exec, target) {

    let value = 30;
    const atkRoll = Phaser.Math.Between(1, exec.Stats.get('strength') ) * 2;
    const defRoll = Phaser.Math.Between(1, target.Stats.get('defense') ) * 2;
    
    value -= defRoll;
    value += atkRoll;
    value = (value < 0) ? 0 : value;
    

    const damage = new BattleDamage({value, blunt: true});

    Object.keys(damage.types).forEach(type => {
        if (target.events.onDamageType[type])
        target.events.onDamageType[type](damage);
    });
    
    return damage;
}
/**/
