export default class ItemsMatrix {
    constructor({
        items = [[]],
        window = { x, y }
    }) {
        this.items = items;
        this.x = 0;
        this.y = 0;
        this.window = window;
        this.window.x = this.window.x || 1;
        this.window.y = this.window.y || 1;
        
    }

    forEach(iterator) {
        this.items.forEach((row, indexX) => {
            if (row && row[0]) {
                row.forEach((item, indexY) => {
                    iterator(item, indexX, indexY);
                }); 
            }
        });
    }

    set window(v) {
        this._window = v;
    }

    get window() {
        let { x, y } = this._window;
        const itemsToBeDisplayed = [[]];
        itemsToBeDisplayed.forEach = (iterator) => {
            itemsToBeDisplayed.forEach((row, indexX) => {
                if (row && row[0]) { 
                    row.forEach((item, indexY) => iterator(item, indexX, indexY));
                } 
            });
        }

        while (x) {
            x--;
            if (x < 0) { return; }
            itemsToBeDisplayed[itemsToBeDisplayed.length - 1] = [];

            while (y) {
                y--;
                if (y < 0) { return; }
                if (!this.items[x + this.x]) { return; }

                itemsToBeDisplayed[itemsToBeDisplayed.length - 1].push(this.items[x + this.x][y + this.y]);
            }
        }

        return itemsToBeDisplayed;
    }

    get x() {
        return this._x;
    }
    set x(v) {
        if (v > this.items.length) { return; }
        if (v < 0) { return; }
        this._x = v;
    }

    get y() {
        return this._y;
    }
    set y(v) {
        if (v > this.items[0].length) { return; }
        if (v < 0) { return; }
        this._y = v;
    }

    get current() {
        return this.items[this.x][this.y];
    }
}