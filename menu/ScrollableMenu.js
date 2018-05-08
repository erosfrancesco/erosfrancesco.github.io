class ScrollableMenu extends Menu {

	constructor (options) {

        options = options || {};

		super(options);

        this.selectable = options.selectable || false;
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

        let y, x;

        x = item.width  * ( -this.cursorY);
        y = item.height * ( -this.cursorX);
        
        /*
        if ( this.cursorX > this.cullX) {
            y = item.height * ( -this.cursorX);
        }else{
            y = 0;
        }

        if ( this.cursorX > this.cullX) {
            x = item.width  * ( -this.cursorY);
        }else{
            x = 0;
        }
        /**/
        
        
        item.y = y;
        item.x = x;

        if (this.cursorY === rowI && this.cursorX === colI) {
            this._current = item;
        	if (this.selectable) { item.selected(); }
        	item.visible = true;
        	return;
        }

        if (this.selectable) { item.notSelected(); }
        
		if (colI < this.cursorX || colI > this.cursorX + this.cullX + 1 ) {
            item.visible = false;
            return;
        }
        if (rowI < this.cursorY || rowI > this.cursorY + this.cullY + 1 ) {
            item.visible = false;
            return;
        }

        item.visible = true;
        /**/
	}

    get selectable() {
        return this._selectable;
    }
    set selectable(v) {
        this._selectable = v;
    }

	up() {
		super.up();
		this.itemIterator((item, colI, rowI) => this.updateItem(item, colI, rowI) );
	}

	down() {
		super.down();
        console.log('Hl');
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
