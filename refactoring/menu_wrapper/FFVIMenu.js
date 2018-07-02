class FFVIMenu extends Menu {
	constructor(options) {

		let {
			items,
			cullX, cullY,
			width, height,
			x, y, 
			scene
		} = options;

		super({ items, cullX, cullY });

		this.background = new FFVIMenuBackground({
            scene, 
            x, y, 
            width, height
        });

        this.scene = scene;

		this.wrapper = scene.add.container(x, y);
		this.itemIterator((t, colIndex, rowIndex) => {

			this.computeItemSize(t, colIndex, rowIndex);
			this.computeItemPosition(t, colIndex, rowIndex);
			this.computeItemVisibility(t, colIndex, rowIndex);
			this.wrapper.add(t.sprite);

			/*
			t.on('pointerover', pointer => t.sprite.selected() );
            t.on('pointerout',  pointer => t.sprite.notSelected() );
            t.on('pointerdown', pointer => this.right() );

            t.on('touchstart', pointer => t.sprite.selected() );
            t.on('touchmove', pointer => this.left() );
            //t.on('pointermove', pointer => this.down() );
            /**/

        
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

		if (t.x < 0) {
			t.visible = false;
			return;
		}

		if (t.y >= this.height) {
			t.visible = false;
			return;
		}

		if (t.y < 0) {
			t.visible = false;
			return;
		}

		t.visible = true;
	}

	computeItemPosition(t, ix, iy) {
		t.x = t.width * ix;
		t.y = t.height * iy;
	}

	computeItemSize(t) {
		t.width = this.width / this.cullX;
		t.height = this.height / this.cullY;
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
