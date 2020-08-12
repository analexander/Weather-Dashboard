// hides 5-day-forecast div
$(document).ready(function () {
    $("#five-day-forecast").hide();
  });

  // displays current day
  var nowMoment = moment();
  var displayMoment = document.getElementById('current-day');
  displayMoment.innerHTML = nowMoment.format('L');
  // day 1 
  var day1Moment = nowMoment.add(1, 'day').format('L');
  var displayDay1 = $("<p>").text(day1Moment);
  $(".day-1").append(displayDay1)
  // day 2
  var day2Moment = nowMoment.add(1, 'day').format('L');
  var displayDay2 = $("<p>").text(day2Moment);
  $(".day-2").append(displayDay2)
  // day 3
  var day3Moment = nowMoment.add(1, 'day').format('L');
  var displayDay3 = $("<p>").text(day3Moment);
  $(".day-3").append(displayDay3)
  // day 4
  var day4Moment = nowMoment.add(1, 'day').format('L');
  var displayDay4 = $("<p>").text(day4Moment);
  $(".day-4").append(displayDay4)
  // day 5
  var day5Moment = nowMoment.add(1, 'day').format('L');
  var displayDay5 = $("<p>").text(day5Moment);
  $(".day-5").append(displayDay5)

  function GetWeatherData(zipcode) {
    // localStorage.setItem(zipcode, null);
    var WeatherData = JSON.parse(localStorage.getItem(zipcode));
    console.log('---------------------WeatherDataOBJ-------------------');
    console.log(WeatherData);
    console.log('---------------------ENDWeatherDataOBJ---------------------');
    //console.log(WeatherData);
    // check for data in local storage
    // if not in local storage... get data from API and add it
    if (WeatherData === null || WeatherData === undefined) {
      WeatherData = {
        City: "",
        Lat: 0,
        Long: 0,
        UVIndex: [],
        WindSpeed: [],
        Temp: [],
        Humidity: [],
        Icon: []
      };
      console.log("Local Data not found. Getting from API.");
      // get City, Lat, Lon from API
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + zipcode + "&units=imperial&appid=2ad6f6ff3e813152c0dc8257bf34ef21",
        method: "GET",
        error: function() {
            OnInvalidAPIInput(zipcode);
        },
      }).then(function (response) {
        WeatherData.City = response.name;
        WeatherData.Lat = response.coord.lat;
        WeatherData.Long = response.coord.lon;
        // get daily and forcast from API
        $.ajax({
          url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&units=imperial&exclude=minutely,hourly&appid=2ad6f6ff3e813152c0dc8257bf34ef21",
          method: "GET"
        }).then(function (data) {
          //today
          WeatherData.Temp[0] = data.current.temp;
          WeatherData.Humidity[0] = data.current.humidity;
          WeatherData.WindSpeed[0] = data.current.wind_speed;
          WeatherData.UVIndex[0] = data.current.uvi;
          WeatherData.Icon[0] = data.current.weather[0].icon;
          //forecast
          WeatherData.Temp[1] = data.daily[0].temp.day;
          WeatherData.Humidity[1] = data.daily[0].humidity;
          WeatherData.WindSpeed[1] = data.daily[0].wind_speed;
          WeatherData.UVIndex[1] = data.daily[0].uvi;
          WeatherData.Icon[1] = data.daily[0].weather[0].icon;
          WeatherData.Temp[2] = data.daily[1].temp.day;
          WeatherData.Humidity[2] = data.daily[1].humidity;
          WeatherData.WindSpeed[2] = data.daily[1].wind_speed;
          WeatherData.UVIndex[2] = data.daily[1].uvi;
          WeatherData.Icon[2] = data.daily[1].weather[0].icon;
          WeatherData.Temp[3] = data.daily[2].temp.day;
          WeatherData.Humidity[3] = data.daily[2].humidity;
          WeatherData.WindSpeed[3] = data.daily[2].wind_speed;
          WeatherData.UVIndex[3] = data.daily[2].uvi;
          WeatherData.Icon[3] = data.daily[2].weather[0].icon;
          WeatherData.Temp[4] = data.daily[3].temp.day;
          WeatherData.Humidity[4] = data.daily[3].humidity;
          WeatherData.WindSpeed[4] = data.daily[3].wind_speed;
          WeatherData.UVIndex[4] = data.daily[3].uvi;
          WeatherData.Icon[4] = data.daily[3].weather[0].icon;
          WeatherData.Temp[5] = data.daily[4].temp.day;
          WeatherData.Humidity[5] = data.daily[4].humidity;
          WeatherData.WindSpeed[5] = data.daily[4].wind_speed;
          WeatherData.UVIndex[5] = data.daily[4].uvi;
          WeatherData.Icon[5] = data.daily[4].weather[0].icon;
  
          // add to local storage
          localStorage.setItem(zipcode, JSON.stringify(WeatherData));
  
          var tempBtn = document.createElement('button');
          tempBtn.innerHTML = zipcode;
          tempBtn.setAttribute("onclick", "UpdateWeather(GetWeatherData("+zipcode+"))");
          tempBtn.classList.add("btn", "btn-block", "btn-light");
          document.getElementById("search-output").appendChild(tempBtn);
          
          UpdateWeather(WeatherData);
        });
      });
    }
    else {
      console.log("Local Data found!")
      UpdateWeather(WeatherData);
    }
  }
  
  
  function OnInvalidAPIInput(data)
  {
    console.log("API call returned an error. (" + data + ")");
    $("#weather-output").empty();
    $(".day-1").empty();
    $(".day-2").empty();
    $(".day-3").empty();
    $(".day-4").empty();
    $(".day-5").empty();
    document.getElementById("five-day-forecast").style.display = "none";
    document.getElementById("current-day").style.display = "none";
    return;
  }
  
  
  function UpdateWeather(WeatherData) {
  
    // if no search, or invalid... Hide weather divs and return early.
    if(WeatherData === null || WeatherData.City === "")
    {
      $("#weather-output").empty();
      $(".day-1").empty();
      $(".day-2").empty();
      $(".day-3").empty();
      $(".day-4").empty();
      $(".day-5").empty();
      document.getElementById("five-day-forecast").style.display = "none";
      document.getElementById("current-day").style.display = "none";
      return;
    }
  
    // show weather divs
    document.getElementById("five-day-forecast").style.display = "block";
    document.getElementById("current-day").style.display = "block";
  
    // clear old data?
    $("#weather-output").empty();
    $(".day-1").empty();
    $(".day-2").empty();
    $(".day-3").empty();
    $(".day-4").empty();
    $(".day-5").empty();
    // Update UV Index
    var uvIndex = $("<h2>").text("UV Index: " + WeatherData.UVIndex[0]);
    $("#weather-output").append(uvIndex);
    // Update Weather
    var cityName = $("<h1>").text(WeatherData.City);
    var cityIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + WeatherData.Icon[0] + ".png");
    var cityTemp = $("<h2>").text("Temperature: " + WeatherData.Temp[0] + " ℉");
    var cityHumid = $("<h2>").text("Humidity: " + WeatherData.Humidity[0] + " %");
    var cityWindSpeed = $("<h2>").text("Wind Speed: " + WeatherData.WindSpeed[0] + " MPH");
    $("#weather-output").append(cityName, cityIcon, cityTemp, cityHumid, cityWindSpeed);
    // Update forecast
    var day1Temp = $("<p>").text("Temperature: " + WeatherData.Temp[1] + " ℉");
    var day1Humid = $("<p>").text("Humidity: " + WeatherData.Humidity[1] + " %");
    var iconImg1 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + WeatherData.Icon[1] + ".png");
    var day2Temp = $("<p>").text("Temperature: " + WeatherData.Temp[2] + " ℉");
    var day2Humid = $("<p>").text("Humidity: " + WeatherData.Humidity[2] + " %");
    var iconImg2 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + WeatherData.Icon[2] + ".png");
    var day3Temp = $("<p>").text("Temperature: " + WeatherData.Temp[3] + " ℉");
    var day3Humid = $("<p>").text("Humidity: " + WeatherData.Humidity[3] + " %");
    var iconImg3 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + WeatherData.Icon[3] + ".png");
    var day4Temp = $("<p>").text("Temperature: " + WeatherData.Temp[4] + " ℉");
    var day4Humid = $("<p>").text("Humidity: " + WeatherData.Humidity[4] + " %");
    var iconImg4 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + WeatherData.Icon[4] + ".png");
    var day5Temp = $("<p>").text("Temperature: " + WeatherData.Temp[5] + " ℉");
    var day5Humid = $("<p>").text("Humidity: " + WeatherData.Humidity[5] + " %");
    var iconImg5 = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + WeatherData.Icon[5] + ".png");
    $(".day-1").append(day1Temp, iconImg1, day1Humid);
    $(".day-2").append(day2Temp, iconImg2, day2Humid);
    $(".day-3").append(day3Temp, iconImg3, day3Humid);
    $(".day-4").append(day4Temp, iconImg4, day4Humid);
    $(".day-5").append(day5Temp, iconImg5, day5Humid);
  }
  
  
  
  // search button click event
  $("#search-btn").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var searchInput = $("#search-input").val().trim();
    
    if(searchInput === ""){
        UpdateWeather(null);
    }
    else{
    GetWeatherData(searchInput);
    }
  });