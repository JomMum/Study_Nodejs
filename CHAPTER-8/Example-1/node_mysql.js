//모듈 추출
const mysql = require('mysql');

//DB와 연결
let client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tlschs427',
    database: 'Company'
});

//DB 쿼리 사용
client.query('SELECT * FROM products', function(error, result, fields) {
    if(error) { console.log(error); }
    else { console.log(result); }
});