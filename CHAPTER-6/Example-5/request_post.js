//모듈 추출
const http = require('http');
const fs = require('fs');

//서버 생성 및 연결
http.createServer(function(request, response) {
    //GET 요청
    if(request.method == 'GET') {
        fs.readFile('HTMLPage.html', function(error, data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    }
    //POST 요청
    else if(request.method == 'POST') {
        request.on('data', function(data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end('<h1>' + data + '</h1>');
        });
    }
}).listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273')
});