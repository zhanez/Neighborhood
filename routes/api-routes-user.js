const db = require("../models");

module.exports = function(app) {
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

 //put route to update user information such as, bio and name. 
 app.put("/api/user", function(req, res) {
     db.User.update(
         {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            bio: req.body.bio,
            where: {
                 id: req.body.id
             }

         }).then((request) => {
             res.json(request);
         });
        });  
  });
};