// GIPPHY API KEY: 5H94PgMQxCIRZsyDmM1iOJzMsHdIhm8S

// GIF URL: https://api.giphy.com/v1/gifs/search

// EXAMPLE: https://api.giphy.com/v1/gifs/search?api_key=5H94PgMQxCIRZsyDmM1iOJzMsHdIhm8S&q=spaceship&limit=25&offset=0&rating=R&lang=en

// GIPHY Parameters: q, limit, rating

// Create all variables
var celebrities = [
    "Frank Ocean", 
    "Kanye West", 
    "The Weeknd", 
    "Post Malone"
];

var gifQueryStr = "";
var gifQueryRating = "";
var gifQueryLimit;
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=5H94PgMQxCIRZsyDmM1iOJzMsHdIhm8S&q=" + gifQueryStr + "&limit=" + gifQueryLimit + "&rating=" + gifQueryRating; 

var gifResponse;

// Create a function that will render all the buttons listed in the topics array
function renderButtons() {
    // Delete child nodes as to not repeat celebrity names
    $("#buttons-display").empty();

    // Loop through celebs array to dynamically create a button for each one
    for (var i = 0; i < celebrities.length; i++) {
        var newCelebButton = $("<button>");

        // add a class of "celeb" to that new button
        newCelebButton.addClass("celeb");

        // add a data-attribute with the value of the celeb at index i
        newCelebButton.attr("celeb_num_" + celebrities[i]);

        // add text to the new button with the value of the celeb at index i
        newCelebButton.text(celebrities[i]);

        // add the newly created button to the HTML DOM
        $("#buttons-display").append(newCelebButton);
    }
};


// On search button click, run AJAX command to retrieve and API response
$("#add-celeb-button").on("click", function(event) {
    // Prevent the form from submitting itself
    event.preventDefault();

    // Create a variable called apiResponse 
    var apiResponse;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });

    // add each search term to the topics 
});


// Save API response as a variable

// Display the rating of each GIF under the respective GIF
