var cities = [];
var newTextAreaUl = $("<ul>")
newTextAreaUl.addClass("list-group")
newTextAreaUl.text("Search History")

function createElements(){
    var searchAreaDiv = $("<div>")
    searchAreaDiv.addClass("container col-3 my-3 border-right ")

    var searchH4 = $("<h4>");
    searchH4.text("Search for a City:")

    var searchButton = $("<button>");
    searchButton.text("Search");
    searchButton.addClass("btn btn-primary mx-1")
    

    var searchBar = $('<input type = "text">');
    searchBar.attr("placeholder", "Search...");
    searchBar.addClass("mx-1")

    var displayDiv = $("<div>");
    displayDiv.addClass("container col-8")

    var displaySingle = $("<div>");
    displaySingle.addClass("container row my-4 border");
    displaySingle.text("TEST 1")

    var displayFive = $("<div>")
    displayFive.addClass("container row my-4 border");
    displayFive.text("TEST 2");
   
    searchAreaDiv.append(searchH4, searchBar, searchButton, newTextAreaUl)
    displayDiv.append(displaySingle, displayFive);
    $("#mainContainer").append(searchAreaDiv, displayDiv);

    searchButton.click(function(){
        cities = cities.concat(searchBar.val());
        console.log(cities)
        renderSearchHistory();
        renderForcast();
    })
};

function renderSearchHistory(){
    newTextAreaUl.empty();

    for(var i = 0; i < cities.length; i++) {
        var historyButton = $("<button>");
        historyButton.addClass("btn btn-light list-group-item text-left")
        historyButton.text(cities[i]);
        newTextAreaUl.append(historyButton);
    }
};


function renderForcast(){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d7fad8f3fcfdd6d82a97cb0fd11083f5"
    var city = cities.length - 1;
    console.log(city)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(weather){
        console.log(weather)
    })

};  


createElements();