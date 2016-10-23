var server = require('./server');
var router = require('./router');
var url = require('url');


server.start(router.route);