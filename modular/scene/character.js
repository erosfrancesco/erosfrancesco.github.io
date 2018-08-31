import StatRegistry from '../battle_stats/stat.js';
import STATUSES from '../battle_stats/statuses-index.js';
let {BuildStatuses, StatStatuses, TurnStatuses} = STATUSES;

export default class Character {
	constructor(options) {

		let {ally, name, sprite, stats, activeStatuses, Animations, onDamageType, onDamage} = options;

		this.type = (ally) ? 'Ally' : 'Enemy';
		this.name = name || '???';

		// animations
		this.Animations = Animations; // || { Death: CharacterDeathAnimation1 };
			
		// Sprite			
		this.Sprite = sprite;                 
		// StatRegistry
		this.Stats = new StatRegistry(stats); 

		// StatusRegistry
		this.Statuses = BuildStatuses(activeStatuses);

		// events
		this.events = {
			onDamageType: onDamageType || {},
			onDamage: onDamage || function () {}
		}

	}



	getVelocity() {
		let v = this.Stats.get('dexterity');
		let l = this.getLevel();
		v = StatStatuses.checkFor(this, 'dexterity', v);
		v = Math.floor(v * l);

		return (v > 255) ? 255 : v ;
	}

	getStrenght() {
		let s = this.Stats.get('strength');
		let l = this.getLevel();
		s = StatStatuses.checkFor(this, 'strength', s);
		s = Math.floor(s * l);
		return (s > 255) ? 255 : s;
	}

	getLevel() {
		let l = this.Stats.get('level');
		l = StatStatuses.checkFor(this, 'level', l);
		return l;
	}

	// life
	get life() {
		let l = this.Stats.get('life');
		let d = this.Stats.get('damage');
		return (d > l) ? 0 : l - d;
	}

	set damage(v) {
		let d = this.Stats.get('damage');
		this.Stats.set('damage', d + v);
		this.events.onDamage();
	}

	// mana
	get mana() {
		let l = this.Stats.get('mana');
		let d = this.Stats.get('usedMana');
		return (d > l) ? 0 : l - d;
	}
  
  	//
	set events(v) {
		this._events = v;
	}

	get events() {
		return this._events;
	}



	isAlly() {
		return (this.type === 'Ally');
	}
}