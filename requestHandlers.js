var exec = require('child_process').exec;
var querystring = require('querystring'),
 fs = require('fs'),
 formidable = require('formidable');

const start = (response) => {
  console.log('Request handler start was called.');

  var body = `
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html" charset=UTF-8" />
      </head>
      <body>
        <form action="/upload" enctype="multipart/form-data" method="post">
          <input type="file" name="upload">
          <input type='submit' value='Upload File' />
        </form>
      </body>
    </html>
    `;
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(body);
  response.end();
}

const upload = (response, request) => {
  console.log('Request handler upload was called.');

  var form = new formidable.IncomingForm();
  console.log('about to parse form');

  form.parse(request, (error, fields, files) => {
    console.log('parsing done');

    fs.rename(files.upload.path, '/tmp/test/png', (error) => {
      if (error){
        fs.unlink('/tmp/test.png');
        fs.rename(files.upload.path, '/tmp/test.png');
      }
    });

  });

  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write("received image: <br/>");
  response.write("<img src='/show' />")
  response.end();
}

const show = (response) => {
  console.log('Request handler show was called');
  response.writeHead(200, {"Content-Type": "image/png"});
  fs.createReadStream("/tmp/test.png").pipe(response);
}


exports.start = start;
exports.upload = upload;
exports.show = show;