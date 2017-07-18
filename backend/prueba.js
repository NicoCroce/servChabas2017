var request = require("request");
var express = require('express');
var htmlparser = require("htmlparser2");
var fs = require('fs');
var iconv = require('iconv-lite');
var requestOptions = { encoding: null, method: "GET", uri: "http://www.chabas.gob.ar/ema/mb1.htm" };

var app = express();

app.get('/', function (req, res) {
    request(requestOptions, function (error, response, body) {
        /* console.log(body); */
        var utf8String = iconv.decode(new Buffer(body), "ISO-8859-1");
        var stringToFind = {
            table: {
                start: '<table border="1" width="100%"',
                end: '</table>',
                tables: []
            }
        };
        fs.writeFile('comepleteHTML.html', utf8String);
        getIndexesOf(stringToFind, utf8String);
        res.send(utf8String);
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


function getIndexesOf(stringToFind, html) {
    var indexStart = html.indexOf(stringToFind.table.start);
    var indexEnd = html.indexOf(stringToFind.table.end, indexStart) + stringToFind.table.end.length;

    while (indexStart >= 0) {
        console.log('indexStart:  ' + indexStart + '   ' + 'indexEnd:  ' + indexEnd);
        var string = html.substring(indexStart, indexEnd);
        stringToFind.table.tables.push(string.toString());
        indexStart = html.indexOf(stringToFind.table.start, indexStart + 1);
        indexEnd = html.indexOf(stringToFind.table.end, indexStart + 1) + stringToFind.table.end.length;
    };
    fs.writeFile('stringToFind.html', stringToFind.table.tables);
}