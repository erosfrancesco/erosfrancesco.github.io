import Menu from './scrollable-menu.js';
import FFVIMenuBackground from './ffvi-menu-background.js';
import ARROWBUTTONS from './arrow-button.js';

let {UpArrowButton, DownArrowButton, LeftArrowButton, RightArrowButton} = ARROWBUTTONS;

export default class FFVIMenu extends Menu {
	constructor(options) {

		let {
			items,
			cullX, cullY,
			width, height,
			x, y, 
			noArrows, verticalArrows, horizontalArrows, scene, battle
		} = options;

		super({ items, cullX, cullY });

		this.background = new FFVIMenuBackground({
            scene, 
            x, y, 
            width, height,
            noArrows, verticalArrows, horizontalArrows
        });


        if (horizontalArrows) {
        	this.background.leftArrow.setEvent('pointerdown', () => this.up() );
        	this.background.rightArrow.setEvent('pointerdown', () => this.down() );
        }

        if (verticalArrows) {
        	this.background.upArrow.setEvent('pointerdown', () => this.left() );
        	this.background.downArrow.setEvent('pointerdown', () => this.right() );
        }
        
        this.background.setEvent('pointerdown', () => this.currentItem.onSelect({scene, battle}) );


        ////////////////////////////////////////////////////////////////////////////////////////

        this.scene = scene;

		this.wrapper = scene.add.container(x, y);
		this.itemIterator((t, colIndex, rowIndex) => {
			this.computeItemSize(t, colIndex, rowIndex);
			this.computeItemPosition(t, colIndex, rowIndex);
			this.computeItemVisibility(t, colIndex, rowIndex);
			this.wrapper.add(t.sprite);
		});

	}


	get width() { return this.background.width; }
	set width(v) { this.background.width = v; }


	get height() { return this.background.height; }
	set height(v) { this.background.height = v; }


	computeItemVisibility(t) {

		if (t.x >= this.width) {
			t.visible = false;
			return;
		}

		if (t.x < 0 ) {
			t.visible = false;
			return;
		}

		if (t.y >= this.height + 1 - (this.height / this.cullY ) ) {
			t.visible = false;
			return;
		}

		if (t.y < 1 - this.height / this.cullY ) {
			t.visible = false;
			return;
		}

		t.visible = true;
	}

	computeItemPosition(t, ix, iy) {
		t.x = t.width * (ix); // to work here
		t.y = t.height * (iy - (this.cullY - 1) / 2);
	}

	computeItemSize(t) {
		t.width = this.width / this.cullX;
		t.height = this.height / this.cullY;
		t.sprite.width = t.width;
		t.sprite.height = t.height;
	}


	updateItems() {
		this.itemIterator((t, colIndex, rowIndex) => {
			this.computeItemPosition(t, colIndex - this.X, rowIndex - this.Y);
			this.computeItemVisibility(t);
		});
	}


	up() {
		super.up();
		this.updateItems();
	}

	down() {
		super.down();
		this.updateItems();
	}

	left() {
		super.left();
		this.updateItems();
	}

	right() {
		super.right();
		this.updateItems();
	}

	destroy() {
		this.background.destroy();
        this.wrapper.destroy();
    }
}
