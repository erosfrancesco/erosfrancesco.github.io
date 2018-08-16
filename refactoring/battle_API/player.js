class Player extends Character {
  constructor(options) {
    options = options || {};
    let {name, stats, sprite, commands, onDamage, onDamageType} = options;

    super({name, stats, sprite, ally: true, onDamage, onDamageType});
  
    this.Commands = commands;

  }
}
