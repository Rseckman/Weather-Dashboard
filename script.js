
var newTextAreaUl = $("<ul>")
newTextAreaUl.text("Search History")

function createElements(){
    
    var searchButton = $("#searchButton");
    var searchBar = $("#searchBar");

    searchButton.click(function(){
        var city = searchBar.val();
        addCity(city);

        renderForecast(city);
    })
};

function addCity(city){
    var ul = $("#newTextAreaUl");
    var cityButton = $("<button>");
    cityButton.addClass("btn btn-light list-group-item text-left")
    cityButton.text(city);
    ul.append(cityButton);
    
    cityButton.click(function(){
        renderForecast(city)
    })
};


function renderForecast(city){
    
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
        // console.log(weatherData)
        
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
            // console.log(UVdata)
            var UVindex = UVdata.value;
            $("#UVindex").html(`UV Index: <span id="UVindexData">` + UVindex + `</span>` );
            // $("#UVindexData").text(UVindex);
            
            if(UVindex > 7){
                $("#UVindexData").attr("id", "high");
            } else if( UVindex > 2){
                $("#UVindexData").attr("id", "medium");
            } else{
                $("#UVindexData").attr("id", "low");
            }
        })

        var queryURLfive = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=c099aac4c6ae67f88c397030b260f19a`
        
        $.ajax({
            url: queryURLfive,
            method: "GET"
        }).then(function(fiveData){
            console.log(fiveData)


            $("#dayOne").addClass("fiveDayBox");
            $("#dayTwo").addClass("fiveDayBox");
            $("#dayThree").addClass("fiveDayBox");
            $("#dayFour").addClass("fiveDayBox");
            $("#dayFive").addClass("fiveDayBox");

            $("#dateOne").text(dateOne);
            $("#dateTwo").text(dateTwo);
            $("#dateThree").text(dateThree);
            $("#dateFour").text(dateFour);
            $("#dateFive").text(dateFive);

            $("#fiveDayTitle").text("Five Day Forecast:");

            var weatherOne = fiveData.daily[0].weather[0].icon;
            $("#logoOne").attr("src", "http://openweathermap.org/img/wn/" + weatherOne + "@2x.png");
            var weatherTwo = fiveData.daily[1].weather[0].icon;
            $("#logoTwo").attr("src", "http://openweathermap.org/img/wn/" + weatherTwo + "@2x.png");
            var weatherThree = fiveData.daily[2].weather[0].icon;
            $("#logoThree").attr("src", "http://openweathermap.org/img/wn/" + weatherThree + "@2x.png");
            var weatherFour = fiveData.daily[3].weather[0].icon;
            $("#logoFour").attr("src", "http://openweathermap.org/img/wn/" + weatherFour + "@2x.png");
            var weatherFive = fiveData.daily[4].weather[0].icon;
            $("#logoFive").attr("src", "http://openweathermap.org/img/wn/" + weatherFive + "@2x.png");

            var tempOne = fiveData.daily[0].temp.day;
            var tempOneF = ((tempOne - 273.15) * 1.80 + 32).toFixed(2);
            $("#tempOne").text("Temperature: " + tempOneF + " °F");

            var tempTwo = fiveData.daily[1].temp.day;
            var tempTwoF = ((tempTwo - 273.15) * 1.80 + 32).toFixed(2);
            $("#tempTwo").text("Temperature: " + tempTwoF + " °F");

            var tempThree = fiveData.daily[2].temp.day;
            var tempThreeF = ((tempThree - 273.15) * 1.80 + 32).toFixed(2);
            $("#tempThree").text("Temperature: " + tempThreeF + " °F");

            var tempFour = fiveData.daily[3].temp.day;
            var tempFourF = ((tempFour - 273.15) * 1.80 + 32).toFixed(2);
            $("#tempFour").text("Temperature: " + tempFourF + " °F");

            var tempFive = fiveData.daily[4].temp.day;
            var tempFiveF = ((tempFive - 273.15) * 1.80 + 32).toFixed(2);
            $("#tempFive").text("Temperature: " + tempFiveF + " °F");

            var humidOne = fiveData.daily[0].humidity;
            $("#humidityOne").text("Humidity: " + humidOne + " %");

            var humidTwo = fiveData.daily[1].humidity;
            $("#humidityTwo").text("Humidity: " + humidTwo + " %");
            
            var humidThree = fiveData.daily[2].humidity;
            $("#humidityThree").text("Humidity: " + humidThree + " %");

            var humidFour = fiveData.daily[3].humidity;
            $("#humidityFour").text("Humidity: " + humidFour + " %");

            var humidFive = fiveData.daily[4].humidity;
            $("#humidityFive").text("Humidity: " + humidFive + " %");
        })
    })
}; 

createElements();