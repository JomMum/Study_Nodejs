const EventEmitter = require('events');

//EventEmitter 객체 생성
const custom = new EventEmitter();

//이벤트 연결
custom.on('tick', function() {
    console.log('이벤트 실행');
});

//이벤트 강제 발생
custom.emit('tick');