const http = require('http');
const fileType = require('file-type');
const url = 'http://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif';

http.get(url, res => {
  let formData = '';
	res.once('data', chunk => {
    res.destroy();
    formData += chunk;
		console.log(fileType(chunk));
		//=> {ext: 'gif', mime: 'image/gif'}
	}).once('end', function(){
    console.log(formData);
  });
});