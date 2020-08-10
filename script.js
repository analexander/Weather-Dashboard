function searchWeather(city) {



    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=2ad6f6ff3e813152c0dc8257bf34ef21";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
      console.log(response);



    var cityName = $("<h1>").text(response.name);
    var cityTemp = $("<h2>").text(response.main.temp);
    var cityHumid = $("<h2>").text(response.main.humidity);
    var cityWindSpeed = $("<h2>").text(response.wind.speed);

    $("#weather-output").empty();
    $("#weather-output").append(cityName, cityTemp, cityHumid, cityWindSpeed);

    });

}

function getLatLon(location){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=2ad6f6ff3e813152c0dc8257bf34ef21",
        method: "GET"
      }).then(function(data){
        console.log(data)

        //Use UVIndex function here while you still have access to data,
        //else it is erased for being out of scope
        getUVIndex(data.coord.lat, data.coord.lon)
    })

    
}

function getUVIndex(lat, lon){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=2ad6f6ff3e813152c0dc8257bf34ef21",
        method: "GET"
    }).then(function(data){
        console.log(data.value);
    });
}

$("#search-btn").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var cityNameInput = $("#search-input").val().trim();
    getLatLon(cityNameInput)
    searchWeather(cityNameInput)
});