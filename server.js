var http = require('http');

function onRequest(request, response) { // request details not important atm
  console.log('Request received');
  response.writeHead(200, {'Content-type': 'text/plain'});  // creates the header
  response.write('Hello world');    // creates the response body
  response.end();   // finishes the response
}

http.createServer(onRequest).listen(8888);  // indicates which port to listen on

console.log('Server has started');
