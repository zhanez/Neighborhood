const path = require("path");

const isAuthenticated = require("../config/middleware/isAuthenticated.js");

//login page
module.exports = function(app){
    app.get("/", function(req, res){
        if(req.table){
            res.redirect("/grouptemplate");
        }
        res.sendfile(path.join(__dirname, "../public/signup.html"));
    });

    //route to signup page
    app.get("/login", function (req, res) {
        //If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/grouptemplate");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    //route to grouptemplate page
    app.get("/grouptemplate", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/grouptemplate.html"));
    });
};