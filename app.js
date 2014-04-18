/*global require, module, console, __dirname, process*/

var express = require('express');
var hbs = require('express-hbs');
var app = express();
var path = require('path');

app.engine('hbs', hbs.express3({
  partialsDir: __dirname + '/views'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES

app.get('/', function(req, res){
  res.render('index', {
    title: 'Firstpage',
    items: [1,2,3,4,5,6,7,8,9]
  });
});

app.get('/edit/:id', function(req, res) {
  res.render('edit', {
    title: 'Edit ' + req.params.id
  });
});


var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
  console.log("Listening  http://127.0.0.1:" + port);
});
