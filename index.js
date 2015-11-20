var express = require('express');
var app = express();

var codes = [
    200,
    200,
    200,
    301,
    500,
    502,
    503,
    504
];

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomCode() {
    return codes[randInt(0, codes.length-1)];
}

var body = require('./lib/ipsum');

app.get('/', function (req, res) {
  var code = randomCode();
  if (code === 200) {
    res.header('Content-Type', 'text/html');
    res.send(body());
  } else if (code === 301) {
    res.redirect('/success');
  } else {
    res.status(code).end();
  }
});

app.get('/success', function (req, res) {
  res.header('Content-Type', 'text/html');
  res.send(body());
});

app.get('/style.css', function (req, res) {
  res.sendFile(__dirname + '/style.css');
});

var server = app.listen(7777, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});