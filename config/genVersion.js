var fs = require('fs');

function genVersion() {

	var a = new Date();
	var b = a.getFullYear();
	var c = a.getMonth();
	(++c < 10) ? c = "0" + c : c;
	var d = a.getDate();
	(d < 10) ? d = "0" + d : d;
	var seconds = a.getSeconds();

	var e = a.toTimeString().split(':');
	var f = e[0] + e[1];

	var final = b + "" + c + "" +  d + "." + f + "-" + seconds; 

	return final;
} 

function writeFile(done) {
	String.prototype.replaceAll = function (target, replacement) {
  		return this.split(target).join(replacement);
	};

		var content = '';
	
		var version = genVersion();
	
		content  = "var versionFront = '" + version + "'; \n";
	
		var stream = fs.createWriteStream("./config/versionFront.js");
	
		stream.once('open', function (fd) {
		  stream.write(content);
		  stream.end();
		});
	
		fs.readFile('./assets/app/index.html', 'utf8', function (err, data) {
			if (err) {
				return console.log(err);
			}
			var oldVersion = getValue(data);
			var stream1 = fs.createWriteStream("./assets/app/index.html");
			stream1.once('open', function (fd) {
				stream1.write( (data + '').replaceAll(oldVersion, version) );
				stream1.end();
			});
			console.log("Old version: " + oldVersion);
			console.log("New version: " + version);
		});

		function getValue(dataHtml) {
			var indexSatring = dataHtml.indexOf("ts=");
			var tsString = dataHtml.substring(indexSatring, indexSatring + 100);
			return tsString.substring(0, tsString.indexOf('"')).replace('ts=', '');
		}

	return done();

}


exports.version = writeFile;