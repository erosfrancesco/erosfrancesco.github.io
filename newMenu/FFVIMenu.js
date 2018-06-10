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
		

		let graphics = scene.add.graphics();

		this.background = new FFVIMenuBackground({
            scene, 
            x, y, 
            width, height
        });

		this.wrapper = scene.add.container(x, y);
		this.itemIterator((t, colIndex, rowIndex) => {

			this.computeItemSize(t);
			this.computeItemPosition(t, colIndex, rowIndex);
			this.computeItemVisibility(t);
			this.wrapper.add(t.sprite);

		});

	}


	get width() { return this.background.width; }
	set width(v) { this.background.width = v; }


	get height() { return this.background.height; }
	set height(v) { this.background.height = v; }


	computeItemVisibility(t) {

		if (t.x <= -this.width) {
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

			/*
			t.on('pointerover', (evnt) => t.sprite.selected() );
            t.on('pointerout', (evnt) => t.sprite.notSelected() );
            t.on('pointerdown', pointer =>  console.log('selected') );


			let b = t.sprite.getBounds();
			graphics.lineStyle(1, 0xff0000);
            graphics.strokeRectShape(b);
            /**/

	}

	computeItemSize(t) {
		t.width = width / this.cullX;
		t.height = height / this.cullY;
	}


	updateItems() {
		this.itemIterator((t, colIndex, rowIndex) => {
			this.computeItemPosition(t, colIndex + this.X, rowIndex - this.Y);
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
}