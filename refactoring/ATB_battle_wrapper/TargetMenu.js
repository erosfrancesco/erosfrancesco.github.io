class TargetMenu extends Menu {
	constructor(options) {

        let { scene, targets, battle } = options;
        let { Animator } = battle;

        super({
            items: [targets],
            cullX: targets.lenght, 
            cullY: 1
        });

        this.itemIterator((item, colIndex, rowIndex) => {
            let {Sprite, name} = item;
            let {x, y, width, height} = Sprite;

            x -= (width / 4);
            
            item._targetLabel = new FFVIText({scene, width, height, x, y, text: name});
            item.onSelect = () => Animator.setPlayerActionTargets([item]);

            /******************************************************************/

            Sprite.on('pointerdown', () => {
                this.X = colIndex;
                this.Y = rowIndex;

                this.updateItems();
            });

            item._targetLabel.on('pointerdown', () => item.onSelect() );
            /******************************************************************/
        });

        this.updateItems();
	}


    computeItemVisibility(item) {
        item._targetLabel.visible = (item === this.currentItem);
    }

    updateItems() {
        this.itemIterator(t => this.computeItemVisibility(t) );
    }


    up() {
        super.down();
        this.updateItems();
    }

    down() {
        super.up();
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
        this.itemIterator(t => t._targetLabel.destroy() );
    }
}
