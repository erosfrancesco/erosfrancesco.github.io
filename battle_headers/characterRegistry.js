class CharacterRegistry {

	constructor(options) {
		options = options || {};

		let {
			characters, 
			onAdd, 
			onRemove
		} = options;

		characters = characters || [];
		onAdd = onAdd || function(p) {};
		onRemove = onRemove || function(p) {};

		this._playerList = characters;
		this.setAddCallback(onAdd);
		this.setRemoveCallback(onRemove);
	}

	get length() {
		return this._playerList.length;
	}
	
	add(player) {
		this._playerList.push(player);
		this._addCallback(player, this);
	}

	forEach(f) {
		this._playerList.forEach((obj, indx) => { f(obj, indx); });
	}
	
	remove(filters) {
		let p = this._playerList.findIndex(filters);
		if (p > -1) {
			this._playerList.splice(p, 1);
			this._removeCallback(filters, this);
		}
	}
	
	getPlayer(filters) {
		return this._playerList.find(filters);
	}
	
	setRemoveCallback(f) {
		this._removeCallback = f;
	}
	
	setAddCallback(f) {
		this._addCallback = f;
	}
}
