import { module, test } from 'qunit';
import WeakMap from 'ember-weakmap/weak-map';

module('Ember.WeakMap');

test('has weakMap like qualities', function(assert) {
  var map = new WeakMap();
  var map2 = new WeakMap();

  var a = {};
  var b = {};
  var c = {};

  assert.equal(map.get(a), undefined);
  assert.equal(map.get(b), undefined);
  assert.equal(map.get(c), undefined);

  assert.equal(map2.get(a), undefined);
  assert.equal(map2.get(b), undefined);
  assert.equal(map2.get(c), undefined);

  assert.equal(map.set(a,  1), map, 'map.set should return itself');
  assert.equal(map.get(a), 1);
  assert.equal(map.set(b,  undefined), map);
  assert.equal(map.set(a, 2), map);
  assert.equal(map.get(a), 2);
  assert.equal(map.set(b,  undefined), map);

  assert.equal(map2.get(a), undefined);
  assert.equal(map2.get(b), undefined);
  assert.equal(map2.get(c), undefined);

  assert.equal(map.set(c, 1), map);
  assert.equal(map.get(c), 1);
  assert.equal(map.get(a), 2);
  assert.equal(map.get(b), undefined);

  assert.equal(map2.set(a, 3), map2);
  assert.equal(map2.set(b, 4), map2);
  assert.equal(map2.set(c, 5), map2);

  assert.equal(map2.get(a), 3);
  assert.equal(map2.get(b), 4);
  assert.equal(map2.get(c), 5);

  assert.equal(map.get(c), 1);
  assert.equal(map.get(a), 2);
  assert.equal(map.get(b), undefined);
});

test('that error is thrown when using a non object key', function(assert) {
  var map = new WeakMap();

  assert.throws(function() {
    map.set('a', 1);
  }, new TypeError('Invalid value used as weak map key'));
});

test('that .has and .delete work as expected', function(assert) {
  var map = new WeakMap();
  var a = {};
  var b = {};
  var foo = { id: 1, name: 'My file', progress: 0 };

  assert.deepEqual(map.set(a, foo), map);
  assert.deepEqual(map.get(a), foo);
  assert.ok(map.has(a));
  assert.ok(!map.has(b));

  assert.ok(map.delete(a));
  assert.ok(!map.delete(a));

  assert.ok(!map.has(a));

  map.set(a, undefined);
  assert.ok(map.has(a));
});
