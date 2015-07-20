// Node requires
var express = require('express');

// Express app setup
var app = module.exports = express();

// Config
app.set('view engine', 'jade');
app.set('views', __dirname + '/view');
app.use(express.static('resources'));
var env = app.settings.env;
app.locals.user = {
    authenticated: false
};

// Routes
app.get('/', function(req, res) {
    res.render('index', {title: 'Test', message: 'Test2'});
});

app.get('/login', function(req, res) {
    app.locals.user.authenticated = true;
    res.sendStatus(200);
});

// Error handlers
app.use(function(req, res, next) {
    res.status(404).render('error', {error: {msg: 'Unable to locate page ' + req.url, info: ''}})
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('error', {error: {msg: 'An error occurred during the request.', info: err}});
});

// Server init
var server = app.listen(8585, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server started in %s mode and listening at http://%s:%s', env, host, port);
});