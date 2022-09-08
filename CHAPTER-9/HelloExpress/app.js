//모듈 추출
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { Server } = require('http');

//서버 생성
var app = module.exports = express();

// 미들웨어 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 페이지 라우트
// GET - /
app.use('/', indexRouter);

// GET - /users
app.use('/users', usersRouter);

// GET - /Product
app.get('/product', function(request, response) {
  response.render('product', {
    title: 'Product Page'
  });
});

app.get('/product/:id', function(request, response) {
  //문자열 생성
  let output = '';
  output += '<h1>id: ' + request.param('id') + '</h1>';
  output += '<h1>name: ' + request.param('name') + '</h1>';

  //페이지 출력
  response.end(output);
});

// GET - /Redirect
app.get('/redirect', function(request, response) {
  response.redirect('http://naver.com'); //페이지 강제 이동
  response.end();
});

// GET - /Cookie
app.get('/cookie', function(request, response) {
  //쿠키 생성
  response.cookie('name1', 'value1', {
    expires: new Date(Date.now() + 1000 * 60 * 10)
  });
  response.cookie('name2', 'value2', {
    maxAge: 1000 * 60 * 10
  });

  //응답
  response.writeHead(300, { 'Content-Type': 'text/html' });
  response.end('<h1>' + JSON.stringify(request.cookies) + '</h1>');
});

// GET - /OnlyChrome
app.get('/OnlyChrome', function(request, response) {
  //User-Agent 속성 추출
  let agent = request.header('User-Agent');

  //브라우저 구분
  if(agent.toLowerCase().match(/chrome/)) {
    //페이지 출력
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<h1>Welcome Chrome!</h1>');
  }
  else {
      //페이지 출력
      response.redirect('/');
  }
});


// 그 외 페이지는 404 에러
app.use(function(req, res, next) {
  next(createError(404));
});

// 에러 핸들러
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = app.listen(3000, function() {
  console.log("Express server listening on port %d", server.address().port);
});