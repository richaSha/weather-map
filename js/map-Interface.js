import {Map} from "./../js/map.js";

$(document).ready(function() {
  let mapObject = new Map();
  let arrayOfCountry =["Seattle", "New York", "Miami", "Boulder", "New Orleans", "San Francisco", "Pebble Beach, CA", "Vancuver", "Denver", "Las Vegas", "Portland", "Chicago", "Houston", "Boise", "Springfield", "Santa Fe", "Bismarck", "Great Falls", "Las Cruces"];

  let initCountryWeather = ()=>{
    $.each(arrayOfCountry,(index,city)=>{
      mapObject.findWeather(city, false)
    })
  }
  let showPosition = (position)=>{
    mapObject.setNewMap(position.coords.latitude, position.coords.longitude)
  }

  mapObject.initMap();

  $(".currentLocation").click(function(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }else {
      alert("This is not allowed.")
    }
  })
  initCountryWeather()

  $('#search').click(function() {
    let city = $('.city').val();
    mapObject.findWeather(city, true);
  })

  $('.loctionbtn').click(function(e){
    e.preventDefault();
    $(this).addClass("active");
    $('.current').removeClass("hide");
    $('.searchLocation').addClass("hide");
    $('.searchBtn').removeClass("active");
  })

  $('.searchBtn').click(function(e){
    e.preventDefault();
    $(this).addClass("active");
    $('.current').addClass("hide");
    $('.searchLocation').removeClass("hide");
    $('.loctionbtn').removeClass("active");
  })
});
