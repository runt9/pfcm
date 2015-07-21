var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('config');
var logger = require('logger');
var passport = module.exports.passport = require('passport');
var app = express();

// Initial config
logger.debug('Configuring');
app.set('view engine', 'jade');
app.set('views', __dirname + '/view');

// Middleware setup
logger.debug('Setting up middleware');
app.use(express.static('resources'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('express-session')({
    secret: 'go away',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Router imports
logger.debug('Loading routers');
app.use(require('controller/indexController'));
app.use(require('controller/authController'));

// Error handler import
app.use(require('controller/errorController'));

// DB setup
logger.debug('Initializing database');
var knex = require('knex')(config.db);
var bookshelf = require('bookshelf')(knex);

// Export before auth
module.exports.bookshelf = bookshelf;

// Auth Import
require('authentication');

module.exports = app;