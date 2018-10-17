export default class MenuRegistry {
    constructor(options) {
        options = options || {};
        let {menus, keep, onDestroy, onAdd} = options;

        this.onDestroy = onDestroy || function (menu, callback) { callback(); }
        this.onAdd = onAdd || function (menu, callback) { callback(); }

        this._keep = keep || 0;
        this._menuList = menus || [];
    }

    add(menu)  {
        this.onAdd(menu, () => this._menuList.push(menu) );
    }

    remove() {
        if ( this._menuList[this._keep] ) {
            this.current.destroy();
            //console.log(this.current.destroy);
            this.onDestroy(this.current, () => this._menuList.pop() );
        } 
    }

    reset() {
        while( this._menuList[this._keep] ) { this.remove(); }
    }

    get length() {
        return this._menuList.length;
    }

    get current() {
        return this._menuList[this._menuList.length - 1];
    } 

    get onAdd() {
        return this._onAdd;
    }

    set onAdd(v) {
        this._onAdd = v;
    }

    get onDestroy() {
        return this._onRemove;
    }

    set onDestroy(v) {
        this._onRemove = v;
    }
}
