// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express

var port = process.env.PORT || 7080; // set our port


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
