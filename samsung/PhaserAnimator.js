class PhaserAnimator {
	constructor(options) {
		this.busy = options.busy || false;
	}
	
	get busy() {
		return this._busy;
	}
	set busy(v) {
		this._busy = v;
	}

}