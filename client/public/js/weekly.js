$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select
  //   var bodyInput = $("#body");
  //   var titleInput = $("#title");
  var $best = $("#best");
  var $worst = $("#worst");
  var $next = $("#next_week");
  // Adding an event listener for when the form is submitted
  $("#weekSubmit").on("click", function (event) {
    // A function for handling what happens when the form to create a new post is submitted
    event.preventDefault();

    var newPost = {
      best: $best.val().trim(),
      worst: $worst.val().trim(),
      nextWeek: $next.val().trim()
    };
    $.post("api/weekly", newPost).then(console.log(newPost));
  });

  // Submits a new post and brings user to blog page upon completion
  //   function submitPost(post) {
  //     var url = window.location.search;
  //     var authorId;
  //     if (url.indexOf("?author_id=") !== -1) {
  //       authorId = url.split("=")[1];
  //     }
  //     // $.post("/api/weekly", post).then(
  //     );
  //   }
});
