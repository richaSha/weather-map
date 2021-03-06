(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = exports.Map = function () {
  function Map() {
    _classCallCheck(this, Map);

    this.long = -98.35;
    this.lat = 39.5;
    this.zoom = 4;
    this.map;
    this.marker;
  }

  _createClass(Map, [{
    key: 'initMap',
    value: function initMap() {
      var _this = this;

      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: this.lat, lng: this.long },
        zoom: this.zoom
      });
      google.maps.event.addListener(this.map, 'click', function (event) {
        var lat = event.latLng.lat();
        var lon = event.latLng.lng();
        _this.clickCityWeather(event.latLng.lat(), event.latLng.lng());
      });
    }
  }, {
    key: 'clickCityWeather',
    value: function clickCityWeather(lat, lng) {
      var that = this;
      var request = new XMLHttpRequest();
      var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=6bae413a0dca3d1bf1c2de372588a226';
      request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          var response = JSON.parse(this.responseText);
          that.setWeatherInfo(response, true);
          that.zoom = 4;
        }
      };
      request.open("GET", url, true);
      request.send();
    }
  }, {
    key: 'setNewMap',
    value: function setNewMap(lat, long) {
      this.lat = lat;
      this.long = long;
      this.initMap();
      this.setMarker();
    }
  }, {
    key: 'setMarker',
    value: function setMarker() {
      this.marker = new google.maps.Marker({
        position: { lat: this.lat, lng: this.long },
        map: this.map
      });
      this.map.panTo({ lat: this.lat, lng: this.long });
    }
  }, {
    key: 'findWeather',
    value: function findWeather(city, zoom) {
      var that = this;
      var request = new XMLHttpRequest();
      var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=6bae413a0dca3d1bf1c2de372588a226';
      request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          var response = JSON.parse(this.responseText);
          if (zoom) {
            that.zoom = 12;
          }
          that.setWeatherInfo(response, zoom);
        }
      };
      request.open("GET", url, true);
      request.send();
    }
  }, {
    key: 'setWeatherInfo',
    value: function setWeatherInfo(response, zoom) {
      if (zoom) {
        this.setNewMap(response.coord.lat, response.coord.lon);
      }
      var contentString = '<div><h5>Name= ' + response.name + '</h5><h5>Country= ' + response.sys.country + '</h5><h5>humidity= ' + response.main.humidity + '</h5><h5>Temp= ' + response.main.temp + '</h5><h5>Min Temp= z' + response.main.temp_min + '</h5><h5>Max Temp= ' + response.main.temp_max + '</h5> <h5>Wind spd= ' + response.wind.speed + '</h5><div>';
      this.setCustomMarker(response.weather[0].icon, response.coord.lat, response.coord.lon, contentString);
    }
  }, {
    key: 'setCustomMarker',
    value: function setCustomMarker(icons, lat, lon, contentString) {
      var infowindow = null;
      var marker = new google.maps.Marker({
        position: { lat: lat, lng: lon },
        icon: 'http://openweathermap.org/img/w/' + icons + '.png',
        draggable: true,
        animation: google.maps.Animation.DROP,
        map: this.map
      });

      marker.addListener('click', function () {
        if (infowindow) {
          infowindow.close();
        }
        infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 200
        });
        infowindow.open(map, marker);
      });
    }
  }]);

  return Map;
}();

},{}],2:[function(require,module,exports){
"use strict";

var _map = require("./../js/map.js");

$(document).ready(function () {
  var mapObject = new _map.Map();
  var arrayOfCountry = ["Seattle", "New York", "Miami", "Boulder", "New Orleans", "San Francisco", "Pebble Beach, CA", "Vancuver", "Denver", "Las Vegas", "Portland", "Chicago", "Houston", "Boise", "Springfield", "Santa Fe", "Bismarck", "Great Falls", "Las Cruces"];

  var initCountryWeather = function initCountryWeather() {
    $.each(arrayOfCountry, function (index, city) {
      mapObject.findWeather(city, false);
    });
  };
  var showPosition = function showPosition(position) {
    mapObject.setNewMap(position.coords.latitude, position.coords.longitude);
  };

  mapObject.initMap();

  $(".currentLocation").click(function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("This is not allowed.");
    }
  });
  initCountryWeather();

  $('#search').click(function () {
    var city = $('.city').val();
    mapObject.findWeather(city, true);
  });

  $('.loctionbtn').click(function (e) {
    e.preventDefault();
    $(this).addClass("active");
    $('.current').removeClass("hide");
    $('.searchLocation').addClass("hide");
    $('.searchBtn').removeClass("active");
  });

  $('.searchBtn').click(function (e) {
    e.preventDefault();
    $(this).addClass("active");
    $('.current').addClass("hide");
    $('.searchLocation').removeClass("hide");
    $('.loctionbtn').removeClass("active");
  });
});

},{"./../js/map.js":1}]},{},[2]);
