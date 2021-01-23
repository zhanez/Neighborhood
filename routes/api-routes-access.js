const {User} = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {

  // User login
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

    // User sign up
  app.post("/api/signup", function(req, res) {
    User.create({
      email: req.body.email,
      password: req.body.password,
      // first_name: req.body.first_name,
      // last_name: req.body.last_name,
      // bio: req.body.bio
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // User logout
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};
