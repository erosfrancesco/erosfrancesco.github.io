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
		onAdd = onAdd || function(p) {};
		onRemove = onRemove || function(p) {};

		this.setAddCallback(onAdd);
		this.setRemoveCallback(onRemove);

		this._playerList = [];
		characters.forEach(p => this.add(p) );
		//this._playerList = characters;
	}

	get length() {
		return this._playerList.length;
	}
	
	add(player) {
		this._playerList.push(player);
		this.emit('adding', {});
		this._addCallback(player, this);
	}

	forEach(f) {
		this._playerList.forEach((obj, indx) => { f(obj, indx); });
	}
	
	remove(filters) {
		let p = this._playerList.findIndex(filters);
		if (p > -1) {
			this._playerList.splice(p, 1);
			//this.emit('remove', {filters});
			this._removeCallback(filters, this);
		}
	}
	
	getPlayer(filters) {
		return this._playerList.find(filters);
	}

	//on(evnt, callback) { this.addListener(event, callback); }
	
	
	setRemoveCallback(f) {
		this._removeCallback = f;
	}
	
	setAddCallback(f) {
		this._addCallback = f;
	}
	/**/
}
