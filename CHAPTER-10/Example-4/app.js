//모듈 추출
const fs = require('fs');
const mysql = require('mysql');

//DB 연결
const client = mysql.createConnection({
    user: 'root',
    password: 'tlschs427',
    database: 'ChatDB'
});

//서버 생성
const server = require('http').createServer();
const io = require('socket.io')(server);

//서버 연결
server.listen(52273);

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
    //message 이벤트
    socket.on('message', function(data) {
        //DB 저장
        client.query('INSERT INTO chats (name, content, date) VALUES (?, ?, ?)',
                    [data.name, data.message, data.date]);

        //클라이언트의 message 이벤트 발생
        io.sockets.emit('message', data);
    });
});