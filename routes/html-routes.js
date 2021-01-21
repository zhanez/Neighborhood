const path = require("path");

const isAuthenticated = require("../config/middleware/isAuthenticated.js");

module.exports = function(app){
    app.get("/", function(req, res){
        if(req.table){
            res.redirect("/grouptemplate");
        }
        res.sendfile(path.join(__dirname, "../public/login.html"));
    })
}