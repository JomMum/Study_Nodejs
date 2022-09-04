//모듈 추출
const connect = require('connect');

//-- 1. connect 미들웨어 사용 --//
connect.createServer(connect.query(), function(request, response, next) {
    //간편한 GET 요청 정보 추출
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('<h1>' + JSON.stringify(request.query) + '</h1>');
}).listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});

//-- 2. logger 미들웨어 사용 --//
connect.createServer(connect.logger(':method + :date'), function(request, response, next) {
    //웹 요청 관련 로그 출력 (':method + :date'처럼 특정 정보만 출력 가능))
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('<h1>Hello Connect Module</h1>');
}).listen(52274, function() {
    console.log('Server Running at http://127.0.0.1:52274');
});

//-- 3. error handler 미들웨어 사용 --//
//서버 생성
let server = connect.createServer(function() {
    throw new Error('Page Not Found'); //예외 강제 발생
}); 

//예외 처리
// * 예외가 발생한 이후에 Error Handler가 추가돼야 하므로, 가장 마지막에 위치시켜야 함
server.use(connect.errorHandler({
    stack: true,
    message: true,
    dump: true
}));
    
server.listen(52275, function() {
    console.log('Server Running at http://127.0.0.1:52275');
});