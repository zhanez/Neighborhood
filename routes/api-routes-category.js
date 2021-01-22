const db = require("../models");

module.exports = (app) => {
//get route to display ALL categorys in "existing category" section
app.get("/api/category", (req, res) => {
    db.Category.findAll(req.body).then((dbCategory) => {
      res.json(dbCategory);  
    }); 
});

//post route to the category table after user clicks "add category" button

app.post("/api/category", (req, res) => {
    db.Category.create(req.body).then((dbCategory) => {
      res.json(dbCategory);
    });
  });

//delete route to delete a category. (would need to add a CASCADE delete to category table)

};