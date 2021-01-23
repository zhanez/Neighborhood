// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated.js");

module.exports = function (app) {

    // route to homepage = login page
    app.get("/", function (req, res) {
        // if (req.user) {
        //     res.redirect("/members");
        // }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    //route to signup page
    app.get("/signup", function (req, res) {
        // If the user already has an account send them to the members page
        // if (req.user) {
        //     res.redirect("/grouptemplate");
        // }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    //route to grouptemplate page
    app.get("/grouptemplate", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/grouptemplate.html"));
    });

    // route to members page
    app.get("/members", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/members.html"));
    });
}