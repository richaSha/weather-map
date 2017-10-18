export class Map {
  constructor() {
    this.long= -98.35;
    this.lat = 39.5;
    this.zoom = 4;
    this.map;
    this.marker;
  }
  initMap(){

    this.map = new google.maps.Map(document.getElementById('map'),{
      center: {lat: this.lat, lng: this.long},
      zoom : this.zoom
    });
  }
  setNewMap(lat, long){
    this.lat = lat;
    this.long = long;
    this.zoom = 12;
    this.initMap();
    this.setMarker();
  }
  setMarker(){
    this.marker = new google.maps.Marker({
      position: {lat: this.lat, lng: this.long},
      map: this.map
    })
    this.map.panTo({lat: this.lat, lng: this.long})
  }
  findWeather(city){
    let that =this;
    let request = new XMLHttpRequest();
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6bae413a0dca3d1bf1c2de372588a226`;
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        that.setWeatherInfo(response);
      }
    }
    request.open("GET", url, true);
    request.send();
  }
  setWeatherInfo(response){
    let humidity= response.main.humidity;
    let temp = response.main.temp;
    let highTemp = response.main.temp_max;
    let lowTemp = response.main.temp_min;
    let speed = response.wind.speed;
    let icon = response.weather[0].icon;
    let lat = response.coord.lat;
    let lon = response.coord.lon;
    let contentString = `<div><h5>humidity= ${response.main.humidity}</h5><h5>Temp= ${response.main.temp}</h5><h5>Min Temp= z${response.main.temp_min}</h5><h5>Max Temp= ${response.main.temp_max}</h5> <h5>Wind spd= ${response.wind.speed}</h5><div>`
    this.setCustomMarker(response.weather[0].icon, response.coord.lat, response.coord.lon, contentString)

  }
  setCustomMarker(icons, lat, lon, contentString){
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lon},
      icon: `http://openweathermap.org/img/w/${icons}.png`,
      draggable: true,
      animation: google.maps.Animation.DROP,
      map: this.map
    });

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
    });

    marker.addListener('click', function(){
      infowindow.open(map, marker);
    });
  }


}
