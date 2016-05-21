module.exports = function(req, res) {
  res.send('<a href="https://slack.com/oauth/authorize?scope=incoming-webhook,commands&client_id=2920034424.44477141123&redirect_uri=http://127.0.0.1:3000/auth"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>');
};
