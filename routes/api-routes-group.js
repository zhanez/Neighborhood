// api routes for dynamic group html pages

const db = require("../models");

module.exports = (app) => {

//get All UserCategory data to display in the members section of the group page. Include Category table and the User table to display informtion.

app.get("/api/group", (req, res) => {
    const query = {};
    if (req.query.category_id) {
      query.CategoryId = req.query.category_id;
    }
    db.Category.findAll({
      where: query,  
      include: [{
        model: db.User,
        required: false,
        attributes: ['id', 'first_name', 'last_name', 'email'],
        through: {
            model: UserCategory
            }
        }]
    }).then((dbUserCategory) => {
      res.json(dbUserCategory);

      console.log(dbUserCategory);
    });
  });

};