export default class FightMenu {
    constructor({ scene }) {
        this.scene = scene;
    }

    build({ player, scene }) {
        // compute player available items for Fight Menu
        player = player || { Commands: [] };
        const items = computeItemsFromCommands(player.Commands, scene);
        return new FightMenuBuilder({ items, scene });
    }
}

import MenuItem from './MenuItem.js';

function computeItemsFromCommands(commands, scene) {
    const items = [];
    commands.forEach(command => {
        const { label, onSelected } = command;
        const item = new MenuItem({ label, scene });
        item.onSelected = onSelected;
        item.visible = false;
        items.push(item);
    });
    return [items];
}

import ItemsMatrix from './ItemsMatrix.js';
import FFVIMenuBackground from './MenuBackground.js';

class FightMenuBuilder {
    constructor({ items, scene }) {
        
        this.logic = new ItemsMatrix({
            items,
            window: { x: 1, y: 4 }
        });

        this.background = new FFVIMenuBackground({
            scene,
            x: 400, y: 400,
            width: 200, height: 200,
            onComplete: () => {
                this.update();
                this.items.forEach(item => {
                    //item.visible = true;
                    //item.sprite.depth = 1;
                    //console.log(this.background);
                    //this.background.add(item.sprite);
                });
            }
        });

        
    }

    destroy(callback) {
        this.logic.forEach(row => row.forEach(item => item.destroy()));
        this.background.destroy(callback);
    }

    up() {
        this.logic.y++;
        this.update();
    }
    down() {
        this.logic.y--;
        this.update();
    }
    left() {
        this.logic.x--;
        this.update();
    }
    right() {
        this.logic.x++;
        this.update();
    }

    update() {
        const visibleItems = this.visibleItems;
        const selectedItem = this.logic.current;

        this.logic.forEach(item => { item.visible = true; });

        this.logic.forEach((item, indexX, indexY) => {
            // visibility
            item.visible = true;
            // position
            this.setItemPosition(item, indexX, indexY);
            // not selected
            this.setItemSelected(item, false);
        });

        // selected
        this.setItemSelected(selectedItem, true);
    }

    get visibleItems() {
        return this.logic.window;
    }

    get items() {
        return this.logic.items;
    }

    setItemPosition(item, indexX, indexY) {
        item.x = (item.width / 4) + this.background.x + (indexX * this.background.width / 1);
        item.y = -(item.height / 4) + this.background.y + indexY * this.background.height / 4;
    }

    setItemSelected(item, isSelected) {
        if (!item) { return; }
        item.selected = isSelected;
    }

}