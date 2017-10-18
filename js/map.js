export class Map {
  constructor() {
    this.long= -98.35;
    this.lat = 39.5;
  }
  initMap(){
    let map = new google.maps.Map(document.getElementById('map'),{
      center: {lat: this.lat, lng: this.long},
      zoom : 4
    });
  }
}
