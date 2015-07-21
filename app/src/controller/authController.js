var router = require('express').Router();
var passport = require('index').passport;

// Handle login
router.post('/login', function(req, res, next) {
    // Use local authentication against users table
    passport.authenticate('local', null, function (err, user, info) {
        // Unauthorized on error or no user found
        if (err) {
            return res.status(403).send(err.message);
        }

        if (!user) {
            return res.status(403).send(info.message);
        }

        // Login the user, 403-ing on error. Simple 200 on success.
        return req.logIn(user, function(err) {
            if (err) {
                return res.status(403).send(err.message);
            } else {
                return res.sendStatus(200);
            }
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.sendStatus(200);
});

module.exports = router;