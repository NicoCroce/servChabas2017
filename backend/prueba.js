var request = require("request");
var express = require('express');
var fs = require('fs');
var iconv = require('iconv-lite');
var requestOptions = { encoding: null, method: "GET", uri: "http://www.chabas.gob.ar/ema/mb1.htm" };

var app = express();

var stringToFind = {
    table: {
        start: '<table border="1" width="100%"',
        end: '</table>',
        tables: []
    },
    info: {
        start: '<font',
        end: '</font>',
        fonts: {}
    },
    blockInfo: {},
    valores: {
        temperatura: {},
        humedad: {},
        rocio: {},
        temperaturaViento: {},
        temperaturaHumedad: {},
        presion: {},
        viento: {},
        lluvia: {}
    }
};

app.get('/', function (req, res) {
    request(requestOptions, function (error, response, body) {
        /* console.log(body); */
        var utf8String = iconv.decode(new Buffer(body), "ISO-8859-1");
        fs.writeFile('comepleteHTML.html', utf8String);
        getIndexesOf(utf8String);
        res.send(utf8String);
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


function getIndexesOf(html) {
    var indexStart = html.indexOf(stringToFind.table.start);
    var indexEnd = html.indexOf(stringToFind.table.end, indexStart) + stringToFind.table.end.length;
    // Buscar todas las tablas, son las que contienen la info.
    var contMain = 0;
     while (indexStart >= 0) { 
        /* console.log('indexStart:  ' + indexStart + '   ' + 'indexEnd:  ' + indexEnd); */
        var string = html.substring(indexStart, indexEnd);
        stringToFind.table.tables.push(string.toString());
        indexStart = html.indexOf(stringToFind.table.start, indexStart + 1);
        indexEnd = html.indexOf(stringToFind.table.end, indexStart + 1) + stringToFind.table.end.length;
        
        //Buscar todos los fonts dentro de las tablas. 
        var indexStartFont = string.indexOf(stringToFind.info.start);
        var indexEndFont = string.indexOf(stringToFind.info.end, indexStartFont) + stringToFind.info.end.length;
         cont = 0; 
        var arrayFonts = {};
        while (indexStartFont >= 0) {
            /* console.log('indexStartFont:  ' + indexStartFont + '   ' + 'indexEndFont:  ' + indexEndFont); */
            var stringFont = string.substring(indexStartFont, indexEndFont);
            //Eliminar todos los datos de más. Dejar solo la info correcta.

            arrayFonts['valor'+cont] = clearText(stringFont);
            /* console.log('INDEX ' + cont + ' Valor:   ' + clearText(stringFont)); */
            indexStartFont = string.indexOf(stringToFind.info.start, indexStartFont + 1);
            indexEndFont = string.indexOf(stringToFind.info.end, indexStartFont + 1) + stringToFind.info.end.length;
             cont = cont+1; 
        };
        stringToFind.blockInfo["bloque" + contMain] = arrayFonts;
        contMain = contMain +1;
    };
    getValoresTemperatura();
    getValoresHumedad();
    getPuntoRocio();
    getTemperaturaViento();
    getTemperaturaHumedad();
    getPresion();
    getViento();
    getLluvia();
    fs.writeFile('dataFormated.json', JSON.stringify(stringToFind.valores));
    fs.writeFile('stringToFind.json', JSON.stringify(stringToFind.blockInfo));
};

function clearText(stringToClean) {
    var firstChar = stringToClean.indexOf('>') + 1;
    if(firstChar > 0) {
        var secondChar = stringToClean.indexOf('</font>', firstChar);
        return stringToClean.substring(firstChar, secondChar).replace(/\&nbsp /g, '').replace(/\&nbsp/g, '').replace(/;/g, '').trim();
    }
};

function getValoresTemperatura(){
    stringToFind.valores.temperatura = {
        actual: stringToFind.blockInfo["bloque0"].valor1,
        diaria: {
            min: stringToFind.blockInfo["bloque0"].valor5,
            max: stringToFind.blockInfo["bloque0"].valor6
        },
        hora: {
            min: stringToFind.blockInfo["bloque0"].valor8,
            max: stringToFind.blockInfo["bloque0"].valor9
        },
        mensual: {
            min: stringToFind.blockInfo["bloque0"].valor11,
            max: stringToFind.blockInfo["bloque0"].valor12
        },
        anual: {
            min: stringToFind.blockInfo["bloque0"].valor14,
            max: stringToFind.blockInfo["bloque0"].valor15
        }
    }
};

function getValoresHumedad() {
    stringToFind.valores.humedad = {
        actual: stringToFind.blockInfo["bloque1"].valor1,
        diaria: {
            min: stringToFind.blockInfo["bloque1"].valor5,
            max: stringToFind.blockInfo["bloque1"].valor6
        },
        hora: {
            min: stringToFind.blockInfo["bloque1"].valor8,
            max: stringToFind.blockInfo["bloque1"].valor9
        },
        mensual: {
            min: stringToFind.blockInfo["bloque1"].valor11,
            max: stringToFind.blockInfo["bloque1"].valor12
        },
        anual: {
            min: stringToFind.blockInfo["bloque1"].valor14,
            max: stringToFind.blockInfo["bloque1"].valor15
        }
    }
};

function getPuntoRocio() {
    stringToFind.valores.rocio = {
        actual: stringToFind.blockInfo["bloque2"].valor1
    }
};

function getTemperaturaViento() {
    stringToFind.valores.temperaturaViento = {
        actual: stringToFind.blockInfo["bloque3"].valor2
    }
};

function getTemperaturaHumedad() {
    stringToFind.valores.temperaturaHumedad = {
        actual: stringToFind.blockInfo["bloque4"].valor2
    }
};

function getPresion() {
    stringToFind.valores.presion = {
        actual: stringToFind.blockInfo["bloque5"].valor1
    }
};

function getViento() {
    stringToFind.valores.viento = {
        velocidad: stringToFind.blockInfo["bloque6"].valor2,
        delSector: stringToFind.blockInfo["bloque6"].valor4,
        diaria: {
            max: stringToFind.blockInfo["bloque6"].valor7
        },
        hora: {
            max: stringToFind.blockInfo["bloque6"].valor9
        },
        mensual: {
            max: stringToFind.blockInfo["bloque6"].valor11
        },
        anual: {
            max: stringToFind.blockInfo["bloque6"].valor13
        }
    }
};

function getLluvia() {
    stringToFind.valores.lluvia = {
        diaria: stringToFind.blockInfo["bloque7"].valor2,
        intensidad: stringToFind.blockInfo["bloque7"].valor4,
        mensual: stringToFind.blockInfo["bloque7"].valor6,
        anual: stringToFind.blockInfo["bloque7"].valor8
    }
};