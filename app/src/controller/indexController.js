var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('index', {title: 'Pathfinder Character Manager'});
});

module.exports = router;