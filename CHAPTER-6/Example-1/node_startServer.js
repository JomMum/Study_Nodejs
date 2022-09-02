//http 모듈 추출
const http = require('http');

//server 객체에 웹 서버 생성
let server = http.createServer(function(request, response) {
    //응답 헤더 작성
    response.writeHead(200, {'Content-Type': 'text/html'});
    //응답 본문 작성
    response.end('<h1>Hello Web Server with Node.js</h1>');
});

//server 객체에 이벤트 연결
server.on('request', function() {
    console.log('Request On'); //클라이언트가 요청할 때
});
server.on('connection', function() {
    console.log('Connection On'); //클라이언트가 접속할 때
});
server.on('close', function() {
    console.log('Close On'); //서버가 종료될 때
});

//웹 서버 실행
server.listen(52273);

//10초 후 서버 종료
setInterval(function() {
    server.close();
}, 10000);