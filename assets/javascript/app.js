var topics = ["The Devil Wears Prada", "She's the Man", "Mean Girls", "Bride Wars", "A Walk to Remember", "Harry Potter", "The Incredibles", "Finding Nemo", "Frozen", "The Avengers"];

function reset() {
  movieImage.attr("src", results[i].images.fixed_height_still.url);

  movieImage.attr("data-still", results[i].images.fixed_height_still.url);

  movieImage.attr("data-animate", results[i].images.fixed_height.url);

  movieImage.attr("data-state", "still");

  movieImage.addClass("gifs");
}


function displayBtn() {

  $("#buttons").empty();

  for (var i = 0; i < topics.length; i++) {

    var movieBtn = $("<button>");

    movieBtn.attr("data-movie", topics[i]);
    movieBtn.addClass("btn btn-primary");
    movieBtn.addClass("movieB");

    movieBtn.text(topics[i]);

    $("#buttons").append(movieBtn);

  }
}

function addButton() {
  $("#addMovie").on("click", function () {
    event.preventDefault();
    var newMovie = $("#movieTitle").val().trim();
    topics.push(newMovie);
    newMovie = $("#movieTitle").val("");
    displayBtn();
  });
}

function displayGifs() {

  $(".movieB").on("click", function () {

    var movie = $(this).attr("data-movie");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=1fQRBPPg8tRx4ZVUkHyqOTBhlHJ3ATQl&limit=10&rating=G";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#display").empty();
      var results = response.data;


      for (var i = 0; i < results.length; i++) {

        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var movieImage = $("<img>");

        movieImage.attr("src", results[i].images.fixed_height_still.url);

        movieImage.attr("data-still", results[i].images.fixed_height_still.url);

        movieImage.attr("data-animate", results[i].images.fixed_height.url);

        movieImage.attr("data-state", "still");

        movieImage.addClass("gifs");

        gifDiv.append(movieImage);
        gifDiv.append(p);

        $("#display").prepend(gifDiv);
      }
    });
  });


  $(document).on("click", ".movieB", displayGifs);
  $(document).on("click", ".gifs", function () {

    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
    reset();
  });
}


$(document).ready(function () {
  addButton();
  displayBtn();
  displayGifs();
});