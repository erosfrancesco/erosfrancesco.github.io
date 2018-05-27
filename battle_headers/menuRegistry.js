class MenuRegistry {

  constructor(options) {
    options = options || {};
    let {menus, keep} = options;

    this._keep = keep || 0;
    this._menuList = menus || [];
  }

  add(menu)  {
    this._menuList.push(menu);
  }

  remove() {
    if ( this._menuList[this._keep] ) {
      this._menuList.pop();
    } 
  }

  reset() {
    while( this._menuList[this._keep] ) {
      this._menuList.pop();
    }
  }

  get length() {
    return this._menuList.length;
  }

  get current() {
    return this._menuList[this.menuList.length - 1];
  }   
}
