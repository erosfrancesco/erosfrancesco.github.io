import BATTLESTATS from '../battle_stats/index.js';
const {BuildStatuses, StatStatuses, TurnStatuses, StatRegistry} = BATTLESTATS;


export default class Character {
	constructor({
			ally = false, 
			name = "???", 
			Sprite, 
			Commands,
			stats, 
			activeStatuses, 
			Animations = {}, 
			onDamageType = {}, 
			onDamage = function () {}
		}) {

		this.type = (ally) ? 'Ally' : 'Enemy';
		this.name = name;

		// animations
		this.Animations = Animations;
		// Commands
		this.Commands = Commands;
		// Sprite			
		this.Sprite = Sprite;                 
		// StatRegistry
		this.Stats = new StatRegistry(stats); 

		// StatusRegistry
		this.Statuses = BuildStatuses(activeStatuses);


		// events
		this.events = {
			onDamageType,
			onDamage
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
		v.value = v.value || 0;
		v.type = v.type || 0;
		
		const onDamageTypeEvent = this.events.onDamageType[v.type] || function(x) {return x;};
		const d = this.Stats.get('damage');
		this.Stats.set('damage', d + onDamageTypeEvent(v));
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
