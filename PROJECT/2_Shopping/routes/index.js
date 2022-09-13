var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  let HTMLPage = fs.readFileSync(__dirname + '/HTMLPage.html', 'utf8');

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(ejs.render(HTMLPage, {
    products: products
  }));
});

module.exports = router;