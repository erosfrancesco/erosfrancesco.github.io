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
		let match = this._playerList.find(filters);
		if ( match ) {

			this._playerList.splice(this._playerList.indexOf(match), 1);
			//this.emit('remove', {filters});
			this._removeCallback(match, this);
		}
	}
	
	find(filters) {
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
