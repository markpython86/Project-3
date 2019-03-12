// var db = require("../../models")

$(document).ready(function() {
  /* global moment */
  var authID = [];

  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  $(document).on("click", "span.add", reroute);
  // Variable to hold our posts
  var posts;

  // The code below handles the case where we want to get blog posts for a specific author
  // Looks for a query param in the url for author_id
  var url = window.location.search;
  var authorId;
  if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
    getPosts(authorId);
  }
  // If there's no authorId we just get all posts as usual
  else {
    getPosts();
  }

  function reroute() {
    var url = window.location.search;
    var authorId;
    if (url.indexOf("?author_id=") !== -1) {
      authorId = url.split("=")[1];
    }
    $.get("/api/posts?author_id=" + authorId, function(data) {
      window.location.href = "/post?author_id=" + authorId;
    });
  }

  // This function grabs posts from the database and updates the view
  function getPosts(author) {
    authorId = author || "";
    if (authorId) {
      authorId = "?author_id=" + authorId;
    }
    $.get("/api/posts" + authorId, function(data) {
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(author);
        // alert(author)
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    }).then(function() {
      getPosts(postCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    // var formattedDate = new Date(post.createdAt);
    // var days = [
    //   "Sunday",
    //   "Monday",
    //   "Tuesday",
    //   "Wednesday",
    //   "Thursday",
    //   "Friday",
    //   "Saturday"
    // ];
    // formattedDate = moment(formattedDate).format("MMMM Do YYYY");
    // var today = days[formattedDate.getDay()];


    var newPostCard = $("<div>");
    newPostCard.addClass("card mb-3 col-sm-12 col-lg-6 col-xl-4");

    //-----------------------------------------------
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header bg-transparent");
    var newCardTimer = $("<div>");
    newCardTimer.addClass("dailyTimeRow row");
    var newSpansTime1 = $("<span>");
    newSpansTime1.addClass("col-sm");
    newSpansTime1.text("06:00");
    var newSpansTime2 = $("<span>");
    newSpansTime2.addClass("dateStamp col-sm");
    newSpansTime2.text("11475");
    var newSpansTime3 = $("<span>");
    newSpansTime3.addClass("col-sm");
    newSpansTime3.text("12:00");
    newCardTimer
      .append(newSpansTime1)
      .append(newSpansTime2)
      .append(newSpansTime3);
    newPostCardHeading.append(newCardTimer);
    //---------------------------------------------
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newContentSection = $("<div>");
    newContentSection.addClass("contentSection");
    var newSpanContent1 = $("<span>");
    newSpanContent1.addClass("contentSection");
    newSpanContent1.html(
      "<i class='fas fa-flag icon'></i><strong>Highlight: </strong>" + post.highlight
    );
    var newLineBrake1 = $("<br>");
    var newSpanContent2 = $("<span>114500");
    newSpanContent2.addClass("contentSection");
    newSpanContent2.html(
      "<i class='fas fa-arrow-up icon'></i><strong>Positive: </strong>" +
        post.positive
    );
    var newLineBrake2 = $("<br>");
    var newSpanContent3 = $("<span>12:00");
    newSpanContent3.addClass("contentSection");
    newSpanContent3.html(
      "<i class='fas fa-arrow-down icon'></i><strong>Negative: </strong>" +
        post.negative
    );
    var newLineBrake3 = $("<br>");
    newContentSection
      .append(newSpanContent1)
      .append(newLineBrake1)
      .append(newSpanContent2)
      .append(newLineBrake2)
      .append(newSpanContent3)
      .append(newLineBrake3);
    newPostCardBody.append(newContentSection);
    //---------------------------------------
    // var newCardFooter = $("<div>");
    // newCardFooter.addClass("card-footer bg-transparent");
    // var newCardFooterInner = $("<div>");
    // newCardFooterInner.addClass("habitsRow row");
    // newCardFooterInner.html(
    //   "<span><i class='fas fa-running'></i></span>" +
    //     "<span><i class='fas fa-dumbbell'></i></span>" +
    //     "<span><i class='fas fa-tint'></i></span>"
    // );
    // newCardFooterInner.addClass("col-sm");
    // new Andrew work
    var newCardFooter = $("<div>");
    newCardFooter.addClass("card-footer habitsRow bg-transparent");
    var newCardFooterInner= $("<div>");
    newCardFooterInner.addClass("row");
    var newCardFooterInner1 = $("<span>");
    newCardFooterInner1.addClass("col-sm");
    newCardFooterInner1.html("<i class='fas fa-running'></i>");
    var newCardFooterInner2 = $("<span>");
    newCardFooterInner2.addClass("col-sm");
    newCardFooterInner2.html("<i class='fas fa-dumbbell'></i>");
    var newCardFooterInner3 = $("<span>");
    newCardFooterInner3.addClass("col-sm");
    newCardFooterInner3.html("<i class='fas fa-tint'></i>");
    newCardFooterInner
      .append(newCardFooterInner1)
      .append(newCardFooterInner2)
      .append(newCardFooterInner3);
    newCardFooter.append(newCardFooterInner);
    // newPostCardBody.append(newContentSection);
    // newPostCardHeading.append(newCardTimer);
    // newCardFooter.append(newCardFooterInner);
    newPostCard
      .append(newPostCardHeading)
      .append(newPostCardBody)
      .append(newCardFooter);
    console.log(
      "---------------------------------new post card: " + newPostCard
    );
    
    // var newPostTitle = $("<h2>");
    // var newPostDate = $("<small>");
    // var newPostAuthor = $("<h5>");
    // authID.push(post.Author.id);
    // newPostAuthor.text(
    //   "Written by: " + post.Author.name /**here was post.Author.name */
    // );
    // newPostAuthor.css({
    //   float: "right",
    //   color: "blue",
    //   "margin-top": "-10px"
    // });
    // var highlight = $("<p>");
    // var positive = $("<p>");
    // var negative = $("<p>");
    // var option1 = $("<p>");
    // var option2 = $("<p>");
    // var option3 = $("<p>");
    // var music = $("<p>");
    // var video = $("<p>");
    // newPostTitle.text();

    // // new Andrew work
    // highlight.text("Highlight: " + post.highlight + ".");
    // positive.text("Positive: " + post.positive + ".");
    // negative.text("Negative: " + post.negative + ".");
    // option1.text("Option 1: " + post.option1 + ".");
    // option2.text("Option 2: " + post.option2 + ".");
    // option3.text("Option 3: " + post.option3 + ".");
    // music.text("Music: " + post.music + ".");
    // video.text("Video: " + post.video + ".");

    // newPostDate.text(today + " " + formattedDate);
    // newPostTitle.append(newPostDate);
    // newPostCardHeading.append(deleteBtn);
    // newPostCardHeading.append(editBtn);
    // newPostCardHeading.append(newPostTitle);
    // newPostCardHeading.append(newPostAuthor);

    // // new Andrew work
    // newPostCardBody.append(highlight);
    // newPostCardBody.append(positive);
    // newPostCardBody.append(negative);
    // newPostCardBody.append(option1);
    // newPostCardBody.append(option2);
    // newPostCardBody.append(option3);
    // newPostCardBody.append(music);
    // newPostCardBody.append(video);
    // newPostCard.append(newPostCardHeading);
    // newPostCard.append(newPostCardBody);
    // newPostCard.data("post", post);
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  // function displayEmpty(id) {
  //   var query = window.location.search;
  //   var partial = "";
  //   // id = id

  //   if (id) {
  //     partial = " for Author " + id;
  //   }
  //   blogContainer.empty();
  //   var messageH2 = $("<h2>");
  //   messageH2.css({
  //     "text-align": "center",
  //     "margin-top": "50px"
  //   });
  //   messageH2.html(
  //     "No posts yet" +
  //       partial +
  //       ", navigate <a href='/post" +
  //       query +
  //       "'>here</a> in order to get started."
  //   );
  //   blogContainer.append(messageH2);
  // }
});
