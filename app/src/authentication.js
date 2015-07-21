var passport = require('index').passport;
var User = require('model/user');
var crypto = require('crypto');
var logger = require('logger');
LocalStrategy = require('passport-local').Strategy;

// Main auth function
passport.use(new LocalStrategy(function(username, password, done) {
    // Go find the user by the given username
    new User({username: username}).fetch().then(function(data) {
        var user = data;
        // If no user found, error out, obviously.
        if (user === null) {
            logger.debug('Failed to find user [%s] during auth', username);
            return done(null, false, {message: 'Invalid username or password'});
        }

        // Hash the given password and compare it against the user's hash. If it matches,
        // the user logged in. Otherwise, it failed.
        var hashPwd = crypto.createHash('sha256').update(password).digest('hex');
        if (hashPwd == user.get('password')) {
            return done(null, user.toJSON());
        } else {
            logger.debug('User [%s] entered invalid password', username);
            return done(null, false, {message: 'Invalid username or password'});
        }
    });
}));

// Quick serialize/deserialize functions
passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    new User({username: username}).fetch().then(function(user) {
        done(null, user);
    });
});
