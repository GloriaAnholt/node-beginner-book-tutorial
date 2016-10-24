const qs = require('querystring');
const fs = require('fs');
const formidable = require('formidable');

function start(response, postData) {
  console.log('Request handler \'start\' was called.');

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}

function upload(response, request) {
  console.log('Request handler \'upload\' was called.');

  var form = new formidable.IncomingForm();
  console.log('About to parse...');
  form.parse(request, function(err, fields, files) {
    console.log('Done parsing.');

    fs.rename(files.update.path, '/tmp/test.png', function (err) {
      if (err) {
        fs.unlink('/tmp/test.png');
        fs.rename(files.update.path, '/tmp/test.png');
      }
    });
  });
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write('Received image:<br>');
  response.write("<img src='/show' />");
  response.end();
}

function show(response) {
  console.log('Request handler \'show\' was called.');
  response.writeHead(200, {'Content-Type': 'img/png'});
  fs.createReadStream('/tmp/test.png').pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;