import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['list-filter'],
  value: '',

  init() {
    this._super(...arguments);
    this.get('filter')('').then(filterResponse => this.set('results', filterResponse.results));
  },

  actions: {
    handleFilterEntry() {
      let filterInputValue = this.get('value');
      let filterAction = this.get('filter');
      filterAction(filterInputValue).then(filterResponse => {
        if (filterResponse.query === this.get('value')) {
          this.set('results', filterResponse.results);
        }
      });
    }
  }
});
