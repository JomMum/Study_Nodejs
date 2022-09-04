//모듈 추출
const connect = require('connect');

//서버 생성
let server = connect.createServer();

//미들웨어 사용
server.use(connect.cookieParser());
server.use(connect.session({
    secret: 'secret',
    key: 'another sid',
    cookie: {
        maxAge: 60 * 1000
    }
}));
server.use(function(request, response) {
    //변수 설정
    let output = '';
    output += '<p>Cookies: ' + JSON.stringify(request.cookies) + '</p>';
    output += '<h1>Session: ' + JSON.stringify(request.session) + '</h1>';

    //응답
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(output);

    //세션 저장
    response.session.now = (new Date()).toUTCString();
});

//서버 실행
server.listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});