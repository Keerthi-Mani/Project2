var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Evasion.findAll({}).then(function (dbEvasion) {
      res.render("evasion", {
        evasion: dbEvasion
      });
    });
  });

  app.get("/sendemail", function (req, res) {
    db.Evasion.findAll({}).then(function (dbEvasion) {
      res.render("email", {
        //examples: dbEvasion
      });
    });
  });

  // Load text message page
  app.get('/text', function (req, res) {
    res.render("textmessage")
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};