class Menu {
	constructor (options) {

		// options decostruction
		let {
			items,
			cullX, cullY
		} = options;

		// options sanitization
		items = items || [[]];
		cullX = cullX || 1;
		cullY = cullY || 1;
		cullY = (cullY > items.length)    ? items.length    : cullY;
		cullX = (cullX > items[0].length) ? items[0].length : cullX;

		// properties
		/***********************************************************************/
		this.items = items;

		// menu scroll culling
		this.cullY = cullY;
		this.cullX = cullX;
		// cursor indexes
		this.cursorX = 0;
		this.cursorY = 0;
	}

	// getters and setters
	/***************************************************************************/

	get items() { 
		return this._items; 
	}

	set items(v) { 
		this._items = v;
	}

	// methods
	/***************************************************************************/

	up() {
		if (this.cursorX) {
			this.cursorX--;
		}
	}	

	down() {
		if (this.cursorX < this._items.length - 1) {
			this.cursorX++;
		}
	}

	left() {
		if (this.cursorY) {
			this.cursorY--;
		}		
	}

	right() {
		if (this.cursorY < this._items[0].length - 1) {
			this.cursorY++;
		}
	}


	itemIterator(iteratee) {
		this._items.forEach( (row, colIndex) => {
			row.forEach( (item, rowIndex) => {
				iteratee(item, colIndex, rowIndex);
			});
		});
	}

	/***************************************************************************/
}
