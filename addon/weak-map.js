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
  constructor() {

    /*
     * NOTE: The constructor no longer takes an
     * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) as
     * an argument. This is so that the implementation mimics the internal version of ember's weakmap:
     * https://github.com/emberjs/ember.js/blob/d801dc31a406d15b545564a60ce26d4f5e6a2a32/packages/ember-metal/lib/weak_map.js#L24-L27
     *
     * NOTE: Another reason is that we want to support environments where ES2015 might not be avaliable and
     * since iterables need Symbols then we decided to drop the support for them altogether.
     */
    if (arguments.length) {
      throw new Error('Invoking the WeakMap constructor with arguments is not supported at this time');
    }

    this._id = symbol();
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
