require('app-module-path').addPath(__dirname);
var app = require('index');
var config = require('config');

// Server init
app.listen(config.express.port, config.express.ip, function(error) {
    if (error) {
        console.error('Unable to start server', error);
        process.exit(1);
    }

    console.log('Server started in %s mode and listening at http://%s:%s',
        app.settings.env, config.express.ip, config.express.port);
});