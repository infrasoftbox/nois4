const fs = require('fs');
var exec = require('child_process').exec;

var DockerFile = function (docker) {
    this.configDocker = docker;
    
    this.commands = {
        "node-project" : "FROM node:boron",

        "java-project" : "FROM java:8",

        "create-aplication-service" : "RUN mkdir -p aplication-service",

        "install-widfly" : "RUN curl -SLO http://download.jboss.org/wildfly/10.1.0.Final/wildfly-10.1.0.Final.zip",
        "move-widfly" : "RUN mv wildfly* aplication-service/",
        "unzip-widfly" : "RUN unzip -o aplication-service/wildfly*",

        "install-jboss" : "RUN curl -SLO http://download.jboss.org/jbossas/7.1/jboss-as-7.1.1.Final/jboss-as-7.1.1.Final.zip",
        "move-jboss" : "RUN mv jboss* aplication-service/",
        "unzip-jboss" : "unzip -o aplication-service/jboss*",

        // "add-aplication-gitingore" : "echo aplication-service > .gitignore",

        // "install-vue" : "npm install -g vue-cli -- VueJS CLI \n npm install -g yarn phantomjs -- PhantomJS\n"
    };
    
    /***Gera o docker */
    this.gerarDocker = function () {
        console.log('aqui')
        try {
            var stream = fs.createWriteStream('/var/opt/nois4/app/docker/DockerFile', {autoClose: true});
            

            var docker = this.commands[this.configDocker.linguagem];

            if (this.configDocker.service != undefined) {
                docker += this.montarServe(this.configDocker.service);
            }
            
            for(var ps in this.configDocker.dependencias) {
                var tipo = this.configDocker.dependencias[ps];
                this.moveDependencia(tipo);
            }


            docker += this.commands['add-aplication-gitingore'];
            
            stream.write(docker, function(status) {});

            return {error : false}
        } catch (err) {
            throw err;
        }
         
    }

    this.montarServe = function (service) {
        if (this.commands['install-' + service] != undefined) {
            var commands = this.commands['install-' + service] + '\n';
            commands += this.commands['move-' + service] + '\n';
            commands += this.commands['move-' + service] + '\n';
            return commands;
        }

        return "";
    }

    this.moveDependencia = function (depencia) {
       
        //Devolve o caminho da aplicação
        exec("pwd", function (error, stdout, stderr) {

            var diretorio = stdout.replace(/\n/g, '') + "";

            exec("cp " + diretorio + "/Pacotes/" + depencia + ".zip " + diretorio + "/docker/", function (error, stdout, stderr) { 
                exec("unzip -o " + diretorio + "/docker/" + depencia + ".zip -d " + diretorio + "/docker/", function (errorz, stdoutz, stderrz) {
                    exec("rm -rf " + diretorio + "/docker/" + depencia + ".zip", function () {})
                })
            })

        });
    }
}

module.exports = DockerFile;