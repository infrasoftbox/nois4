const fs = require('fs');
var exec = require('child_process').exec;
var Promise = require('promise');

var DockerFile = function (docker) {
    this.configDocker = docker;
    
    this.commands = {
        "node-project" : "FROM node:boron",

        "java-project" : "FROM java:8",
        "java-script-run" : "",

        "create-aplication-service" : "RUN mkdir -p aplication-service",

        // "add-aplication-gitingore" : "echo aplication-service > .gitignore",

        // "install-vue" : "npm install -g vue-cli -- VueJS CLI \n npm install -g yarn phantomjs -- PhantomJS\n"
    };
    
    /***Gera o docker */
    this.gerarDocker = function () {
        var _this = this;

        return new Promise((success, error) => {
            
            try {
                var stream = fs.createWriteStream('/var/opt/nois4/app/docker/Dockerfile', {autoClose: true});
                
                var docker = _this.commands[_this.configDocker.linguagem + '-project'];
                
                function buscaRecursiva(ps) {
                    if (_this.configDocker.dependencias[ps] == undefined) {
               
                        stream.write(docker, function(status) {});

                        success({error : false});

                        return;
                    }

                    var tipo = _this.configDocker.dependencias[ps];

                    _this.moveDependencia(tipo).then(() => {
                        ps++;
                        buscaRecursiva(ps);
                    });
                }

                buscaRecursiva(0);                
            } catch (err) {
                error(err);
            }
        })
        
         
    }

    this.moveDependencia = function (depencia) {
       return new Promise((success, error) => {
        //Devolve o caminho da aplicação
        exec("pwd", function (error, stdout, stderr) {

            var diretorio = stdout.replace(/\n/g, '') + "";

            exec("cp " + diretorio + "/Pacotes/" + depencia + ".zip " + diretorio + "/docker/", function (error, stdout, stderr) { 
                exec("unzip -o " + diretorio + "/docker/" + depencia + ".zip -d " + diretorio + "/docker/", function (errorz, stdoutz, stderrz) {
                    exec("rm -rf " + diretorio + "/docker/" + depencia + ".zip", function () {
                        success();
                    })
                })
            })

        });

       })
    }
}

module.exports = DockerFile;