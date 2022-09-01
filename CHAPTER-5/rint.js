const EventEmitter = require('events');

//EventEmitter 객체 생성
exports.timer = new EventEmitter();

//1초 후 이벤트 강제 발생
setInterval(function() {
    exports.timer.emit('tick');
}, 1000);