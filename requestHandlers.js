var exec = require('child_process').exec;
var querystring = require('querystring'), fs = require('fs');

const start = (response, postData) => {
  console.log('Request handler start was called.');

  var body = `
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html" charset=UTF-8" />
      </head>
      <body>
        <form action="/upload" method="post">
          <textarea name='text' rows='20' cols='60'></textarea>
          <input type='submit' value='Submit Text' />
        </form>
        </body>
      </body>
    </html>
    `;
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(body);
  response.end();
}

const upload = (response, postData) => {
  console.log('Request handler upload was called.');
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write(`You've sent the text: ${querystring.parse(postData).text}`);
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