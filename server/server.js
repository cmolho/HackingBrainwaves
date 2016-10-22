// Cody Molho and Sam Gilbert
// IOT Hackday 2016, Hacking Brainwaves

var express = require('express');
var app = express();

var recording = false;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/index', function(req, res) {
  console.log('GET /index');
  res.sendFile(__dirname + '/www/index.html');
})

app.post('/toggleRecording', function(req, res) {
  recording = !recording;
  res.send("Recording set to " + recording);
})

app.post('/dataStream', function (req, res) {
  console.log(req.query);
  if (recording) {
  	console.log("Recording data");
  }
  res.send('post completed');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000');
});