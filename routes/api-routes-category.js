const {Category} = require("../models");

module.exports = (app) => {

//get route to display ALL categorys in "existing category" section
app.get("/api/category", (req, res) => {
    Category.findAll({}).then((dbCategory) => {
      res.json(dbCategory);  
    }); 
});

//post route to the category table after user clicks "add category" button
app.post("/api/category", (req, res) => {
    Category.create({name: req.body.name}).then((dbCategory) => {
      res.json(dbCategory);
    });
  });
};