import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';
import RSVP from 'rsvp';

moduleForComponent('list-filter', 'Integration | Component | list filter', {
  integration: true
});

const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seattle'}];
const FILTERED_ITEMS = [{city: 'Seattle'}];
const listFilterTemplate = hbs`
  {{#list-filter filter=(action 'filterByCity') as |results|}}
    {{#each results as |item|}}
      <div class="city">{{item.city}}</div>
    {{/each}}
  {{/list-filter}}
`;


test('should initially load all listings', function(assert) {
  this.on('filterByCity', () => RSVP.resolve({ results: ITEMS }));
  this.render(listFilterTemplate);

  return wait().then(() => {
    assert.equal(this.$('.city').length, 3);
    assert.equal(this.$('.city').first().text().trim(), 'San Francisco');
  });
});

test('should update with matching listings', function(assert) {
  this.on('filterByCity', (filterValue) => {
    return RSVP.resolve({
      query: filterValue,
      results: filterValue ? FILTERED_ITEMS : ITEMS
    });
  });

  this.render(listFilterTemplate);

  this.$('.list-filter input').val('Sea').keyup();

  return wait().then(() => {
    assert.equal(this.$('.city').length, 1);
    assert.equal(this.$('.city').first().text().trim(), 'Seattle');
  });
});
