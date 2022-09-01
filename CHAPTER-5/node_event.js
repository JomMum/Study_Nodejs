// 똑같은 이벤트를 10개 넘게 연결할 경우 경고가 발생함
// 경고를 없애기 위해 개수 제한을 15개로 늘림
// * 0 입력 시 개수 제한 자체를 없앰
process.setMaxListeners(15);

// exit 이벤트 연결
process.on('exit', function() {
    console.log('EXIT!'); // 종료될 시 log 출력
});


// 변수 선언
let onUncaughtException = function() {
    console.log('예외 발생! (removeListener 사용)'); // log 출력

    // uncaughtException 이벤트 제거
    process.removeListener('uncaughtException', onUncaughtException);
};

// uncaughtException 이벤트 연결
process.on('uncaughtException', onUncaughtException); // 예외 발생 시 함수 실행

// uncaughtException 이벤트 연결 (한 번 실행되고 해당 이벤트 삭제됨)
process.once('uncaughtException', function(error) {
    console.log('예외 발생! (once 사용)'); // 예외 발생 시 log 출력
})


// 2초 후 예외 강제 발생
setInterval(function() {
    error.error.error(); //예외 발생
    process.exit(); //강제 종료
}, 2000);

// exit 이벤트 핸들러 강제 발생
// * 이벤트는 호출되지 않고 이벤트 핸들러만 호출됨
process.emit('exit');
process.emit('exit');
process.emit('exit');

console.log('프로그램 실행 중');