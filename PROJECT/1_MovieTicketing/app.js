//모듈 추출
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.js');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', indexRouter);

//변수 선언
let seats = [
  [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

// GET - /seats
app.get('/seats', function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(JSON.stringify(seats)); //좌석 출력
});

//웹 서버 실행
server.listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});

//소켓 서버 생성 및 실행
io.sockets.on('connection', function(socket) {
    //reserve 이벤트
    socket.on('reserve', function(data) {
        seats[data.y][data.x] = 2;        //해당 좌석 예매 완료
        io.sockets.emit('reserve', data); //모든 클라이언트에게 해당 이벤트 발생
    });
});

module.exports = app;