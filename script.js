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
    var cityUVI = $("<h2>").text(response.uvi);

    $("#weather-output").empty();
    $("#weather-output").append(cityName, cityTemp, cityHumid, cityWindSpeed, cityUVI);

    });

}

$("#search-btn").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var cityNameInput = $("#search-input").val().trim();
    searchWeather(cityNameInput)
});