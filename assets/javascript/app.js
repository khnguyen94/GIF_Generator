// GIPPHY API KEY: 5H94PgMQxCIRZsyDmM1iOJzMsHdIhm8S

// GIF URL: https://api.giphy.com/v1/gifs/search

// EXAMPLE: https://api.giphy.com/v1/gifs/search?api_key=5H94PgMQxCIRZsyDmM1iOJzMsHdIhm8S&q=spaceship&limit=25&offset=0&rating=R&lang=en

// GIPHY Parameters: q, limit, rating

// Create all variables
var celebrities = ["Frank Ocean", "Kanye West", "The Weeknd", "Post Malone"];

// Get a handle on the API Response
var gifResponse;

// Create a function that will render all the buttons listed in the topics array
function renderButtons() {
  // Delete child nodes as to not repeat celebrity names
  $("#buttons-display").empty();

  // Loop through celebs array to dynamically create a button for each one
  for (var i = 0; i < celebrities.length; i++) {
    var newCelebButton = $("<button>");

    // add a class of "celeb" to that new button
    newCelebButton.addClass("button");

    // add a data-attribute with the value of the celeb at index i
    newCelebButton.attr("data-celeb", celebrities[i]);

    // add text to the new button with the value of the celeb at index i
    newCelebButton.text(celebrities[i]);

    // add the newly created button to the HTML DOM
    $("#buttons-display").append(newCelebButton);
    console.log("celeb appended");
  }

    // Create an event listener for whenever the celeb name buttons are clicked
    $(".button").on("click", function() {
        event.preventDefault();
      
        // Clear the display 
        $("#gif-display").empty();
      
        var celeb = $(this).attr("data-celeb");

        // rendergifts(celeb)
      
        console.log(celeb);
      
        var gifQueryStr = "";
        var gifQueryRating = "";
        var gifQueryLimit;
        var queryURL =
          "https://api.giphy.com/v1/gifs/search?api_key=5H94PgMQxCIRZsyDmM1iOJzMsHdIhm8S&q=" +
          celeb +
          "&limit=" +
          gifQueryLimit +
          "&rating=" +
          gifQueryRating;
      
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response.data);
          var res = response.data;
      
          for (i = 0; i < res.length; i++) {
            var newGIF = $("<img>");
      
            newGIF.addClass("gif-image");
            // need image, which image in the images object?
            newGIF.attr("src", res[i].images.downsized_still.url);
      
            // create attribute for new gif that is attached to the moving GIF
            newGIF.attr("src-alt", res[i].images.downsized.url);
      
            $("#gif-display").append(newGIF);
            // create css to format
          }
      
          // Create an on click for still/moving GIF switch
          $(".gif-image").on("click", function() {
            var src_copy = $(this).attr("src");
      
            $(this).attr("src", $(this).attr("src-alt"));
      
            $(this).attr("src-alt", src_copy);
          });
        });
        //
      });

  }


// Call on the renderButtons function to initialize buttons from the stock list of celebs
renderButtons();

// // On search button click, run AJAX command to retrieve and API response
$("#search-button").on("click", function(event) {
    // Prevent the form from submitting itself
    event.preventDefault();

    // Grab the text from the search input box
    var newCeleb = $("#celeb-input").val().trim();

    // Push this new celeb into the existing array of celebs
    celebrities.push(newCeleb);

    console.log(celebrities);

    // Run the renderButtons function to update the list of buttons on display to show the new button just added
    renderButtons();
    // renderGIFs(newCeleb);
});



//     // Create a variable called apiResponse
// var apiResponse;

// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(response) {
//     console.log(response);
// });

// // Save API response as a variable

// // Display the rating of each GIF under the respective GIF
