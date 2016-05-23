var appbaseRef = require('../helper/appbase').appbaseRef;

module.exports = function(req, res) {
  res.json({ text: 'Your status has been updated! Keep working!' });
  var jsonObject = {
    "team_id": req.body.team_id,
    "team_domain": req.body.team_domain,
    "status": req.body.text,
    "user_name": req.body.user_name,
    "channel_name": req.body.channel_name
  }
  console.log(jsonObject)
  appbaseRef.index({
    type: 'statuses',
    body: jsonObject
  }).on('data', function(response) {
    console.log(response);
  }).on('error', function(error) {
    console.log(error);
  });

}