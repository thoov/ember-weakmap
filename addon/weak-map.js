import Ember from 'ember';

var {
  assert,
  meta
} = Ember;

var id      = 0;
var dateKey = new Date().getTime();
var metaKey = symbol();

function UNDEFINED() {}

function symbol() {
  return `__ember${dateKey}${id++}`;
}

function isPrimitiveType(thing) {
  switch(typeof thing) {
    case 'string':
    case 'boolean':
    case 'number':
    case 'undefined':
    case 'null':
    case 'symbol':
      return true;
    default:
      return false;
  }
}

class WeakMap {
  constructor() {
    this._id = symbol();
  }

  /*
   * @method get
   * @param key {Object}
   * @return {*} stored value
   */
  get(obj) {
    var metaInfo   = meta(obj);
    var metaObject = metaInfo[metaKey];

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
    assert('Uncaught TypeError: Invalid value used as weak map key', !isPrimitiveType(obj));
    var metaInfo = meta(obj);
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
    var metaInfo   = meta(obj);
    var metaObject = metaInfo[metaKey];

    return (metaObject && metaObject[this._id] !== undefined);
  }

  /*
   * @method delete
   * @param key {Object}
   */
  delete(obj) {
    var metaInfo = meta(obj);

    if (this.has(obj)) {
      delete metaInfo[metaKey][this._id];

      return true;
    }

    return false;
  }
}

export default (Ember.WeakMap) ? Ember.WeakMap : WeakMap;
