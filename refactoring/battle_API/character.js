class Character {
  constructor(options) {

    let {ally, name, sprite, stats, Animations, onDamageType, onDamage} = options;

		this.type = (ally) ? 'Ally' : 'Enemy';
		this.name = name || '???';

    this.Animations = Animations || { Death: CharacterDeathAnimation1 }
					
    this.Sprite = sprite;                 // Sprite
    this.Stats = new StatRegistry(stats); // StatRegistry
    this.Statuses = new StatRegistry({    // StatusRegistry
      'slow': false,
      'haste': false,
      'poison': false,
      'sap': false,
      'float': false,
      'zombie': false,
      'berserk': false,
      'stop': false,
      'old': false,
      'confused': false
    }); 

    stats.dmg = stats.dmg || 0;
    stats.usedMana = stats.usedMana || 0;

    this.events = {
      onDamageType: onDamageType || {},
      onDamage: onDamage || function () {}
    }
    
  }



  getVelocity() {
    let v = this.Stats.get('dex');
    let l = this.getLevel();
    
    if ( this.Statuses.get('slow') ) { v = v / 2; }
    if ( this.Statuses.get('haste') ) { v = v * 2; }
    v = Math.floor(v * l);

    return (v > 255) ? 255 : v ;
  }

  getStrenght() {
    let s = this.Stats.get('str');
    let l = this.getLevel();
    
    if (this.Statuses.get('zombie')) { s = s * 5 / 4; }
    if (this.Statuses.get('berserk')) { s = s * 5 / 4; }
    s = Math.floor(s * l);
    return (s > 255) ? 255 : s;
  }

  getLevel() {
    let l = this.Stats.get('lvl');
    if (this.Statuses.get('old')) { l = l / 4; }
    return Math.floor(l);  
  }

  // life
  get life() {
    let l = this.Stats.get('lif');
    let d = this.Stats.get('dmg');

    return (d > l) ? 0 : l - d;
  }

  set damage(v) {
    let d = this.Stats.get('dmg');
    this.Stats.set('dmg', d + v);
    this.events.onDamage();
  }

  /*
  set onDamage(v) {
    this._onDamage = v;
  }

  get onDamage() {
    return this._onDamage;
  }
  /**/

  // mana
  get mana() {
    let l = this.Stats.get('man');
    let d = this.Stats.get('usedMana');

    return (d > l) ? 0 : l - d;
  }
  



  isAlly() {
    return (this.type === 'Ally');
  }

  set events(v) {
    this._events = v;
  }

  get events() {
    return this._events;
  }
}