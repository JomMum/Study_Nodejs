var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//DB 연결
var client = require('mysql').createConnection({
  user: 'root',
  password: 'tlschs427',
  database: 'Location'
});

var indexRouter = require('./routes/index');
const { response } = require('express');

//서버 생성
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

app.get('/Tracker', indexRouter);
app.get('/Observer', indexRouter);
// GET - /ShowData
app.get('/ShowData', function(req, res, next) {
  //DB 데이터 제공
  client.query('SELECT * FROM locations WHERE name = ?', [request.query.name], function() {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data));
  });
});

//서버 실행
server.listen(52273, function() {
  console.log('Server Running at http://127.0.0.1:52273');
});

//소켓 서버 생성 및 실행
io.sockets.on('connection', function(socket) {
  //join 이벤트
  socket.on('join', function(data) {
    socket.join(data); //전달받은 데이터의 방으로 접속
  });

  //location 이벤트
  socket.on('location', function(data) {
    //데이터 저장
    client.query('INSERT INTO locations(name, latitude, longitude, date) VALUES [?, ?, ?, NOW()]',
                  [data.name, data.latitude, data.longitude]);

    //recieve 이벤트 발생
    io.sockets.in(data.name).emit('receive', {
      latitude: data.latitude,
      longitude: data.longitude
    });
  });
});

module.exports = app;