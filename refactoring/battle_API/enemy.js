class Enemy extends Character {
  constructor(options) {
    options = options || {};
    let {name, stats, sprite, commands, onDamage, onDamageType} = options;

    super({name, stats, sprite, ally: false, onDamageType, onDamage});
    
    this.Commands = commands;
  }
}

