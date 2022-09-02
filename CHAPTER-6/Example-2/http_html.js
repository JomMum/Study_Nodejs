//모듈 추출
const http = require('http');
const fs = require('fs');

//52273 포트 서버 생성 및 실행
http.createServer(function(request, response) {
    //HTML 파일 읽기
    fs.readFile('HTMLPage.html', function(error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data); //응답이 끝나면 해당 HTML 띄우기
    });
}).listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});


//52274 포트 서버 생성 및 실행
http.createServer(function(request, response) {
    //이미지 파일 읽기
    fs.readFile('adventure_time.jpeg', function(error, data) {
        response.writeHead(200, {'Content-Type': 'image/jpeg'});
        response.end(data); //응답이 끝나면 해당 이미지 띄우기
    })
}).listen(52274, function() {
    console.log('Server Running at http://127.0.0.1:52274');
});


//52275 포트 서버 생성 및 실행
http.createServer(function(request, response) {
    //mp3 파일 읽기
    fs.readFile('worldsSmallestViolin.mp3', function(error, data) {
        response.writeHead(200, {'Content-Type': 'audio/mp3'});
        response.end(data);
    });
}).listen(52275, function() {
    console.log('Server Running at http://127.0.0.1:52275');
});


//52276 포트 서버 생성 및 실행
http.createServer(function(request, response) {
    //다른 페이지로 이동하기
    response.writeHead(302, {'Location': 'http://naver.com'});
    response.end(); 
}).listen(52276, function() {
    console.log('Server Running at http://127.0.0.1:52276')
});