import Ember from 'ember';

const google = window.google;

export default Ember.Object.extend({
  init() {
    this.set('geocoder', new google.maps.Geocoder());
  },

  createMap(element, location) {
    const map = new google.maps.Map(element, { scrollWheel: false, zoom: 10 });
    this.pinLocation(location, map);
    return map;
  },

  pinLocation(location, map) {
    this.get('geocoder').geocode({ address: location }, (result, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const geometry = result[0].geometry.location;
        const position = { lat: geometry.lat(), lng: geometry.lng() };
        map.setCenter(position);
        new google.maps.Marker({ position, map, title: location });
      }
    });
  }
});