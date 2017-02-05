var exec = require('child_process').exec;

function FileProjeto () {
    this.gerarZip = function(nomeProjeto) {
        return new Promise((success, error) => {
            nomeProjeto = nomeProjeto || "";
            //Devolve o caminho da aplicação
            exec("pwd", function (error, stdout, stderr) {

                var diretorio = stdout.replace(/\n/g, '') + "";

                exec("zip -r docker-" + nomeProjeto + ".zip " + " docker/", function (error, stdout, stderr) { 
                    success({diretorio : diretorio, arquivo : "docker-" + nomeProjeto + ".zip"});
                });

            });
        });
    }
}

module.exports = FileProjeto;