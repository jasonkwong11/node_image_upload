var http = require('http');
var url = require('url');
var formidable = require('formidable');

const start = (route, handle) => {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log(`Request for ${pathname} received.`);

    request.setEncoding('utf8');

    request.addListener('data', (postDataChunk) => {
      postData += postDataChunk;
      console.log('Received POST data chunk: ' + postDataChunk);
    });

    request.addListener('end', () => {
      route(handle, pathname, response, postData);
    });
  }

  http.createServer(onRequest).listen(8888)
  console.log('Server is running on localhost:8888')
}

exports.start = start;
