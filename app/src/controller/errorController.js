var router = require('express').Router();

router.use(function(req, res, next) {
    res.status(404).render('error', {error: {msg: 'Unable to locate page ' + req.url, info: ''}})
});

router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('error', {error: {msg: 'An error occurred during the request.', info: err}});
});

module.exports = router;