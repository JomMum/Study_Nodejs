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
    fs.readFile('HTMLPage.html', 'utf8', function(error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});

//소켓 서버 이벤트 연결
io.sockets.on('connection', function(socket) {
    //setname 이벤트
    socket.on('setname', function(data) {
        //클라이언트 데이터 저장
        socket.name = data;
    })

    //getname 이벤트
    socket.on('getname', function() {
        //데이터 추출
        let name = socket.name;

        //데이터 전송
        socket.emit('responsename', name);
    });
});