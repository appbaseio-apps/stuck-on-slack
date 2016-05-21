// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express

// ROUTES FOR OUR API
// =============================================================================
// var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/auth', require('./api/auth'));
app.get('/', require('./api/login'));



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
// app.use('/api', router);

// START THE SERVER
// =============================================================================
var server = app.listen(process.env.PORT || 5001,'0.0.0.0', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Magic happens on port ' + port);
});
