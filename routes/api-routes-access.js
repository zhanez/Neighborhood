const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {

  // User login
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

    // User sign up
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
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
