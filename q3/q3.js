const http = require("http");
const fs = require('fs');
const util = require('util');
const formidable = require("formidable");

const fileToBase64 = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'base64', function (err, data) {
      resolve(data);
    })
  })
}

const change64Tofile = (fileData)=>{
  return new Promise((resolve, reject) => {
    fs.writeFile('test.jpg', new Buffer(fileData, 'base64'), function(){
      if(err){
        console.log(err);
      }
      console.log('fileSave');
    });
  });
}

function server(request, response) {
  if(request.method === 'GET'){
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end('GET');
  }
  if(request.method === 'POST' &&  request.url ==='/uploadRow'){
    let formData = '';
    console.log(request.headers['content-type']);
    request.on('data', function (data) {
      formData += data;
    });
    request.on('end', function () {
      // console.log( formData );
    });
  }
  if(request.method === 'POST' &&  request.url ==='/upload'){
    const form = new formidable.IncomingForm();
    form.uploadDir = __dirname+'/tmp';
    form.parse(request, function(error, fields, files){
      response.writeHead(200, {'content-type': 'text/plain'});
      response.write('received upload:\n\n');
      response.end(util.inspect({fields: fields, files: files}));
      fileToBase64(files.file.path).then(result =>{
        //console.log(result);
        change64Tofile(result);
      });
    });
  }
}

http.createServer(server).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

// http://wp.mlab.tw/?p=2369
// https://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file