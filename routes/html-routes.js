const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const {User} = require("../models");
const {Category} = require("../models");

module.exports = function(app){
    app.get("/", function(req, res){
            if(!req.table){
                res.redirect("/signup");    
            }   
            res.render("members"); 
    });

    app.get("/signup", function(req,res){
        if(req.table){
            res.redirect("/members");
        }
        res.render("signup");
    })

    //route to signup page
    app.get("/login", function (req, res) {
        //If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.render("login");
    });

    //route to members page
    app.get("/members", isAuthenticated, function (req, res) {
        User.findAll({}).then((usersData) => {
        Category.findAll({}).then((categoriesData) => {
            console.log(categoriesData); 
            res.render("members", { 
                users: usersData,
                categories: categoriesData
            });
         })    
       }) 
    });
};
