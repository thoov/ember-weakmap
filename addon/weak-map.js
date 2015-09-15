import Ember from 'ember';

var metaKey = '_weak';
var id      = 0;

function symbol() {
  return `__ember${new Date().getTime()}${id++}`;
}

function WeakMap() {
  this._id = symbol();
}

WeakMap.prototype.get = function(obj) {
  var metaInfo = Ember.meta(obj);

  if (metaInfo && metaInfo[metaKey]) {
    return metaInfo[metaKey][this._id];
  }
};

WeakMap.prototype.set = function(obj, value) {
  var metaInfo = Ember.meta(obj);

  if (!metaInfo[metaKey]) {
    metaInfo[metaKey] = {};
  }

  metaInfo[metaKey][this._id] = value;
  return this;
};

WeakMap.prototype.has = function(obj) {
  var metaInfo = Ember.meta(obj);

  if (!metaInfo[metaKey]) {
    return false;
  }

  return !!metaInfo[metaKey][this._id];
};

WeakMap.prototype.delete = function(obj) {
  var metaInfo = Ember.meta(obj);

  delete metaInfo[metaKey][this._id];

  return this;
};

export default WeakMap;
