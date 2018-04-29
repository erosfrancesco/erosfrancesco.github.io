class ScrollableMenu extends Menu {

	constructor (options) {

		super(options);

		this._background = new MenuBackground(options);
        this.itemIterator((item, colI, rowI) => {
            this.setItem(item, colI, rowI);
            this.updateItem(item, colI, rowI);
        });
	}

	setItem(item, colI, rowI) {
		
		item.height = this._background.height / this.cullY;
        item.width  = this._background.width  / this.cullX;

        item.x = (item.width  * (rowI - this.cursorY));
        item.y = (item.height * (colI - this.cursorX));
        item.set();
        this._background._sprite.addChild(item._DOM);

	}

	updateItem(item, colI, rowI) {

        let y = item.height * ( -this.cursorX);
        let x = item.width  * ( -this.cursorY);
        
        item.y = y;
        item.x = x;

        if (this.cursorY === rowI && this.cursorX === colI) {
            this._current = item;
        	item.selected();
        	item.visible = true;
        	return;
        }

        item.notSelected();
        
		if (colI < this.cursorX || colI > this.cursorX + this.cullX - 1) {
            item.visible = false;
            return;
        }
        if (rowI < this.cursorY || rowI > this.cursorY + this.cullY - 1) {
            item.visible = false;
            return;
        }

        item.visible = true;
        /**/
	}

	up() {
		super.up();
		this.itemIterator((item, colI, rowI) => this.updateItem(item, colI, rowI) );
	}

	down() {
		super.down();

		this.itemIterator((item, colI, rowI) => this.updateItem(item, colI, rowI) );

	}

	left() {
		super.left();
		this.itemIterator((item, colI, rowI) => this.updateItem(item, colI, rowI) );
	}

	right() {
		super.right();
		this.itemIterator((item, colI, rowI) => this.updateItem(item, colI, rowI) );
	}
}
