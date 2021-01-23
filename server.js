// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");

// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes-access.js")(app);
require("./routes/api-routes-category.js")(app);
require("./routes/api-routes-group.js")(app);
require("./routes/api-routes-user.js")(app);
require("./routes/api-routes-userCategory.js")(app);

// Syncing our database and logging a message to the user upon successs
db.sequelize.sync({force: true}).then(function () {
    app.listen(PORT, function () {
        console.log("Server listening on: http://localhost:" + PORT);
    });
});