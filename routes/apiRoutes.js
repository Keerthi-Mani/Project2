var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    //db.Evasion.findAll({}).then(function (dbEvasion) {
    res.json(dbEvasion);
  });
  //});

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Evasion.create(req.body).then(function (dbEvasion) {
      res.json(dbEvasion);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Evasion.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbEvasion) {
      res.json(dbEvasion);
    });
  });
};