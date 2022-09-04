//모듈 추출
const mysql = require('mysql');

//DB와 연결
let client = mysql.createConnection({
    user: 'root',
    password: '1234'
});

//DB 쿼리 사용
client.query('USE Company');
client.query('SELECT * FROM products', function(error, result, fields) {
    if(error) { console.log('쿼리 문장에 오류가 있습니다.'); }
    else { console.log(result); }
});