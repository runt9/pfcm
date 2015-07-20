var router = require('express').Router();

router.get('/login', function(req, res) {
    app.locals.user.authenticated = true;
    res.sendStatus(200);
});

router.get('/logout', function(req, res) {
    app.locals.user.authenticated = false;
    res.sendStatus(200);
});

module.exports = router;