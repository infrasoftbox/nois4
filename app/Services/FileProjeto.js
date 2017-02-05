var exec = require('child_process').exec;

function FileProjeto () {
    this.gerarZip = function(nomeProjeto) {
        return new Promise((success, error) => {
            nomeProjeto = nomeProjeto || "";
            //Devolve o caminho da aplicação
            exec("pwd", function (error, stdout, stderr) {

                var diretorio = stdout.replace(/\n/g, '') + "";

                exec("zip -r " + diretorio + "/docker-" + nomeProjeto + ".zip " + diretorio + "/docker/", function (error, stdout, stderr) { 
                    success(diretorio + "/docker-" + nomeProjeto + ".zip ");
                    // exec("unzip -o " + diretorio + "/docker/" + depencia + ".zip -d " + diretorio + "/docker/", function (errorz, stdoutz, stderrz) {
                    //     exec("rm -rf " + diretorio + "/docker/" + depencia + ".zip", function () {})
                    // })
                })

            });
        });
    }
}

module.exports = FileProjeto;