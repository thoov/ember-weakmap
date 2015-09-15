import Ember from 'ember';

var id = 0;

function symbol() {
  return `__ember${new Date().getTime()}_${id++}`;
}

function WeakMap() {
  this._id = symbol();
}

WeakMap.prototype.get = function(obj) {
  var metaInfo = Ember.meta(obj);

  if (metaInfo && metaInfo['_weak']) {
    return metaInfo['_weak'][this._id];
  }
};

WeakMap.prototype.set = function(obj, value) {
  var metaInfo = Ember.meta(obj);

  if (!metaInfo['_weak']) {
    metaInfo['_weak'] = {};
  }

  metaInfo['_weak'][this._id] = value;
  return this;
};

export default WeakMap;
