export default class MenuRegistry {
    constructor({
        onAdd = function (menu, callback) { callback(); }, 
        onDestroy = function (menu, callback) { callback(); }, 
        keepDefault = 0,
        items = []
    }) {
        this.onDestroy = onDestroy;
        this.onAdd = onAdd;
        this._keep = keepDefault;
        this.list = [];
        items.forEach(item => this.add(item) );
    }

    add(menu)  {
        this.onAdd(menu, () => this.list.push(menu) );
    }

    remove() {
        this.onDestroy(this.current, () => this.list.pop() ); 
    }

    reset() {
        while( this.list[this._keep] ) { this.remove(); }
    }

    get length() {
        return this.list.length;
    }

    get current() {
        return this.list[this.length - 1];
    }
}