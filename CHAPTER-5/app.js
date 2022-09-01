//모듈 추출
let rint = require('./rint');

//이벤트 연결
rint.timer.on('tick', function() {
    console.log('이벤트 실행!');
});