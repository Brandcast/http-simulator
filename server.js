var express = require('express');
var app = express();

var codes = [
    200,
    301,
    500,
    502,
    503,
    504,
    -1
];

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomCode() {
    return codes[randInt(0, codes.length-1)];
}

var body = require('./lib/ipsum');
var errorPage = require('./lib/error-page');

app.get('/', function (req, res) {
    var code = randomCode();

    switch(code) {
        case 200:
            res.header('Content-Type', 'text/html');
            res.status(code).send(body());
            break;

        case 301:
            res.header('Location', '/200');
            res.status(code).end();
            break;

        // http timeout, never returns a response
        case -1:
            break;

        default:
            res.header('Content-Type', 'text/html');
            res.status(code).send(errorPage(code));
    }
});

app.get('/200', function(req, res) {
    res.header('Content-Type', 'text/html');
    res.status(200).send(body());
});

app.get('/style.css', function (req, res) {
    res.sendFile(__dirname + '/style.css');
});

var server = app.listen(7777, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening on :%s', port);
});
