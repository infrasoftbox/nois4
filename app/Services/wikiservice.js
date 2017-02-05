var path = require('path');
var fs = require('fs');
var sleep = require('sleep');

ExportarZip = function() {

this.geraSeed = function(req, res, diretorio, nome) {
  var zip  = diretorio + "/" + nome;

		if(!this.existe(zip)) {	
			sleep.sleep(10);
			this.geraSeed(req, res, diretorio, nome);
		}

		console.log("aeeeee ta pronta !!!!");

        res.setHeader('Content-disposition', 'attachment; filename=' + nome);
        res.setHeader('Content-type', 'application/zip');
        res.download(zip, nome, function(data) {
        	//fs.unlinkSync(zip);
        });;      
}

this.existe = function(file) {
  try {
    fs.accessSync(file);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
}


module.exports = ExportarZip;