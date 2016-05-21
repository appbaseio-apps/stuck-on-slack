var request = require('request');
var slackCredentials = require('../config').slack
var appbaseRef = require('../helper/appbase').appbaseRef;

module.exports = function(req, res) {

  if (req.query.error) {
    return;
  }

  var code = req.query.code;

  var authForm = {
    url: 'https://slack.com/api/oauth.access',
    form: {
      client_id: slackCredentials.SLACK_CLIENT_ID,
      client_secret: slackCredentials.SLACK_CLIENT_SECRET,
      code: code
    }
  };

  request.post(authForm, function(err, response, body) {
    if (err) {
      console.log(err);
    }
    body = JSON.parse(body);
    if (body.error) {
      console.log(body.error);
    } else {
      console.log(body);
      appbaseRef.index({
        type: 'users',
        id: body.team_id,
        body: body
      }).on('data', function(response) {
        console.log(response);
      }).on('error', function(error) {
        console.log(error);
      });
      res.send("You've connected successfully! Now try using /on command from your slack.")

    }
  });
};
