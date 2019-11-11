var db = require("../models");
var Nexmo = require('nexmo');

module.exports = function (app) {
    // Init Nexmo
    const nexmo = new Nexmo({
        apiKey: '',
        apiSecret: ''
    }, {
        debug: true
    });
    // Text messages
    app.post('/text', (req, res) => {
        const {
            number,
            text
        } = req.body;

        nexmo.message.sendSms(
            '', number, text, {
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
}