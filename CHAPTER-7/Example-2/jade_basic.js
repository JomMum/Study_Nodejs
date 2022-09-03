//모듈 추출
const http = require('http');
const fs = require('fs');
const jade = require('jade');

//서버 생성 및 실행
http.createServer(function(request, response) {
    //JadePage.jade 읽기
    fs.readFile('JadePage.jade', 'utf8', function(error, data) {
        //Jade 모듈 사용
        let fn = jade.compile(data);

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(fn({
            name: 'Jongwoong',
            description: 'Hello EJS with Node.js!'
        }));
    });
}).listen(52273, function() {
    console.log('Server Running at 127.0.0.1:52273');
});