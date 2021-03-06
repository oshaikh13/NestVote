var express     = require('express'),
    mongoose    = require('mongoose');

var app = express(),
    cors = require('cors');
var server = require('http').Server(app);
var io = require('socket.io')(server);
// var redis = require('redis');
// var client = redis.createClient(); 

app.use(cors());
mongoose.connect(process.env.MONGO_URI); // connect to mongo database named shortly


// configure our server with all the middleware and and routing

// Redis testing
// client.on('connect', function () {
//   // body...
//   // require('./config/socketHandler.js')(io, client); 
// });

require('./config/socketHandler.js')(io); 


require('./config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js

server.listen(process.env.PORT || 8000);

module.exports = app;


/* Walkthrough of the server

  Express, mongoose, and our server are initialzed here
  Next, we then inject our server and express into our config/middleware.js file for setup.
    We also exported our server for easy testing

  middleware.js requires all express middleware and sets it up
  our authentication is set up there as well
  we also create individual routers for are two main features, links and users
  each feature has its own folder with a model, controller, and route file
    the respective file is required in middleware.js and injected with its mini router
    that route file then requires the respective controller and sets up all the routes
    that controller then requires the respective model and sets up all our endpoints which respond to requests

*/
