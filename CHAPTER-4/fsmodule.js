//모듈 추출
let fs = require('fs');

//동기 파일 읽기 (sync)
try {
    let text = fs.readFileSync('textfile.txt', 'utf8');
    console.log(text);
} catch(e) {
    console.log(e);
}

//비동기 파일 읽기
try {
    fs.readFile('textfile.txt', 'utf8', function (error, data) {
        if(error) {
            console.log(error);
        }
        else {
            console.log(data);
        }
    });
} catch(e) {
    console.log(e);
}


let textData = 'Hello World!'; //텍스트 파일에 쓸 문자열

//동기 파일 쓰기 (sync)
try {
    fs.writeFileSync('textfileWriteSync.txt', textData, 'utf8');
    console.log('WRITE FILE SYNC COMPLETE!');
} catch(e) {
    console.log(e);
}

//비동기 파일 쓰기
try {
    fs.writeFile('textfileWriteAsync.txt', textData, 'utf8', function(error) {
        if(error) {
            console.log(error);
        }
        else {
            console.log('WRITE FILE ASYNC COMPLETE!');
        }
    })
} catch(e) {
    console.log(e);
}