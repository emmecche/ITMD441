window.addEventListener('DOMContentLoaded', function() {

    /* Tried using Google Maps Places API for autocomplete for locations, but my API Key was expired and 
    ** I couldn't find a reasonable alternative. I will just be doing error handling instead */

    input_line = this.document.getElementById("location-entry");
    enter_button = this.document.getElementById("enter");
    location_button = this.document.getElementById("location-button");
    
    forecast_icon     = this.document.getElementById("forecast-icon");
    forecast_dayhour  = this.document.getElementById("forecast-dayhour");
    forecast_comment  = this.document.getElementById("forecast-comment");
    forecast_precip   = this.document.getElementById("forecast-precip");
    forecast_humidity = this.document.getElementById("forecast-humidity");
    forecast_wind     = this.document.getElementById("forecast-wind");

    function pruneLocation(x) {
        x = x.replace(/ /g, '');
        return x.toLowerCase();
    }

    function connectWeatherInput() {
        loc = pruneLocation(input_line.value);
        fetch(`https://weatherdbi.herokuapp.com/data/weather/${loc}`)
            .then(res=>res.json())
            .then(function(jsonData){
                console.log(jsonData.currentConditions.dayhour)
            })
            .catch();
    }

    function connectWeatherButton(lat, long) {
        fetch(`https://weatherdbi.herokuapp.com/data/weather/${lat},${long}`)
            .then(res=>res.json())
            .then(function(jsonData){
                forecast_icon.src = jsonData.currentConditions.iconURL; 
                forecast_dayhour.value  = jsonData.currentConditions.dayhour;
                forecast_comment.value  = jsonData.currentConditions.comment;
                forecast_precip.value   = jsonData.currentConditions.precip;
                forecast_humidity.value = jsonData.currentConditions.humidity;
                forecast_wind.value     = jsonData.currentConditions.wind.mile + " mph";
            })
            .catch();
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

    location_button.addEventListener("click", getLocation, false);
    enter_button.addEventListener("click", connectWeatherInput, false);

}); // End DOMContentLoaded
