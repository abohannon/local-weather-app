$(document).ready(function() {
  // get user's current latitude and longitude coordinates
  $.getJSON("http://ip-api.com/json", function(json){

    // assign user's current latitude and longitude coordinates to variables
    var currentLat = json.lat,
        currentLon = json.lon;

        // test to see if variables are working
        console.log(currentLat);
        console.log(currentLon);

    // print lat and lon in app
    $(".coords").html("lat: " + currentLat + ", lon:" + currentLon);

    // pull local weather from openweathermap.org JSON API using user's current coordinates
    var localWeather = $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+currentLat+"&lon="+currentLon+"&appid=feb658ff746b02de15d572298112ef26", function(local){

      var currentCity = local.name,
          currentF = local.main.temp * (9/5)-459.67,
          currentC = local.main.temp - 273.15,
          currentDesc = local.weather[0].description,
          currentIco = "http://openweathermap.org/img/w/"+local.weather[0].icon+".png",
          date = new Date(local.dt*1000);

      // testing
      console.log(currentCity);
      console.log(currentF.toFixed(0));
      console.log(currentC.toFixed(0));
      console.log(currentDesc);
      console.log(date);

      // print values in app
      $(".title").html(currentCity);
      $("#temp-num").html(currentF.toFixed(0));
      $(".weather-desc").html(currentDesc);
      $(".icon").html("<img src="+currentIco+">");
      $(".date").html(date);

      // Temp scale toggle
      $(".temp-scale-f").on("click", function(){
        $("#temp-num").html(currentC.toFixed(0)); // change to Celsius
        $(".temp-scale-f").addClass("hide"); // hide F
        $(".temp-scale-c").removeClass("hide"); // reveal C
      });

      $(".temp-scale-c").on("click", function(){
        $("#temp-num").html(currentF.toFixed(0)); // change to Fahrenheit
        $(".temp-scale-c").addClass("hide"); // hide C
        $(".temp-scale-f").removeClass("hide"); // reveal F
      });

    });

  });

});
