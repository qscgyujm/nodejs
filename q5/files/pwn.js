function pwn (response){
  response.writeHead(200, {"Content-Type": "text/html"});
  const html =`
    <html>
      <div>alert('pwnd')</div>
    </html>`;
  response.end(html);
}

exports.pwn = pwn;