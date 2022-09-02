//모듈 추출
const http = require('http');

//서버 생성 및 실행
http.createServer(function(request, response) {
    //변수 선언
    let date = new Date();
    date.setDate(date.getDate() + 7);

    //쿠키 입력
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Set-Cookie': [
            'breakfast = toast; Expires=' + date.toUTCString(),
            'dinner = chicken'
        ]
    });

    //쿠키 출력
    response.end('<h1>' + request.headers.cookie + '</h1>');
}).listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});