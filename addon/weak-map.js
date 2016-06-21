import Ember from 'ember';

const {
  meta
} = Ember;

let id = 0;
const dateKey = new Date().getTime();
const metaKey = symbol();

function UNDEFINED() {}

function symbol() {
  return `__ember${dateKey}${id++}`;
}

class WeakMap {
  constructor(iterable) {
    this._id = symbol();

    if (iterable === null || iterable === undefined) {
      return;
    } else if (Array.isArray(iterable)) {
      for (let i = 0; i < iterable.length; i++) {
        let [key, value] = iterable[i];
        this.set(key, value);
      }
    } else {
      throw new TypeError('The weak map constructor polyfill only supports an array argument');
    }
  }

  /*
   * @method get
   * @param key {Object}
   * @return {*} stored value
   */
  get(obj) {
    const metaInfo = meta(obj);
    const metaObject = metaInfo[metaKey];

    if (metaInfo && metaObject) {
      if (metaObject[this._id] === UNDEFINED) {
        return undefined;
      }

      return metaObject[this._id];
    }
  }

  /*
   * @method set
   * @param key {Object}
   * @param value {Any}
   * @return {Any} stored value
   */
  set(obj, value) {
    const type = typeof obj;

    if (!obj || (type !== 'object' && type !== 'function')) {
      throw new TypeError('Invalid value used as weak map key');
    }

    const metaInfo = meta(obj);
    if (value === undefined) {
      value = UNDEFINED;
    }

    if (!metaInfo[metaKey]) {
      metaInfo[metaKey] = {};
    }

    metaInfo[metaKey][this._id] = value;
    return this;
  }

  /*
   * @method has
   * @param key {Object}
   * @return {Boolean} if the key exists
   */
  has(obj) {
    const metaInfo   = meta(obj);
    const metaObject = metaInfo[metaKey];

    return (metaObject && metaObject[this._id] !== undefined);
  }

  /*
   * @method delete
   * @param key {Object}
   */
  delete(obj) {
    const metaInfo = meta(obj);

    if (this.has(obj)) {
      delete metaInfo[metaKey][this._id];

      return true;
    }

    return false;
  }
}

export default (Ember.WeakMap) ? Ember.WeakMap : WeakMap;
