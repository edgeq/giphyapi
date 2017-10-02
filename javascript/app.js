//set an array of topics i want to GIPHIFY
var btnTopics = ["p5js", "architecture", "surrealism", "brutalism", "postmodernism", "javascript art", "genreative art", "html canvas"];


//set a loop that writes a button to the DOM for every item in my array.
function btnLoop() {
	for (var j = 0; j < btnTopics.length; j++) {
		var newBtn = $("<button>");
		newBtn.addClass("btn-info gif-btn");
		newBtn.attr("data-art", btnTopics[j])
		newBtn.text(btnTopics[j]);
		$("#button-area").append(newBtn);
	}
}
//run the button loop
btnLoop();
//TO DO: Add form that dynamically adds to the button group
$("#select-art").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputArt = $("#art-input").val().trim();
   console.log(inputArt);
   //get inputArt into the button array
   btnTopics.push(inputArt);
   
   $("#button-area").empty();
   btnLoop();


   //assign value of inputArt to button's data-art attribute

  });

//ajax button click handler. When a button is clicked, use it's data-art attribute to search Giphy.
$(document).on("click","button", function() {
			//assign the button's "data-art" attribute to the art variable
      var art = $(this).attr("data-art");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        art + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
      	var results = response.data;
        console.log(response.data);

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");
          gifDiv.attr("class", "col-md-3 col-sm-6 col-xs-6")


          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var artImage = $("<img>");
          artImage.attr("data-animate", results[i].images.fixed_width.url);
          artImage.attr("data-still", results[i].images.fixed_width_still.url);
          artImage.attr("data-state", "still")
          artImage.attr("src", results[i].images.fixed_width_still.url)

          artImage.addClass("gif");

          gifDiv.prepend(p);
          gifDiv.prepend(artImage);

          $("#gifs-go-here").prepend(gifDiv);

        }
      });

      });
//starting and stopping gifs
$(document).on("click",".gif", function() {
				console.log(this);
        var state = $(this).attr("data-state")
        // var animate = $(this).attr("src", images.fixed_width.url)

 if (state === "still") {
          $(this).attr("data-state", "animate");
          $(this).attr("src", $(this).attr("data-animate") )
        }
        if (state === "animate") {
          $(this).attr("data-state", "still");
          $(this).attr("src", $(this).attr("data-still") )
        }
    });	

