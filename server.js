// Convert the server into a module and export it

const http = require('http');
const url = require('url');     // help extract the url from the request
                                // check the GET/POST parameters

function start(route, handle) {
  function onRequest(request, response) { // request details not important atm
    var postData = '';
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received.');

    request.setEncoding('utf8');

    request.addListener('data', function(postDataChunk) {
      postData += postDataChunk;
      console.log('Received POST data chunk ' + postDataChunk + '.');
    });

    request.addListener('end', function() {
      route(handle, pathname, response, postData);
      }
    );
  }

  http.createServer(onRequest).listen(8888);  // indicates which port to listen on
  console.log('Server has started');
}

exports.start = start;