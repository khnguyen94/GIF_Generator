// GIPPHY API KEY: 5H94PgMQxCIRZsyDmM1iOJzMsHdIhm8S

// GIF URL: https://api.giphy.com/v1/gifs/search

// EXAMPLE: https://api.giphy.com/v1/gifs/search?api_key=5H94PgMQxCIRZsyDmM1iOJzMsHdIhm8S&q=spaceship&limit=25&offset=0&rating=R&lang=en

// GIPHY Parameters: q, limit, rating

// Create all variables
var celebrities = ["Frank Ocean", "Kanye West", "The Weeknd", "Post Malone"];

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

    // Call the renderGIFs function on the newly added celeb/celeb button
  }
}

// Call on the renderButtons function to initialize buttons from the stock list of celebs
renderButtons();

// Create an event listener for whenever the celeb name buttons are clicked
$(".button").on("click", function() {
  event.preventDefault();

  // Clear the display
  $("#gif-display").empty();

  var celeb = $(this).attr("data-celeb");

  console.log(celeb);

  // Call renderGIFs function on celeb: renderGIFs(celeb)
  renderGIFs(celeb);

});

// // On search button click, dynamically create a new celeb button AND render the GIFs associated 
$("#search-button").on("click", function(event) {
  // Prevent the form from submitting itself
  event.preventDefault();

  // Grab the text from the search input box
  var newCeleb = $("#celeb-input")
    .val()
    .trim();

  // Push this new celeb into the existing array of celebs
  celebrities.push(newCeleb);

  console.log(celebrities);

  // Run the renderButtons function to update the list of buttons on display to show the new button just added
  renderButtons();

  // renderGIFs(newCeleb);
  renderGIFs(newCeleb);
});

// Create a function that will dynamically render GIF cards and append them to the 
function renderGIFs(celeb) {
  var gifQueryLimit = 10;
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=5H94PgMQxCIRZsyDmM1iOJzMsHdIhm8S&q=" +
    celeb +
    "&limit=" +
    gifQueryLimit;

  // Create ajax api command
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // should return the JSON dataframe as response
    console.log(response.data); // console log just the data object from response

    // Create a new variable called res and set it equal to that data object in response
    var res = response.data;

    // Create a for loop that goes throu every object within that data object
    for (i = 0; i < res.length; i++) {
      // It should create a a newGIFcard div, add class of card to it
      var newGIFCard = $("<div>");

      newGIFCard.addClass("card");

      newGIFCard.attr("style", "width: 200px");

      // Create a newGIFimg that is the card's image tag
      // Assign it an attribute of srs and set it to a still GIF
      // Assign it another attribute of src-alt and set it to a moving GIF
      var newGIFimg = $("<img>");

      newGIFimg.addClass("card-img-top");

      newGIFimg.attr("src", res[i].images.downsized_still.url);

      newGIFimg.attr("src-alt", res[i].images.downsized.url);

      // Append the newGIFimg to newGIFcard
      newGIFCard.append(newGIFimg);

      // Create a new div for the card body
      // Assign it a class of card-body
      var newGIFCardBody = $("<div>");

      newGIFCardBody.addClass("card-body");

      // Append newGIFCardBody to newGIFCard
      newGIFCard.append(newGIFCardBody);

      // Create a new h4 tag with class card-title
      // Add text for rating:
      var newGIFCardTitle = $("<h4>");

      newGIFCardTitle.addClass("card-title");

      newGIFCardTitle.text("Rating: " + res[i].rating);

      // Append the new card title to the card body
      newGIFCardBody.append(newGIFCardTitle);

      // Append it to the the gif-display in the HTML
      $("#gif-display").append(newGIFCard);

      // Now create css to format GIF cards
    }

    // Create an on click for still/moving GIF switch
    $(".card-img-top").on("click", function() {
      var src_copy = $(this).attr("src");

      $(this).attr("src", $(this).attr("src-alt"));

      $(this).attr("src-alt", src_copy);
    });
  });
}

// // Save API response as a variable

// // Display the rating of each GIF under the respective GIF
