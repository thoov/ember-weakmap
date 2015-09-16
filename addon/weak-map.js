import Ember from 'ember';

var {
  assert,
  typeOf,
  meta
} = Ember;

var id      = 0;
var metaKey = '_weak';

function UNDEFINED() {}

function WeakMap() {
  this._id = `__ember${new Date().getTime()}${id++}`;
}

/*
 * @method get
 * @param key {Object}
 * @return {*} stored value
 */
WeakMap.prototype.get = function(obj) {
  var metaInfo          = meta(obj);
  var metaObject        = metaInfo[metaKey];

  if (metaInfo && metaObject) {
    if (metaObject[this._id] === UNDEFINED) {
      return undefined;
    }

    return metaObject[this._id];
  }
};

/*
 * @method set
 * @param key {Object}
 * @param value {Any}
 * @return {Any} stored value
 */
WeakMap.prototype.set = function(obj, value) {
  assert('Uncaught TypeError: Invalid value used as weak map key', typeOf(obj) === 'object');
  var metaInfo = meta(obj);

  if (value === undefined) {
    value = UNDEFINED;
  }

  if (!metaInfo[metaKey]) {
    metaInfo[metaKey] = {};
  }

  metaInfo[metaKey][this._id] = value;
  return this;
};

/*
 * @method has
 * @param key {Object}
 * @return {Boolean} if the key exists
 */
WeakMap.prototype.has = function(obj) {
  var metaInfo          = meta(obj);
  var metaObject        = metaInfo[metaKey];

  return (metaObject && metaObject[this._id] !== undefined);
};

/*
 * @method delete
 * @param key {Object}
 */
WeakMap.prototype.delete = function(obj) {
  var metaInfo = meta(obj);

  if (this.has(obj)) {
    delete metaInfo[metaKey][this._id];
  }

  return this;
};

export default WeakMap;
