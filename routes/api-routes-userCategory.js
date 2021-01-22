const db = require("../models");

module.exports = (app) => {

//get All UserCategory data to display in the "My Neighborhood" section. Include Category table and the User table to display informtion.

app.get("/api/user-category", (req, res) => {
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.User.findAll({
      where: query,  
      include: [{
        model: db.Category,
        required: false,
        attributes: ['id', 'name'],
        through: {
            model: UserCategory
            }
        }]
    }).then((dbUserCategory) => {
      res.json(dbUserCategory);

      console.log(dbUserCategory);
    });
  });

//post UserCategory route after the user selects an existing category in the "Existing Category" section to then be displayed in the "My Neighborhood section"



//delete from UserCateogry table where id= ? (or email=?) ==> need to figure out the more dynamic way of doing this.

};