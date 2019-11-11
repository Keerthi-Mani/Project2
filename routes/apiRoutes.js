var db = require("../models");
var sgMail = require('@sendgrid/mail');
var Evasion = require("../models/evasion");
module.exports = function (app) {
  // Get all mails
  app.get("/all", function (req, res) {
    db.Evasion.findAll({}).then(function (dbEvasion) {
      res.json(dbEvasion);
    });
  });
  // Get mails by name
  app.get("/sendemail/:name", function (req, res) {
    db.Evasion.findOne({
      where: {
        contact_name: req.params.contact_name
      }
    }).then(function (dbEvasion) {
      res.json(dbEvasion);
    });
  });

  //Send-mails
  app.post("/sendemail", function (req, res, next) {
    // db.sequelize.query("INSERT INTO sequelize_evasion.evasions (contact_name, contact_email, contact_relation, message, createdAt, updatedAt) VALUES('" + req.body.contact_name + "', '" + req.body.contact_email + "', '" + req.body.contact_relation + "', '" + req.body.message + "','2019-11-01 06:00:00','2019-11-01 06:00:00')", function (err) {
    //   if (err) {
    //     console.log(err.message);
    //   }
    // });
    db.Evasion.create({
      contact_name: req.body.contact_name,
      contact_email: req.body.contact_email,
      contact_relation: req.body.contact_relation,
      message: req.body.message
    }).then(function (results) {
      console.log(results);
      res.json(results);
    });


    sgMail.setApiKey("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");
    sendMail(req.body.contact_email, req.body.contact_subject, req.body.message, req.body.attachment_data, req.body.attachment_filename);
    console.log(req.body);
  });

  // setup e-mail data with unicode symbols
  var sendMail = (email, subject, message, attachment_data, attachment_filename) => {
    // setup e-mail data with unicode symbols
    //    const file = document.querySelector('#myfile').files[0];
    console.log(attachment_data);
    console.log(attachment_filename);
    var mailOptions = {
      from: 'maskproject2@gmail.com', // sender address
      to: email, // list of receivers
      subject: subject,
      text: message,
      html: '<p>' + message + '</p>',

      attachments: [{
        content: attachment_data,
        filename: attachment_filename,
        type: 'plain/text',
        disposition: 'attachment',
        contentId: 'mytext'
      }, ],
    };
    sgMail.send(mailOptions);
  };
  module.exports = sendMail;

  // function getBase64(file) {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     console.log(reader.result);
  //   };
  //   reader.onerror = function (error) {
  //     console.log('Error: ', error);
  //   };
  //}

  // Delete the mail by id
  app.delete("/sendemail/:id", function (req, res) {
    db.Evasion.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbEvasion) {
      res.json(dbEvasion);
    });
  });
};