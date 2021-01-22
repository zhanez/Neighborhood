const db = require("../models");

// Get route for user table to display on the profile page.
app.get("/api/user", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's profile information.
      res.json({
        id: req.user.id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,  
        email: req.user.email,
        bio: req.user.bio
      });
    }
  });