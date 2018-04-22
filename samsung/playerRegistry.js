class CharacterRegistry {

	constructor(options) {
		this._playerList = options.players;
		this._setAddCallback(options.onAdd || function(p) {});
		this._setRemoveCallback(options.onRemove || function(p) {});
	}
	
	add(player) {
		this._playerList.add(player);
		this._addCallback(player);
	}
	
	remove(filters) {
		let p = this._playerList.findIndex(filters);
		if (p > -1) {
			this._playerList.splice(p, 1);
			this._removeCallback(filters);
		}
	}
	
	get(filters) {
		return this._playerList.find(filters);
	}
	
	setRemoveCallback(f) {
		this._removeCallback = f;
	}
	
	setAddCallback(f) {
		this._addCallback = f;
	}
}
