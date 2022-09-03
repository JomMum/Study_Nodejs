//모듈 추출
const connect = require('connect');

//서버 생성 및 실행
connect.createServer(function (request, response, next) {
    console.log('첫 번째 함수'); //첫 번째 매개변수
    next(); //다음 매개변수로 입력한 함수 실행
}, function(request, response, next) {
    console.log('두 번째 함수'); //두 번째 매개변수
    next(); //다음 매개변수로 입력한 함수 실행
}, function(request, response, next) {
    //응답
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<h1>Hello Connect Module!</h1>');
}).listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});