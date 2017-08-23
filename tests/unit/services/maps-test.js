import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const DUMMY_MAP_ELEMENT = {}

const MapUtilStub = Ember.Object.extend({
  createMap(element, location) {
    this.assert.ok(element, 'createMap called with element');
    this.assert.ok(location, 'createMap called with location');
    return DUMMY_MAP_ELEMENT;
  }
});

moduleFor('service:maps', 'Unit | Service | maps');

test('should create a new map if one is not cached for location', function (assert) {
  assert.expect(4);
  const service = this.subject({ mapUtil: MapUtilStub.create({ assert }) });
  const map = service.getMapElement('New York');
  assert.ok(map, 'map exists');
  assert.equal(map.className, 'map', 'element has class name of map');
});

test('should use existing map if one is cached for location', function (assert) {
  assert.expect(1);
  const cachedMaps = Ember.Object.create({
    newYork: DUMMY_MAP_ELEMENT
  });
  const service = this.subject({ cachedMaps });
  const mapElement = service.getMapElement('New York');
  
  assert.equal(mapElement, DUMMY_MAP_ELEMENT, 'returned cached element');
});
