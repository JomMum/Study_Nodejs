//모듈 추출
const fs = require('fs');
const connect = require('connect');
const mysql = require('mysql');
const ejs = require('ejs');

//DB 연결
let client = mysql.createConnection({
    user: 'root',
    password: 'tlschs427',
    database: 'Company'
});

//서버 생성
connect.createServer(connect.bodyParser(), connect.router(function(app) {
    //GET - /List
    app.get('/', function(request, response) {
        fs.readFile('List.html', 'utf8', function(error, data) {
            //DB 쿼리 실행
            client.query('SELECT * FROM products', function(error, result) {
                //응답
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(ejs.render(data, {
                    data: result
                }));
            });
        });
    });

    //GET - /DELETE/:id
    app.get('/Delete/:id', function(request, response) {
        //DB 쿼리 실행
        client.query('DELETE FROM products WHERE id = ?', [request.params.id]);
        
        //응답
        response.writeHead(302, {'Location': '/'});
        response.end();
    });

    //GET - /INSERT
    app.get('/Insert', function(request, response) {
        //Insert.html 읽기
        fs.readFile('Insert.html', 'utf8', function(error, data) {
            //응답
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    });

    //POST - /INSERT
    app.post('/Insert', function(request, response) {
        //변수 선언
        let body = request.body;

        //DB 쿼리 실행
        client.query('INSERT INTO products (name, modelnumber, series) VALUES (?, ?, ?)', 
                    [body.name, body.modelnumber, body.series]);

        //응답
        response.writeHead(302, {'Location': '/'});
        response.end();
    });

    //GET - /EDIT/:id
    app.get('/Edit/:id', function(request, response) {
        //Edit.html 읽기
        fs.readFile('Edit.html', 'utf8', function(error, data) {
            //DB 쿼리 실행
            client.query('SELECT * FROM products WHERE id = ?', [request.params.id],
                function(error, result) {
                    //응답
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.end(ejs.render(data, {
                        data: result[0]
                }));
            });
        });
    });

    //POST - /EDIT
    app.post('/Edit/:id', function(request, response) {
        //변수 선언
        let body = request.body;

        //DB 쿼리 실행
        client.query('UPDATE products SET name=?, modelnumber=?, series=? WHERE id = ?',
                    [body.name, body.modelnumber, body.series, request.params.id]);

        //응답
        response.writeHead(302, {'Location': '/'});
        response.end();
    });
})).listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});