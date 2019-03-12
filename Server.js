const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');


var PORT = process.env.PORT || 3002;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static("client/build"));


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);



app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
