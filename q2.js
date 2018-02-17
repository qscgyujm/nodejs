const http = require("http");
const url = require('url');

function splitQuery(query){
  const list = query.split('&');
  const ob={};
  for (var i = 0; i < list.length; ++i){
    ob[list[i].split('=')[0]] = list[i].split('=')[1]
  }
  return ob;
}

function server(request, response) {
  if(request.method === 'GET'){
    response.writeHead(200, {"Content-Type": "text/html"});
    //console.log(url.parse(request.url).query);
    const query = splitQuery(url.parse(request.url).query)
    response.end('GET'+ JSON.stringify(query));
  }
}

http.createServer(server).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');