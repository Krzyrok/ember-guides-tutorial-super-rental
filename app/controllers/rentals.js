import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    filterByCity(filterValue) {
      if (filterValue) {
        return this.get('store')
          .query('rental', { city: filterValue })
          .then(results => ({ query: filterValue, results: results }));
      } else {
        return this.get('store')
          .findAll('rental')
          .then(results => ({ query: filterValue, results: results }));
      }
    }
  }
});
