var app = require('index');
var config = module.exports;

config.env = app.settings.env;

config.express = {
    port: 8585,
    ip: '127.0.0.1'
};