function abc (response){
  response.writeHead(200, 
    {"Content-Type": "text/plain; charset=utf-8"}
  );
  const html =`測試abc網頁`;
  response.end(html);
}

exports.abc = abc;