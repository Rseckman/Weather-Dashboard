
var newTextAreaUl = $("<ul>")
newTextAreaUl.text("Search History")

function createElements(){
    

    var searchButton = $("#searchButton");
    var searchBar = $("#searchBar");

    searchButton.click(function(){
        var city = searchBar.val();
        addCity(city);
        renderSingleDayForecast(city);
    })
};

function addCity(city){
    var ul = $("#newTextAreaUl");
    var cityButton = $("<button>");
    cityButton.addClass("btn btn-light list-group-item text-left")
    cityButton.text(city);
    ul.append(cityButton);
    
    cityButton.click(function(){
        renderSingleDayForecast(city)
        renderFiveDayForecast(city);
    })
};


// function getIconClass(weather) {
//     if (weather === 'cloudy') {
//         return 'icon-cloudy';
//     }
//     else if (weather === 'sunny') {
//         return 'icon-sunny';
//     }
//     else if (weather === "snowy") {
//         return "wi-night-sleet";
//     }
// }

function renderSingleDayForecast(city){
     
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c099aac4c6ae67f88c397030b260f19a`
    
    var currentDate = moment().format("MMM Do YYYY")
    var dateOne = moment().add(1, 'days').format('L');;
    var dateTwo = moment().add(2, 'days').format('L');
    var dateThree = moment().add(3, 'days').format('L');
    var dateFour = moment().add(4, 'days').format('L');
    var dateFive = moment().add(5, 'days').format('L');

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(weatherData){
        console.log(weatherData)
        
        var weatherIcon = weatherData.weather[0].icon;
        $("#cityName").text(weatherData.name)
        $("#date").text(currentDate);
        $("#logo").attr("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
        
        
        var temp = weatherData.main.temp;
        var tempF = (temp - 273.15) * 1.80 + 32
        tempFixed = tempF.toFixed(2);
        $("#temperature").text("Temperature: " + tempFixed + "°F");
        
        var humidity = weatherData.main.humidity;
        $("#humidity").text("Humidity: " + humidity +"%");

        var windSpeed = weatherData.wind.speed
        $("#wind").text("Wind Speed: " + windSpeed + "MPH");

        // var UVindex = weatherData.
        var lat = weatherData.coord.lat
        var lon = weatherData.coord.lon
        var queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?appid=c099aac4c6ae67f88c397030b260f19a&lat=${lat}&lon=${lon}`

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(UVdata){
            console.log(UVdata)
            var UVindex = UVdata.value;
            $("#UVindex").text("UV Index: " + UVindex);
        })

        var queryURLfive = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=c099aac4c6ae67f88c397030b260f19a`
        
        $.ajax({
            url: queryURLfive,
            method: "GET"
        }).then(function(fiveData){
            console.log(fiveData)

            $("#dateOne").text(dateOne);
            $("#dateTwo").text(dateTwo);
            $("#dateThree").text(dateThree);
            $("#dateFour").text(dateFour);
            $("#dateFive").text(dateFive);
        })
    })
}; 

function renderFiveDayForecast(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c099aac4c6ae67f88c397030b260f19a`

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(weatherData){
        console.log(weatherData)
        
    })
}


createElements();