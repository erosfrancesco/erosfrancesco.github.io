class PhaserAnimator {
	constructor(options) {
		options = options || {};
		
		let { busy } = options;

		busy = busy || false;
		this.busy = busy;
	}
	
	get busy() {
		return this._busy;
	}
	set busy(v) {
		this._busy = v;
	}

}