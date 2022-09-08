//모듈 추출
const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

//웹 서버 생성
let server = http.createServer(function(request, response) {
    //HTMLPage.html 파일 읽기
    fs.readFile('HTMLPage.html', function(error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
}).listen(52273);

//소켓 서버 생성 및 실행
const io = socketio(server);

let id = 0;

//클라이언트가 웹 소켓 서버에 연결할 시
io.sockets.on('connection', function(socket) {
    //콘솔창에 출력
    console.log('연결됨');
    
    id = socket.id;

    //Public 통신 이벤트 (모두에게 전송)
    socket.on('public_rint', function(data) {
        //클라이언트가 전송한 데이터 출력
        console.log('Client Send Data: ', data);

        //클라이언트에게 smart 이벤트 발생시킴
        io.sockets.emit('smart', data);
    });

    //Broadcast 통신 이벤트 (본인 제외 모두에게 전송)
    socket.on('broadcast_rint', function(data) {
        //클라이언트가 전송한 데이터 출력
        console.log('Client Send Data: ', data);

        //클라이언트에게 smart 이벤트 발생시킴
        socket.broadcast.emit('smart', data);
    });

    //Private 통신 이벤트 (특정 클라이언트에게 전송)
    socket.on('private_rint', function(data) {
        //클라이언트가 전송한 데이터 출력
        console.log('Client Send Data: ', data);

        //클라이언트에게 smart 이벤트 발생시킴
        io.to(id).emit('smart', data);
    });
});