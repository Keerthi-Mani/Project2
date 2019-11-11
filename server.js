require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var sgMail = require('@sendgrid/mail');
var nodeMailer = require("nodemailer");
var bodyParser = require("body-parser");
var db = require("./models");
var path = require("path");
var Nexmo = require('nexmo');
var db = require("./models");


// Init Nexmo
const nexmo = new Nexmo({
  apiKey: '33b708bd',
  apiSecret: '7zZGIIqDfAOwIUKs'
}, {
  debug: true
});

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

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Text messages
app.post('/text', (req, res) => {
  const {
    number,
    text
  } = req.body;

  nexmo.message.sendSms(
    '15413207560', number, text, {
      type: 'unicode'
    },
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        const {
          messages
        } = responseData;
        const {
          ['message-id']: id, ['to']: number, ['error-text']: error
        } = messages[0];
        console.dir(responseData);
        // Get data from response
        const data = {
          id,
          number,
          error
        };

      }
    }
  );
});

var syncOptions = {
  force: false
};

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