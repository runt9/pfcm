// Node requires
var express = require('express');

// Express app setup
var app = module.exports = express();

// Config
app.set('view engine', 'jade');
app.set('views', __dirname + '/view');
app.use(express.static('resources'));

// Routes
app.get('/', function(req, res) {
    res.render('index', {title: 'Test', message: 'Test2'});
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

    console.log('Server started and listening at http://%s:%s', host, port);
});