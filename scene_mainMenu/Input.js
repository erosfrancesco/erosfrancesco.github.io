class PhaserInput {
	constructor(options) {
		
		let {game, input} = options;

		if (!input || !game) { return; }
		this._map = {};

		Object.keys(input.keyboard).forEach(key => {

			let {onHold, onDown, debounce} = input.keyboard[key];
			
			this._map[key] = game.input.keyboard.addKey(key);
			game.input.keyboard.addKeyCapture(key);

			if (debounce || debounce === 0) {

				let f = onHold || onDown;

				this._map[key]._debounceCounter = 0;
				this._map[key]._debounce = debounce;
				this._map[key].onHoldCallback = () => {
					this._map[key]._debounceCounter++;
					if (this._map[key]._debounceCounter > this._map[key]._debounce) {
						this._map[key]._debounceCounter = 0;
						f();
					}
				};
			}
			
			this._map[key].onDown.add(() => {
				this._map[key].debounceCounter = 0;
				onDown();
			}, this);
		});
	}

	forEach(iteratee) {
		Object.keys(this._map).forEach(key => {
			iteratee(this._map[key], key, this._map);
		});
	}
}