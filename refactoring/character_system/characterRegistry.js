export default class CharacterRegistry {

	constructor({
		onAdd = function(p, callback) { callback(); },
		onRemove = function(p, callback) { callback(); },
		characters = []
	}) {

		this.addCallback = onAdd;
		this.removeCallback = onRemove;
		this.playerList = [];
		characters.forEach(p => this.add(p) );
	}


	get length() {
		return this.playerList.length;
	}


	add(player) {
		this.addCallback(player, () => this.playerList.push(player) );
	}

	forEach(f) {
		this.playerList.forEach((obj, indx) => f(obj, indx) );
	}
	
	remove(filters) {
		const match = this.playerList.findIndex(filters);
		if ( match < 0 ) { return; }
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
