
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rental-property-type', 'helper:rental-property-type', {
  integration: true
});

test('should render Standalone for not recognized type', function(assert) {
  this.set('propertyType', '1234');
  this.render(hbs`{{rental-property-type propertyType}}`);
  assert.equal(this.$().text().trim(), 'Standalone');
});

test('should render Community for Condo type', function(assert) {
  this.set('propertyType', 'Condo');
  this.render(hbs`{{rental-property-type propertyType}}`);
  assert.equal(this.$().text().trim(), 'Community');
});