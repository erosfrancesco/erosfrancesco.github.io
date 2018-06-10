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
		this.X = 0;
		this.Y = 0;
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
		if (this.X) {
			this.X--;
		}
	}	

	down() {
		if (this.X < this.items.length - 1) {
			this.X++;
		}
	}

	left() {
		if (this.Y) {
			this.Y--;
		}		
	}

	right() {
		if (this.Y < this.items[0].length - 1) {
			this.Y++;
		}
	}

	itemIterator(iteratee) {
		this.items.forEach( (row, colIndex) => 
			row.forEach( (item, rowIndex) => iteratee(item, colIndex, rowIndex) )
		);
	}

	/***************************************************************************/
}
