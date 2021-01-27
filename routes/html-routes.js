const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated")

module.exports = function(app){
    app.get("/", function(req, res){
        if(req.table){
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/signup", function(req,res){
        if(req.table){
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    })

    //route to signup page
    app.get("/login", function (req, res) {
        //If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    //route to members page
    app.get("/members", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/members.html"));
    });

    //route to grouptemplate page
    // app.get("/grouptemplate", isAuthenticated, function (req, res) {
    //     res.sendFile(path.join(__dirname, "../public/grouptemplate.html"));
    // });
};
