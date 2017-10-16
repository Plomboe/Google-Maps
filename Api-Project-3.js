//Location and Weather
var newCity;
var city;
var response;

//Google Maps
var map;
var infoWindow;

var cityPromise = $.get("http://ipinfo.io", function(response) {
  console.log(response.city, response.country);
  city = response.city; 
}, "jsonp");

$.when(cityPromise).done(function () {
  var key = "http://api.wunderground.com/api/61f0a55cb00602dc/conditions/q/Ontario/" + city + ".json";

  var weatherWidget = {
  weatherData: {},
  init: function(){
    $.ajax(key, {
      type: 'GET',
      dataType: 'jsonp',
      success: weatherWidget.parseData
    });
  },

  parseData: function(responseData){
    console.log(city);
    var tempData = responseData.current_observation;
    weatherWidget.weatherData.temp_c = tempData.temp_c;
    weatherWidget.weatherData.city = tempData.display_location.city;
    weatherWidget.weatherData.url = tempData.forecast_url;
    weatherWidget.weatherData.date = tempData.observation_time_rfc822;
    weatherWidget.weatherData.string = tempData.weather;
    weatherWidget.weatherData.image_url = tempData.icon_url;
    weatherWidget.weatherData.latitude = tempData.display_location.latitude;
    weatherWidget.weatherData.longitude = tempData.display_location.longitude;

    weatherWidget.updateDOM();
  },

  updateDOM: function(){
    $('.weather_image').attr('src', weatherWidget.weatherData.image_url);
    $('.weather_string').text(weatherWidget.weatherData.string);
    $('.temp_c').text(weatherWidget.weatherData.temp_c);
    $('.city_name').text(weatherWidget.weatherData.city);
    $('.date_time').text(weatherWidget.weatherData.date);
    $('a').attr('href', weatherWidget.weatherData.url);
    $(".latitude").text(weatherWidget.weatherData.latitude);
    $(".longitude").text(weatherWidget.weatherData.longitude);
  }

};
  $(document).ready(function(){
    weatherWidget.init();
  });

}).then(function (){
  forecastWidget = {
  forecastData: {},
  init: function(){
    $.ajax("http://api.wunderground.com/api/61f0a55cb00602dc/forecast10day/q/Ontario/" + city + ".json", {
      type: 'GET',
      dataType: 'jsonp',
      success: forecastWidget.parseInfo
    });
  },

  parseInfo: function (responseInfo){
    var tempInfo = responseInfo.current_observation;
    console.log(tempInfo);
  },

  //   parseData: function(responseData){
  //   console.log(city);
  //   var tempData = responseData.current_observation;
  //   weatherWidget.weatherData.temp_c = tempData.temp_c;
  //   weatherWidget.weatherData.city = tempData.display_location.city;
  //   weatherWidget.weatherData.url = tempData.forecast_url;
  //   weatherWidget.weatherData.date = tempData.observation_time_rfc822;
  //   weatherWidget.weatherData.string = tempData.weather;
  //   weatherWidget.weatherData.image_url = tempData.icon_url;
  //   weatherWidget.weatherData.latitude = tempData.display_location.latitude;
  //   weatherWidget.weatherData.longitude = tempData.display_location.longitude;

  //   weatherWidget.updateDOM();
  // },

  // updateDOM: function(){
  //   $('.weather_image').attr('src', weatherWidget.weatherData.image_url);
  //   $('.weather_string').text(weatherWidget.weatherData.string);
  //   $('.temp_c').text(weatherWidget.weatherData.temp_c);
  //   $('.city_name').text(weatherWidget.weatherData.city);
  //   $('.date_time').text(weatherWidget.weatherData.date);
  //   $('a').attr('href', weatherWidget.weatherData.url);
  //   $(".latitude").text(weatherWidget.weatherData.latitude);
  //   $(".longitude").text(weatherWidget.weatherData.longitude);
  // },
  
//   charts: charts = c3.generate({
// 	bindto: "#chart-one",
// 	data: {
// 		columns: [
// 			['Degress C', 30, 40, 25, 15, 37, 10, 1],
// 			],
// 	type: "bar", //pie, bar, donut, scatter, etc
// 	},
// 	axis: {
// 		x: {
// 			type: "category",
// 			categories: [
// 				"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
// 			],
// 		},
// 	},
// }),
}
});

var map;
var infoWindow;

navigator.geolocation.getCurrentPosition(function(currentPos) {
  console.log(currentPos.coords);
});

//running and posting the map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 43, lng: -79},
    zoom: 12,
  });
  infoWindow = new google.maps.InfoWindow;

  //if they allow you to track their location
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent("Your Location");
      infoWindow.open(map);
      map.setCenter(pos);
    });
  }
};



// $(".update").on("click", function () {
//   if (1===1){
//     $(".weather_widget").hide();
// };


// });





