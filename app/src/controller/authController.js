var router = require('express').Router();

router.get('/login', function(req, res) {
    res.sendStatus(200);
});

router.get('/logout', function(req, res) {
    res.sendStatus(200);
});

module.exports = router;