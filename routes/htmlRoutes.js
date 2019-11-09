var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    // db.Evasion.findAll({}).then(function (dbEvasion) {
    res.render("index", {
      msg: "Welcome!",
      // examples: dbEvasion
      // });
    });
  });

  // Load text message page
  app.get('/text', function (req, res) {
    res.render("textmessage")
  })

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Evasion.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbEvasion) {
      res.render("example", {
        example: dbEvasion
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};