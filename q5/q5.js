const http = require("http");
const url = require('url');
const querystring = require('querystring');

const pwn = require('./files/pwn');
const abc = require('./files/abc');

function getQuerys(query){
  const name = query.split('=');
  return name[1];
}

function server(request, response) {
  if(request.method === 'GET'){
    const query = url.parse(request.url).query;
    const query2 = querystring.parse(query);
    console.log(query2.file);
    //const query = getQuerys(url.parse(request.url).query);
    if(query2.file === 'pwn.html'){
      console.log('pwn');
      pwn.pwn(response);
    }
  }
}

http.createServer(server).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/?file=pwn.html');
