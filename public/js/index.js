// DELETE THIS FILE

// Get references to page elements
let $firstName = $("#first-name");
let $lastName = $("#last-name");
let $birthday = $("birthday");
let $username= $("#username");
let $password = $("#password");
let $submitBtn = $("#submit");

// The API object contains methods for each kind of request we'll make
let API = {
  authenticateUser: function(username, password) {
    console.log(username + " " + password);
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "models/index.js",
      data: JSON.stringify(
        {
          username: username,
          password: password
        })
    });
  },
  saveExample: function(example) {
		console.log('TCL: example', example)
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  //this grabs the cookie that we stored for the user in the browser
  getExamples: function() {
    let token = document.cookie.split(";")
    .filter(
      function(element) {
        return element.indexOf('token=') === 0
      }
    )[0].split("=")[1];
    return $.ajax({
      url: "api/examples",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
let refreshExamples = function() {
  API.getExamples().then(function(data) {
    let $examples = data.map(function(example) {
      let $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      let $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      let $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
let handleFormSubmit = function(event) {
  event.preventDefault();

  let username = $username.val().trim();
  let password = $password.val().trim();


  API.authenticateUser(username, password).then(function(token) {
    console.log(username + " " + password);
    document.cookie = "token=" + token.token;
    location.reload();
  });

  $username.val("");
  $password.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
let handleDeleteBtnClick = function() {
  let idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
