const db = require("../models");

module.exports = (app) => {
  // Get route for user table to display on the profile page.
  app.get("/api/user", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      res.json({
        id: req.user.id,
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,  
        bio: req.user.bio
      });
    }
  });

  //PUT route to update CategoryID if they want to switch neighborhoods
  app.put("/api/user", (req, res) => {
    db.User.update({
      CategoryId: req.body.CategoryId
    }, {
      where: {
        id: req.body.id
      }
    }).then((dbUser) => {
      res.json(dbUser);
    })
      .catch(function (err) {
        res.json(err);
      });
  });

  // GET route to display in neighborhood section
  app.get("/api/user/:CategoryId", (req, res) => {
    db.User.findAll({where: {CategoryId: req.params.CategoryId}}).then((data) => {
      res.json(data);
    })
  });
};