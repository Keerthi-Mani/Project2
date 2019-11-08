require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var nodeMailer = require("nodemailer");
var sgMail = require('@sendgrid/mail');
var bodyParser = require("body-parser");
var path = require("path");


var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));


//Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
app.get('/'), (req, res) => {
  res.render('main.handlebars');
}
//require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {
  force: false
};

//Send-mails
app.post("/send-email", function (req, res) {
  console.log("Name :" + req.body.person_name)
  console.log("Email :" + req.body.person_email_id);
  console.log("Sub :" + req.body.subject_text);
  console.log("Message :" + req.body.text_area);
  //update your API_KEY
  sgMail.setApiKey("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");

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Members" <maskproject2@gmail.com>', // sender address
    to: req.body.person_email_id, // list of receivers
    subject: req.body.subject_text, // Subject line
    text: req.body.text_area, // plaintext body
    // html: '<b>Hello world ?</b>' // html body
  };
  sgMail.send(mailOptions);
});
// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;