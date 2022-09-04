//모듈 추출
const connect = require('connect');

//서버 생성
let server = connect.createServer();

//미들웨어 사용
server.use(connect.router(function(app) {

})); 
//지정한 폴더 내의 파일을 모두 웹 서버 루트 폴더에 올림
server.use(connect.static(__dirname + '/Resources'));

//request 이벤트 핸들러 지정
server.use(function(request, response) {
    //응답
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('<img src = "/adventure_time2.jpg" width = "100%" />');
})

//서버 실행
server.listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});