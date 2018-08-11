class CharacterRegistry extends Phaser.Events.EventEmitter {

	constructor(options) {

		super();

		options = options || {};

		let {
			characters, 
			onAdd, 
			onRemove
		} = options;

		characters = characters || [];
		onAdd = onAdd || function(p, callback) { callback(); };
		onRemove = onRemove || function(p, callback) { callback(); };

		this.setAddCallback(onAdd);
		this.setRemoveCallback(onRemove);

		this._playerList = [];
		this._queue = [];
		characters.forEach(p => this.add(p) );
	}

	get length() {
		return this._playerList.length;
	}
	
	add(player) {
		this._addCallback(player, () => this._playerList.push(player) );
	}

	forEach(f) {
		this._playerList.forEach((obj, indx) => { f(obj, indx); });
	}
	
	remove(filters) {

		let match = this._playerList.findIndex(filters);
		if ( match < 0 ) return;
		this._removeCallback(this._playerList[match], () => this._playerList.splice(match, 1) );
	}
	
	find(filters) {
		return this._playerList.find(filters);
	}

	random() {
		let max = this.length - 1;
		let index = Phaser.Math.Between(0, this.length - 1);
		return this.find((c, indx) => { return indx === index; });
	}
	
	setRemoveCallback(f) {
		this._removeCallback = f;
	}
	
	setAddCallback(f) {
		this._addCallback = f;
	}
	/**/

	get queue() {
		return this._queue;
	}

	set queue(v) {
		this._queue = v;
	}
}
