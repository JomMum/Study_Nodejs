//모듈 추출
const connect = require('connect');

//-- Cookie Parser 미들웨어 --//
connect.createServer(connect.cookieParser(), connect.router(function(app) {
    // GET - /SetCookie
    app.get('/SetCookie', function(request, response, next) {
        //응답
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'Set-Cookie': ['breakfast = toast', 'dinner = lunch']
        });
        response.end('<a href = "/GetCookie">GO TO GET COOKIE</a>');
    });

    // GET - /GetCookie
    app.get('/GetCookie', function(request, response, next) {
        //쿠키 추출
        let output = JSON.stringify(request.cookies);
        
        //응답
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('<h1>' + output + '</h1>');
    });
})).listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});