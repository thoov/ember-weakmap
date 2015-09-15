import Ember from 'ember';

var id = 0;

function symbol() {
  return `${new Date().getTime()}_${id++}`;
}

function WeakMap() {
  this._id = symbol();
}

WeakMap.prototype.get = function(obj) {
  // var map = meta(obj).readableWeak();
  // if (map) {
  //   return map[this._id];
  // }
  var map = Ember.meta(obj);

  if (map) {
    return map[this._id];
  }
};

WeakMap.prototype.set = function(obj, value) {
  // meta(obj).writableWeak()[this._id] = value;
  // return this;
  Ember.meta(obj)[this._id] = value;
  return this;
};

export default WeakMap;
