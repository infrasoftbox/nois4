var path = require('path');
var fs = require('fs');
var sleep = require('sleep');
var exec = require("child_process").exec;

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

this.criaRepo = function(response, nomeProjeto, pastaProjeto) {
	exec('sh ../configuration/gitlab/criarepo.sh '+nomeProjeto, function (err, stdout, stderr) {
    if (err) handleError();

	    //Print stdout/stderr to console
	    var resposta = JSON.parse(stdout);
	    var urlGit = resposta.ssh_url_to_repo;
	    // faz clone e push da seed+dockerfile do projeto no repo
	    exec('sh ../configuration/gitlab/configurarepo.sh '+urlGit+" "+pastaProjeto, function (err, stdout, stderr) {
	    	if (err) handleError();
	    	console.log(stdout);
	    });

  	});
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