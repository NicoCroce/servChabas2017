var request = require("request");
var express = require('express');
var htmlparser = require("htmlparser2");

var app = express();

app.get('/', function (req, res) {
    request({
        uri: "http://www.chabas.gob.ar/ema/mb1.htm",
    }, function (error, response, body) {
        /* console.log(body); */
        /* res.send(body) */;

        var handler = new htmlparser.DomHandler(function (err, dom) {
            res.send(dom);
        })
        new htmlparser.Parser(handler).parseComplete(body)


    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});