$(document).ready(function() {
  // get user's current latitude and longitude coordinates
  $.getJSON("https://ipapi.co/json/", function(json){

    // assign user's current latitude and longitude coordinates to variables
    var currentLat = json.latitude,
        currentLon = json.longitude;

        // test to see if variables are working
        console.log(currentLat);
        console.log(currentLon);

    // print lat and lon in app
    $(".coords").html("lat: " + currentLat + ", lon:" + currentLon);


    // pull local weather from openweathermap.org JSON API using user's current coordinates
    var localWeather = $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+currentLat+"&lon="+currentLon+"&appid=feb658ff746b02de15d572298112ef26", function(local){

      var currentCity = local.name,
          currentF = local.main.temp * (9/5)-459.67,
          currentC = local.main.temp - 273.15,
          currentId = local.weather[0].id,
          currentW = local.weather[0].main,
          currentDesc = local.weather[0].description,
          currentIco = "http://openweathermap.org/img/w/"+local.weather[0].icon+".png",
          date = new Date(local.dt*1000);

      // testing
      console.log(currentCity);
      console.log(currentF.toFixed(0));
      console.log(currentC.toFixed(0));
      console.log(currentId);
      console.log(currentW);
      console.log(currentDesc);
      console.log(date);

      // print values in app
      $(".title").html(currentCity);
      $("#temp-num").html(currentF.toFixed(0));
      $(".weather-desc").html(currentDesc);

      $(".date").html(date);

      // backgrounds & icons
      if(currentId === 800){
        $("body").css("background", "url(images/sunny.jpg) no-repeat center center fixed");
        $(".icon").addClass("wi wi-day-sunny");
      }
      if(currentId >= 200 && currentId <= 232){
        $("body").css("background", "url(images/thunderstorm.jpg) no-repeat center center fixed");
        $(".icon").addClass("wi wi-thunderstorm");
      }
      if(currentId >= 300 && currentId <= 531){
        $("body").css("background", "url(images/heavyrain.jpg) no-repeat center center fixed");
        $(".icon").addClass("wi wi-rain");
      }
      if(currentId >= 600 && currentId <= 622){
        $("body").css("background", "url(images/snow.jpg) no-repeat center center fixed");
        $(".icon").addClass("wi wi-snow");
      }
      if(currentId >= 701 && currentId <= 741){
        $("body").css("background", "url(images/fog.jpg) no-repeat center center fixed");
        $(".icon").addClass("wi wi-fog");
      }
      if(currentId >= 801 && currentId <= 802){
        $("body").css("background", "url(images/scatteredclouds.jpg) no-repeat center center fixed");
        $(".icon").addClass("wi wi-day-cloudy");
      }
      if(currentId >= 803 && currentId <= 804){
        $("body").css("background", "url(images/cloudy.jpg) no-repeat center center fixed");
        $(".icon").addClass("wi wi-cloudy");
      }
      // $(".icon").html("<img src="+currentIco+">");
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
