class ScrollableMenu {
	constructor (options) {

		// options sanitization
		/***********************************************************************/

		let thisOptions = {
			cullX: options.cullX || 1,
			cullY: options.cullY || 4,
			scrollX: options.scrollX || 0,
			scrollY: options.scrollY || 0,
			cursorX: options.cursorX || 0,
			cursorY: options.cursorY || 0,
			items:   options.items || [[]]
		};

		this.items = thisOptions.items;

		thisOptions.cullY = (thisOptions.cullY > this.items[0].length) ? this.items[0].length : thisOptions.cullY;
		thisOptions.cullX = (thisOptions.cullX > this.items.length)    ? this.items.length    : thisOptions.cullX;

		// properties
		/***********************************************************************/

		// menu scroll culling
		this.cullY = thisOptions.cullY;
		this.cullX = thisOptions.cullX;
		// menu scrolling indexes
		this.scrollY = thisOptions.scrollY;
		this.scrollX = thisOptions.scrollX;
		// cursor position indexes
		this.cursorX = thisOptions.cursorX;
		this.cursorY = thisOptions.cursorY;

		this.update();
	}

	// getters and setters
	/***************************************************************************/

	get items() { return this._items; }

	set items(v) { 
		this._items = v;
	}

	// methods
	/***************************************************************************/

	up() {

		if (this.cursorY) {
			this.cursorY--;
		}else{
			if (this.scrollY) {
				this.scrollY--;
			}
		}
		this.update();
	}	

	down() {

		if (this.cursorY < this.cullY - 1) {
			this.cursorY++;
		}else{
			if ( this.scrollY * this.cullY < this.elements[0].length - 1) {
				this.scrollY++;
			}
		}
		this.update();
	}

	left() {

		if (this.cursorX) {
			this.cursorX--;
		}else{
			if (this.scrollX) {
				this.scrollX--;
			}
		}
		this.update();
	}

	right() {

		if (this.cursorX < this.cullX - 1) {
			this.cursorX++;
		}else{
			if ( this.scrollX * this.cullX < this.elements.length - 1 ) {
				this.scrollX++;
			}
		}
		this.update();
	}

	update() {}

	itemIterator(iteratee) {
		this._items.forEach( (row, rowIndex) => {
			row.forEach( (item, lineIndex) => {
				iteratee(item, rowIndex, lineIndex);
			});
		});
	}

	setItemDOM(item, rowIndex, lineIndex) {}

	/***************************************************************************/
}
