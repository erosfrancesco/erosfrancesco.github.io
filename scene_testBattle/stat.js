class StatRegistry {

  constructor(options) {
    this._stats = options || {};
  }

  set(key, value) {
    this._stats[key] = value;
  }

  get(key) {
    return this._stats[key];
  }

  remove(key) {
    delete this._stats[key];
  }

}
