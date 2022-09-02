//모듈 추출
const http = require('http');

//서버 생성 및 연결
http.createServer(function(request, response) {
    //쿠키 추출 및 분해
    let cookie = request.headers.cookie;
    cookie = cookie.split(';').map(function(element) {
        element = element.split('=');
        return {
            key: element[0],
            value: element[1]
        }
    });

    //쿠키 생성
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Set-Cookie': ['name = Jongwoong', 'region=Gyeonggi']
    });

    //GET 요청
    response.end('<h1>' + JSON.stringify(cookie) + '</h1>');
}).listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});