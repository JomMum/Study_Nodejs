//모듈 추출
const connect = require('connect');
const fs = require('fs');

//변수 선언
let id = 'jongwoong';
let password = '0401';

//서버 생성
let server = connect.createServer();

//미들웨어 사용
server.use(connect.cookieParser());
server.use(connect.bodyParser());
server.use(connect.router(function(app) {
    //GET - '/LOGIN'
    app.get('/LOGIN', function(request, response, next) {
        //로그인이 되어 있을 시 (쿠키 정보가 있을 시)
        if(request.cookies.auth == 'true') {
            //응답
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end('<h1>Login Success</h1>');
        }
        //로그인이 되어 있지 않을 시
        else {
            fs.readFile('Login.html', function(error, data) {
                //응답
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            });
        }
    });

    //POST - '/LOGIN'
    app.post('/LOGIN', function(request, response, next) {
        //로그인 성공 시
        if(request.body.id == id && request.body.password == password) {
            response.writeHead(302, {
                'Location': '/LOGIN',
                'Set-Cookie': ['auth = true']
            });
            response.end();
        }
        //로그인 실패 시
        else {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end('<h1>Login Fail</h1>');
        }
    });
}));

//서버 실행
server.listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});