export default class CharacterRegistry extends Phaser.Events.EventEmitter {

	constructor(options) {
		options = options || {};

		let { characters, onAdd, onRemove } = options;

		characters = characters || [];
		onAdd      = onAdd      || function(p, callback) { callback(); };
		onRemove   = onRemove   || function(p, callback) { callback(); };

		super();

		this.addCallback = onAdd;
		this.removeCallback = onRemove;
		this.playerList = [];
		this.queue = [];
		characters.forEach(p => this.add(p) );
	}



	get length() {
		return this.playerList.length;
	}
	
	get queue() {
		return this._queue;
	}

	set queue(v) {
		this._queue = v;
	}

	get playerList() {
		return this._playerList;
	}

	set playerList(v) {
		this._playerList = v;
	}

	get addCallback() {
		return this._addCallback;
	}

	set addCallback(v) {
		this._addCallback = v;
	}

	get removeCallback() {
		return this._removeCallback;
	}

	set removeCallback(v) {
		this._removeCallback = v;
	}

	get current() {
		return this._current;
	}

	set current(v) {
		this._current = v;
	}



	add(player) {
		this.addCallback(player, () => this.playerList.push(player) );
	}

	forEach(f) {
		this.playerList.forEach((obj, indx) => f(obj, indx) );
	}
	
	remove(filters) {
		const match = this.playerList.findIndex(filters);
		if ( match < 0 ) return;
		this.removeCallback(this.playerList[match], () => this.playerList.splice(match, 1) );
	}
	
	find(filters) {
		return this.playerList.find(filters);
	}

	findIndex(filters) {
		return this.playerList.findIndex(filters);
	}

	random() {
		const max = this.length - 1;
		const index = Phaser.Math.Between(0, this.length - 1);
		return this.find((c, indx) => indx === index );
	}

	randomIndex() {
		return Phaser.Math.Between(0, this.length - 1);
	}
	
	
}
