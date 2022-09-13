//모듈 추출
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var ejs = require('ejs');

var indexRouter = require('./routes/index');

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
app.use(express.static(path.join(__dirname, 'public'))); //public 폴더의 파일을 서버에 올림

//제품 추가 함수
let counter = 0;
function Product(name, image, price, count) {
  this.index = counter++;
  this.name = name;
  this.image = image;
  this.price = price;
  this.count = count;
}

//제품 선언
let products = [
  new Product('JavaScript', 'cat_1.jpeg', 28000, 30),
  new Product('jQuery', 'cat_2.jpeg', 28000, 30),
  new Product('Node.js', 'cat_3.jpeg', 32000, 30),
  new Product('Socket.io', 'cat_4.jpeg', 17000, 30),
  new Product('Connect', 'cat_5.jpeg', 18000, 30),
  new Product('Express', 'cat_6.jpeg', 31000, 30),
  new Product('EJS', 'cat_7.jpeg', 12000, 30)
];

let HTMLPage = fs.readFileSync(__dirname + '/routes/HTMLPage.html', 'utf8');
  
// GET - /
app.get('/', function(request, response) {
  //응답
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(ejs.render(HTMLPage, {
    products: products
  }));
});

//웹 서버 실행
server.listen(52273, function() {
  console.log('Server Running at http://127.0.0.1:52273');
});

//소켓 서버 생성 및 실행
io.sockets.on('connection', function(socket) {
  //함수 선언
  function onReturn(index) {
    products[index].count++;           //물건 개수 증가
    clearTimeout(cart[index].timerID); //타이머 제거
    delete cart[index];                //카트에서 물건 제거

    //count 이벤트 발생
    io.sockets.emit('count', {
      index: index,
      count: products[index].count
    });
  };

    //변수 선언
    let cart = {};

    //cart 이벤트
    socket.on('cart', function(index) {
      products[index].count--; //물건 개수 감소
  
      //카트에 물건을 넣은 뒤 타이머 실행
      cart[index] = {};
      cart[index].index = index;
      cart[index].timerID = setTimeout(function() {
        onReturn(index);
      }, 1000 * 60 * 10);
  
      //count 이벤트 발생
      io.sockets.emit('count', {
        index: index,
        count: products[index].count
      });
    });
  
    //buy 이벤트
    socket.on('buy', function(index) {
      clearTimeout(cart[index].timerID); //타이머 제거
      delete cart[index];                //카트에서 물건 제거
  
      //count 이벤트 발생
      io.sockets.emit('count', {
        index: index,
        count: products[index].count
      });
    });
  
    //return 이벤트
    socket.on('return', function(index) {
      onReturn(index);
    });
});

module.exports = app;