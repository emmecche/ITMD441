window.addEventListener('DOMContentLoaded', function() {

    /* Tried using Google Maps Places API for autocomplete for locations, but my API Key was expired and 
    ** I couldn't find a reasonable alternative. I will just be doing error handling instead */

    input_line = this.document.getElementById("location-entry");
    enter_button = this.document.getElementById("enter");
    location_button = this.document.getElementById("location-button");

    current_forecast = this.document.getElementById("current-day");
    next_forecast    = this.document.getElementById("next-7days");
    
    forecast_region   = this.document.getElementById("forecast-region");
    forecast_icon     = this.document.getElementById("forecast-icon");
    forecast_temp     = this.document.getElementById("forecast-temp");
    forecast_dayhour  = this.document.getElementById("forecast-dayhour");
    forecast_comment  = this.document.getElementById("forecast-comment");
    forecast_precip   = this.document.getElementById("forecast-precip");
    forecast_humidity = this.document.getElementById("forecast-humidity");
    forecast_wind     = this.document.getElementById("forecast-wind");

    next_7days = this.document.getElementsByClassName("mini-forecast");

    function pruneLocation(inp) {
        inp = inp.replace(/ /g, '');
        return inp.toLowerCase();
    }

    function connectWeatherInput() {
        loc = pruneLocation(input_line.value);
        fetch(`https://weatherdbi.herokuapp.com/data/weather/${loc}`)
            .then(res=>res.json())
            .then(function(jsonData) {
                displayWeather(jsonData)
            })
            .catch(function() {
                alert("Invalid Location");
                input_line.value = "";
                resetWeather();
            });
    }

    function connectWeatherButton(lat, long) {
        fetch(`https://weatherdbi.herokuapp.com/data/weather/${lat},${long}`)
        .then(res=>res.json())
        .then(function(jsonData) {
                displayWeather(jsonData)
            })
            .catch();
    }

    function displayWeather(jsonData) {
        showHidden();

        enter_button.innerHTML = "Update";

        forecast_region.innerHTML = jsonData.region;

        forecast_icon.src = jsonData.currentConditions.iconURL;
        forecast_temp.innerHTML     = jsonData.currentConditions.temp.f + "° Fahrenheit";
        forecast_dayhour.innerHTML  = jsonData.currentConditions.dayhour;
        forecast_comment.innerHTML  = jsonData.currentConditions.comment;
        forecast_precip.innerHTML   = jsonData.currentConditions.precip;
        forecast_humidity.innerHTML = jsonData.currentConditions.humidity;
        forecast_wind.innerHTML     = jsonData.currentConditions.wind.mile + " mph";

        next_days_arr = jsonData.next_days;
        for (var i=0; i<next_7days.length; i++) {
            mini_day = next_7days[i].getElementsByClassName("mini-day")[0];
            mini_day.innerHTML = next_days_arr[i+1].day;
            mini_icon = next_7days[i].getElementsByClassName("mini-icon")[0];
            mini_icon.src = next_days_arr[i+1].iconURL;
            mini_max = next_7days[i].getElementsByClassName("max&min")[0].getElementsByClassName("mini-max")[0];
            mini_max.innerHTML = next_days_arr[i+1].max_temp.f + "° Fahrenheit";
            mini_min = next_7days[i].getElementsByClassName("max&min")[0].getElementsByClassName("mini-min")[0];
            mini_min.innerHTML = next_days_arr[i+1].min_temp.f + "° Fahrenheit";
            mini_comment = next_7days[i].getElementsByClassName("mini-comment")[0];
            mini_comment.innerHTML = next_days_arr[i+1].comment;
        }
    }

    function resetWeather() {
        hide();

        enter_button.innerHTML = "Enter";

        forecast_region.innerHTML = "";

        forecast_icon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
        forecast_temp.innerHTML     = "";
        forecast_dayhour.innerHTML  = "";
        forecast_comment.innerHTML  = "";
        forecast_precip.innerHTML   = "";
        forecast_humidity.innerHTML = "";
        forecast_wind.innerHTML     = "";

        for (var i=0; i<next_7days.length; i++) {
            mini_day = next_7days[i].getElementsByClassName("mini-day")[0];
            mini_day.innerHTML = "";
            mini_icon = next_7days[i].getElementsByClassName("mini-icon")[0];
            mini_icon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
            mini_max = next_7days[i].getElementsByClassName("max&min")[0].getElementsByClassName("mini-max")[0];
            mini_max.innerHTML = "";
            mini_min = next_7days[i].getElementsByClassName("max&min")[0].getElementsByClassName("mini-min")[0];
            mini_min.innerHTML = "";
            mini_comment = next_7days[i].getElementsByClassName("mini-comment")[0];
            mini_comment.innerHTML = "";
        }
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude +
        "\nLongitute: " + position.coords.longitude);

        connectWeatherButton(position.coords.latitude, position.coords.longitude);
    }

    function showHidden() {
        current_forecast.style.display = "block";
        next_forecast.style.display = "block";
    }

    function hide() {
        current_forecast.style.display = "none";
        next_forecast.style.display = "none";
    }

    location_button.addEventListener("click", getLocation, false);
    enter_button.addEventListener("click", connectWeatherInput, false);

}); // End DOMContentLoaded
