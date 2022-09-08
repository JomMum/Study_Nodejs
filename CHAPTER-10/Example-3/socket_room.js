//모듈 추출
const fs = require('fs');

//서버 생성
const server = require('http').createServer();
const io = require('socket.io')(server);

//서버 실행
server.listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});

//웹 서버 이벤트 연결
server.on('request', function(request, response) {
    //HTMLPage.html 파일 읽기
    fs.readFile('HTMLPage.html', function(error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});

//소켓 서버 이벤트 연결
io.sockets.on('connection', function(socket) {
    //join 이벤트
    socket.on('join', function(data) {
        socket.join(data); // 클라이언트를 해당 방에 접속시킴
        socket.room = data; //방 번호 부여
    });

    //message 이벤트
    socket.on('message', function(data) {
        let room = socket.room;

        io.sockets.in(room).emit('message', data);
    });
});