// more than one type is possible.
export default class BattleDamage {
	constructor(options) {
		let {value} = options;
		let types = BattleDamage.typesList();

		this.value = value;
		this.types = {};

		types.forEach(type => {
			if (options[type]) { this.types[type] = true; }
		});
	}

	// add here
	static typesList() {
		return ['piercing', 'blunt', 'slashing', 'physical', 'magical'];
	}

	set value(v) {
		this._value = v;
	}
	get value() {
		return this._value;
	}

	set types(v) {
		this._types = v;
	}
	get types() {
		return this._types;
	}

	is() {
		let res = true;
		Object.keys(arguments).forEach(index => { 
			let type = arguments[index];
			res = res && (this.types[type] || false); 
		});
		return res;
	}

}




// example 
// let a = new BattleDamage({value: 3, piercing: true, blunt: true});