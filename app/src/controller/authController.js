var router = require('express').Router();
var passport = require('index').passport;
var logger = require('logger');

router.get('/authenticate', function(req, res, next) {
    logger.debug('authenticate');
    if (req.isAuthenticated()) {
        res.status(200).send(req.user.username);
    } else {
        res.sendStatus(401);
    }
});

// Handle login
router.post('/login', function(req, res, next) {
    logger.debug('login');
    // Use local authentication against users table
    passport.authenticate('local', null, function (err, user, info) {
        // Unauthorized on error or no user found
        if (err) {
            logger.error('Failed login: %s', err.message);
            return res.status(403).send(err.message);
        }

        if (!user) {
            logger.error('User not found: %s', info.message);
            return res.status(403).send(info.message);
        }

        // Login the user, 403-ing on error. Simple 200 on success.
        return req.logIn(user, function(err) {
            if (err) {
                logger.error('User %s login failed: %s', user.username, err.message);
                return res.status(403).send(err.message);
            } else {
                logger.info('User %s successfully logged in', user.username);
                return res.status(200).send(user.username);
            }
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    logger.debug('logout');
    req.logout();
    res.sendStatus(200);
});

module.exports = router;