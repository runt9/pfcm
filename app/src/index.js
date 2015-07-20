var express = require('express');
var app = express();

// Initial config
app.set('view engine', 'jade');
app.set('views', __dirname + '/view');
app.use(express.static('resources'));

// Router imports
app.use(require('controller/indexController'));
app.use(require('controller/authController'));

// Error handler import
app.use(require('controller/errorController'));

app.locals.user = {
    authenticated: false
};

module.exports = app;