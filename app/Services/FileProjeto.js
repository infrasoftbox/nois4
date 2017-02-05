var exec = require('child_process').exec;

function FileProjeto () {
    this.gerarZip = function(arquivo) {
        //Devolve o caminho da aplicação
        exec("pwd", function (error, stdout, stderr) {

            var diretorio = stdout.replace(/\n/g, '') + "";

            exec("zip -r " + diretorio + "/Pacotes/" + depencia + ".zip " + diretorio + "/docker/", function (error, stdout, stderr) { 
                exec("unzip -o " + diretorio + "/docker/" + depencia + ".zip -d " + diretorio + "/docker/", function (errorz, stdoutz, stderrz) {
                    exec("rm -rf " + diretorio + "/docker/" + depencia + ".zip", function () {})
                })
            })

        });
    }
}

module.exports = FileProjeto;