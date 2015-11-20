var express = require('express');
var app = express();

var codes = [
    200,
    307,
    500,
    502,
    503,
    504,
    555
];

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomCode() {
    return codes[randInt(0, codes.length-1)];
}

var body = require('./lib/ipsum');
var errorPage = require('./lib/error-page');

function respond (req, res, code) {
    switch(code) {
        case 200:
            res.header('Content-Type', 'text/html');
            res.status(code).send(body());
            break;

        case 307:
            res.header('Location', '/200');
            res.status(code).end();
            break;

        // http timeout, never return a response
        case 555:
            break;

        default:
            res.header('Content-Type', 'text/html');

            if(codes.indexOf(code) === -1) {
                code = 404;
            }

            res.status(code).send(errorPage(code));
    }
}

app.get('/', function (req, res) {
    respond(req, res, randomCode());
});

app.get('/:code([0-9]{3}$)/', function(req, res) {
    respond(req, res, parseInt(req.params.code, 10));
});

app.get('/style.css', function (req, res) {
    res.sendFile(__dirname + '/style.css');
});

var server = app.listen(7777, function () {
    var port = server.address().port;
    console.log('listening on :%s', port);
});
