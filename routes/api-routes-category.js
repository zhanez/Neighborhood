const {Category} = require("../models");

module.exports = (app) => {
//get route to display ALL categorys in "existing category" section
app.get("/api/category", (req, res) => {
    Category.findAll({}).then((dbCategory) => {
      res.json(dbCategory);  
    }); 
});


//PUT route to update the categoryID for the user. A function of the category function

//GET route for the users table findone() for the my neighborhood section. A function of the category function, specify the categoryID 

//post route to the category table after user clicks "add category" button

app.post("/api/category", (req, res) => {
    Category.create({name: req.body.name}).then((dbCategory) => {
      res.json(dbCategory);
    });
  });

// **will NOT use delete route unless many to many. It will delete ALL users connected to category with a one to many**  
//delete route to delete a category. (would need to add a CASCADE delete to category table) 
// app.delete("/api/category/:id", (req, res) => {
//     Category.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then((dbCategory) => {
//       res.json(dbCategory);
//     });
//   });

// GET userCategory route to get members who had same category
app.get("/api/userCategory", (req, res) => {
  
})
};