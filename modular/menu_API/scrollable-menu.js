export default class Menu {
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

	get items() { return this._items; }
	set items(v) { this._items = v; }

	get cullY() { return this._cullY; }
	set cullY(v) { this._cullY = v; }

	get cullX() { return this._cullX; }
	set cullX(v) { this._cullX = v; }

	get currentItem() {
		return this._items[this.X][this.Y];
	}


	// methods
	/***************************************************************************/

	up() {
		if (this.Y) {
			this.Y--;
		}		
	}

	down() {
		if (this.Y < this.items[0].length - 1) {
			this.Y++;
		}
	}

	left() {
		if (this.X) {
			this.X--;
		}
	}	

	right() {
		if (this.X < this.items.length - 1) {
			this.X++;
		}
	}

	

	itemIterator(iteratee) {
		this.items.forEach( (row, colIndex) => 
			row.forEach( (item, rowIndex) => iteratee(item, colIndex, rowIndex) )
		);
	}

	/***************************************************************************/
}
