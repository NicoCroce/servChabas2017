var http = require("http");







var content = "";



var req = http.request(options, function (res) {

    res.setEncoding("utf8");

    res.on("data", function (chunk) {

        content += chunk;

    });



    res.on("end", function () {

        console.log(content);

    });

});



req.end();

