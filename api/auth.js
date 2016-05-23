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
        subscribeToTeamUpdates(body.team_id, body.incoming_webhook.url)
        console.log(response);
      }).on('error', function(error) {
        console.log(error);
      });
      res.redirect("/dashboard.html")

    }
  });
};

function subscribeToTeamUpdates(team_id, webhookUrl) {
  /* Query to check if the new status is posted with specific team_id */
  var requestObject = {
    type: "statuses",
    body: {
      query: {
        match: {
          "team_id": team_id
        }
      }
    }
  };

  var statusBodyObject = {
    "text": "@{{{user_name}}} is working on {{{status}}}"
  }

  var webhookObject = {
    'method': 'POST',
    'url': webhookUrl,
    'body': statusBodyObject
  }

  appbaseRef.searchStreamToURL(requestObject, webhookObject).on('data', function(stream) {
    console.log("Webhook initialized: ", JSON.stringify(stream))
  }).on('error', function(error) {
    console.log("Query error: ", JSON.stringify(error))
  });
}
