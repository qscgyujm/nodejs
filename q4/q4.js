const http = require('http');
const fileType = require('file-type');
const fs = require('fs')

function server(request, response) {
  if(request.method === 'GET'){
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end('GET');
  }
  if(request.method === 'POST' &&  request.url ==='/upload'){
    // console.log(request.headers['content-type']);
    let formData = ''
    request.once('data', function (data) {
      formData += data;
      // console.log(fileType(data));
    });
    request.on('end', function () {
      console.log(formData.length)
      let thirdNewlinePos = formData.split('\r\n', 3).join('\r\n').length
      let payload = formData.slice(thirdNewlinePos, -46)
      let buf = Buffer.from(payload, 'binary')
      
      // console.log(fileType(buf))
      // console.log('------', payload)
      fs.writeFileSync('./out.png', buf)

      //console.log(formData);
      //const aa = formData.split(request.headers['content-type'].split('; ')[1].split('=')[1])[1];
      //const bb = aa.replace(aa.split('\r\n')[1], '');
      //const cc = bb.replace(aa.split('\r\n')[2], '');
      //const dd = cc.replace('--', '');
      //console.log(dd);
      //fs.writeFileSync('./out.png', dd)
    });
  }
}

http.createServer(server).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
