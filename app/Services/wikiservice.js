var path = require('path');
var fs = require('fs');
var sleep = require('sleep');

module.exports = function(app){
    app.get('/gerarseed', function (req, res) {
      geraSeed(req, res);
	  });
}

function geraSeed(req, res) {
		console.log("vendo se a seed ta pronta...");
	 	var url = require('url');
        var url_parts = url.parse(req.url, true);

        console.log(url_parts.query);

		var zip = '/tmp/container/container.zip';
		var pronto = '/tmp/container/pronto.txt';

		if(!existe(pronto)) {	
			sleep.sleep(10);
			geraSeed(req, res);
		}
    
    res.setHeader('Content-disposition', 'attachment; filename=container.zip');
    res.setHeader('Content-type', 'application/zip');
    res.download(zip, 'container.zip', function(data) {
      fs.unlinkSync(zip);
      fs.unlinkSync(pronto);
    });;      
}

function existe(file) {
  try {
    fs.accessSync(file);
    return true;
  } catch (e) {
    return false;
  }
}
