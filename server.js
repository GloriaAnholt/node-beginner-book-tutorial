// Convert the server into a module and export it

const http = require('http');
const url = require('url');     // help extract the url from the request
                                // check the GET/POST parameters

function start(route, handle) {
  function onRequest(request, response) { // request details not important atm
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received.');

    route(handle, pathname, response);
  }

  http.createServer(onRequest).listen(8888);  // indicates which port to listen on
  console.log('Server has started');
}

exports.start = start;