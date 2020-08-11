// displays current day
var nowMoment = moment();
var displayMoment = document.getElementById('city-name-date');
displayMoment.innerHTML = nowMoment.format('L');

// day 1 
var day1Moment = nowMoment.add(1, 'day').format('L');
console.log(day1Moment);

var displayDay1 = $("<p>").text(day1Moment);
$(".day-1").append(displayDay1)

// day 2
var day2Moment = nowMoment.add(1, 'day').format('L');
console.log(day2Moment);

var displayDay2 = $("<p>").text(day2Moment);
$(".day-2").append(displayDay2)

// day 3
var day3Moment = nowMoment.add(1, 'day').format('L');
console.log(day3Moment);

var displayDay3 = $("<p>").text(day3Moment);
$(".day-3").append(displayDay3)

// day 4
var day4Moment = nowMoment.add(1, 'day').format('L');
console.log(day4Moment);

var displayDay4 = $("<p>").text(day4Moment);
$(".day-4").append(displayDay4)

// day 5
var day5Moment = nowMoment.add(1, 'day').format('L');
console.log(day5Moment);

var displayDay5 = $("<p>").text(day5Moment);
$(".day-5").append(displayDay5)

function searchWeather(city) {



    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=2ad6f6ff3e813152c0dc8257bf34ef21";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
      console.log(response);

    var cityName = $("<h1>").text(response.name);
    var cityIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+ response.weather[0].icon +".png");
    var cityTemp = $("<h2>").text("Temperature: " + response.main.temp + " ℉")
    var cityHumid = $("<h2>").text("Humidity: " + response.main.humidity + " %");
    var cityWindSpeed = $("<h2>").text("Wind Speed: " + response.wind.speed + " MPH");

    $("#weather-output").empty();
    $("#weather-output").append(cityIcon, cityTemp, cityHumid, cityWindSpeed);
    $("#city-name-date").append(cityName)

    });

}

function fiveDayForecast(city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=2ad6f6ff3e813152c0dc8257bf34ef21";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
      console.log(response);


      var day1Temp = $("<p>").text("Temperature: " + response.list[5].main.temp + " ℉");
      var day1Humid = $("<p>").text("Humidity: " + response.list[5].main.humidity + " %");
      var iconImg1 = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+ response.list[5].weather[0].icon +".png");

      var day2Temp = $("<p>").text("Temperature: " + response.list[13].main.temp + " ℉");
      var day2Humid = $("<p>").text("Humidity: " + response.list[13].main.humidity + " %");
      var iconImg2 = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+ response.list[13].weather[0].icon +".png");

      var day3Temp = $("<p>").text("Temperature: " + response.list[21].main.temp + " ℉");
      var day3Humid = $("<p>").text("Humidity: " + response.list[21].main.humidity + " %");
      var iconImg3 = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+ response.list[13].weather[0].icon +".png");

      var day4Temp = $("<p>").text("Temperature: " + response.list[29].main.temp + " ℉");
      var day4Humid = $("<p>").text("Humidity: " + response.list[29].main.humidity + " %");
      var iconImg4 = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+ response.list[13].weather[0].icon +".png");

      var day5Temp = $("<p>").text("Temperature: " + response.list[37].main.temp + " ℉");
      var day5Humid = $("<p>").text("Humidity: " + response.list[37].main.humidity + " %");
      var iconImg5 = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+ response.list[13].weather[0].icon +".png");


    $(".day-1").append(day1Temp, iconImg1, day1Humid);
    $(".day-2").append(day2Temp, iconImg2, day2Humid);
    $(".day-3").append(day3Temp, iconImg3, day3Humid);
    $(".day-4").append(day4Temp, iconImg4, day4Humid);
    $(".day-5").append(day5Temp, iconImg5, day5Humid);

});

}

function getLatLon(location) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=2ad6f6ff3e813152c0dc8257bf34ef21",
        method: "GET"
      }).then(function(data){
        console.log(data)

        //Use UVIndex function here while you still have access to data,
        //else it is erased for being out of scope
        getUVIndex(data.coord.lat, data.coord.lon)
    });

    
}

function getUVIndex(lat, lon){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=2ad6f6ff3e813152c0dc8257bf34ef21",
        method: "GET"
    }).then(function(data){
        console.log(data.value);
        
        var uvIndex = $("<h2>").text("UV Index: " + data.value);

        $("#weather-output").append(uvIndex);
    });
}

// function setLocalStorage() {
// // Get city search input
// var searchInput = $("#search-input").val();
// if (searchInput) {
//     // Load the city from storage
//     searchInput.innerHTML = localStorage.getItem(searchInput);
// }
// };


// search button click event

$("#search-btn").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var searchInput = $("#search-input").val().trim();
    // var city = "city";
    if (searchInput) {
        // Load the city from storage
        searchInput.innerHTML = localStorage.getItem(searchInput);
    }
    localStorage.setItem("city", searchInput);
    getLatLon(searchInput)
    searchWeather(searchInput)
    fiveDayForecast(searchInput)
});