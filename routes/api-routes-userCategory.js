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

// app.post("/api/user-category", (req, res) => {
//     db.User.findOne(
//         { where: {id: req.body.id}
//     }).then((category) => {
//      db.Category.findOne( 
//          { where: {id: req.body.id}
//     }).then(([user, category]) => {
//     db.UserCategory.create({UserID: user.id, CategoryID: category.id} 
//     )}   
//      )});
// });

//delete from UserCateogry table where email =

};