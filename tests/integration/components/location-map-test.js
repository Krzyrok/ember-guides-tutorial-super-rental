import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const MapsServiceStub = Ember.Service.extend({
  getMapElement(location) {
    this.set('calledWithLocation', location);
    return document.createElement('div');
  }
});

moduleForComponent('location-map', 'Integration | Component | location map', {
  integration: true,
  beforeEach() {
    this.register('service:maps', MapsServiceStub);
    this.inject.service('maps', { as: 'mapsService' });
  }
});

test('should append map element to container element', function(assert) {
  this.set('locationToDisplay', 'New York');
  this.render(hbs`{{location-map location=locationToDisplay}}`);

  assert.equal(this.$('.map-container').children().length, 1, 'the map element should be put onscreen');
  assert.equal(this.get('mapsService.calledWithLocation'), 'New York', 'a map of New York should be requested');
});
