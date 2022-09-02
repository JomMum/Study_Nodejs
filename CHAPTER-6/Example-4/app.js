//모듈 추출
const http = require('http');
const fs = require('fs');
const url = require('url');

//서버 생성 및 실행
http.createServer(function(request, response) {
    //변수 선언
    let pathName = url.parse(request.url).pathname;

    //페이지 구분
    if(pathName == '/') {
        //Index.html 파일 읽기
        fs.readFile('Index.html', function(error, data) {
            response.writeHead(200, 'text/html');
            response.end(data);
        });
    }
    else if(pathName == '/OtherPage') {
        //OtherPage.html 파일 읽기
        fs.readFile('OtherPage.html', function(error, data) {
            response.writeHead(200, 'text/html');
            response.end(data);
        });
    }
}).listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});