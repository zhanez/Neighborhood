const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app){
    app.get("/", function(req, res){
        if(req.table){
            res.redirect("/members");
        }
        res.render("signup");
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
        res.render("index");
    });
};
