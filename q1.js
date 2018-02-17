const http = require("http");
const qs = require('querystring');

function server(request, response) {
  if(request.method === 'GET'){
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end('Hello World WenMing');
  }
  if(request.method === 'POST'){
    console.log('post');
    let formData = '';
    request.on('data', function (data) {
      formData += data;
      console.log(data);
    });
    request.on('end', function () {
    });
  }
}

http.createServer(server).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
