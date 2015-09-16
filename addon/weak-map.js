import Ember from 'ember';

var {
  assert,
  typeOf,
  meta
} = Ember;

var metaKey = '_weak';
var id      = 0;

function UNDEFINED() {}

function symbol() {
  return `__ember${new Date().getTime()}${id++}`;
}

function WeakMap() {
  this._id = symbol();
}

WeakMap.prototype.get = function(obj) {
  var metaInfo          = meta(obj);
  var metaObject        = metaInfo[metaKey];

  if (metaInfo && metaObject) {
    if (metaObject[this._id] === UNDEFINED) {
      return undefined;
    }

    return metaInfo[metaKey][this._id];
  }
};

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

WeakMap.prototype.has = function(obj) {
  var metaInfo          = meta(obj);
  var metaObject        = metaInfo[metaKey];

  return (metaObject && metaObject[this._id] !== undefined);
};

WeakMap.prototype.delete = function(obj) {
  var metaInfo = meta(obj);

  if (this.has(obj)) {
    delete metaInfo[metaKey][this._id];
  }

  return this;
};

export default WeakMap;
