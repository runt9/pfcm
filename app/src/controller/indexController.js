var router = require('express').Router();
var logger = require('logger');

router.get('/', function(req, res) {
    logger.debug('index');
    res.render('index', {title: 'Pathfinder Character Manager'});
});

module.exports = router;