//모듈 추출
const connect = require('connect');

let server = connect.createServer(connect.router(function(app) {
    //GET - /Home/Index
    app.get('/Home/Index', function(request, response, next) {
        //응답
        response.writeHead(200, { 'Content-Type': 'text/html'});
        response.write('<h1>Index Page</h1>');
        response.end();
    });

    //GET - /Product/:id
    app.get('/Product/:id', function(request, response, next) {
        //응답
        response.writeHead(200, { 'Content-Type': 'text/html'});
        response.write('<h1>Product Page - ' + request.params.id + '</h1>');
        response.end();
    });

    //ALL - *
    app.all('*', function(request, response, next) {
        throw new Error('Page Not Found');
    }), connect.errorHandler({
        stack: true,
        message: true,
        dump: true
    });
})).listen(52273, function () {
    console.log('Server Running at http://127.0.0.1:52273');
});