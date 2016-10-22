// Cody Molho and Sam Gilbert
// IOT Hackday 2016, Hacking Brainwaves

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/index', function(req, res) {
  console.log('GET index');
  res.sendFile(__dirname + '/www/index.html');
})

app.post('/dataStream', function (req, res) {
  console.log(req.query);
  res.send('post completed');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000');
});