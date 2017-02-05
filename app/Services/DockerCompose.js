const fs = require('fs');

var DockerCompose = function (docker) {
    this.configDocker = docker;

    this.images = {
        "java" : "\sbuild: .",
        "java-ports" : null,
        "java-volumes" : null,
        "java-container_name" : null,
        "java-environment" : null,

        "node" : "",
        "node-ports" : null,
        "node-volumes" : null,
        "node-container_name" : null,
        "node-environment" : null,

        "php" : null,
        "php-ports" : null,
        "php-volumes" : null,
        "php-container_name" : null,
        "php-environment" : null,
        
        "postgres" : "azukiapp/postgres:9.4",
        "postgres-ports" : "5431:5432",
        "postgres-volumes" : "- ./aplication-service/postgres:/var/lib/postgresql/data",
        "postgres-container_name" : "sbx-postgresql",
        "postgres-environment" : null,

        "mysql" : "mysql:\n image: mysql:5.6\n",
        "mysql-ports" : "\sports: \n\s\s- 3307:3306\n",
        "mysql-volumes" : "\svolumes:\n\s\s- ./aplication-service/mysql:/var/lib/mysql\n",
        "mysql-container_name" : "\senvironment:\n\s\s MYSQL_USER: 'userDB'\n\s\s MYSQL_PASSWORD: 'passDB'\n\s\s MYSQL_ROOT_PASSWORD: 'passDB'",
        "mysql-environment" : null,

        "mongo" : "mongo:3.2",
        "mongo-ports" : "- 28018:28017",
        "mongo-volumes" : "- ./aplication-service/mongodb:/data/db",
        "mongo-container_name" : "sbx-mongodb",
        "mongo-environment" : null
    }

    this.gerarDockerCompose = function () {

        try {
            var stream = fs.createWriteStream('/var/opt/nois4/app/docker/docker-compose.yml', {autoClose: true});

            var dockerImagem = "";
            var image = (this.configDocker.nomeProjeto || "web").replace(/\s/,'-') + ":\n";

            for(var ps in this.configDocker.dependencias) {

                var tipo = this.configDocker.dependencias[ps];

                image += this.images[tipo] + '\n';

                if (this.images[tipo + '-ports'] != null) {
                    image += this.images[tipo + '-ports']  + '\n';
                }

                if (this.images[tipo + '-volumes'] != null) {
                    image += this.images[tipo + '-volumes']  + '\n';
                }

                if (this.images[tipo + '-container_name'] != null) {
                    image += this.images[tipo + '-container_name']  + '\n';
                }

                if (this.images[tipo + '-environment'] != null) {
                    image += this.images[tipo + '-environment']  + '\n';
                }


                dockerImagem += image;

                image = "";
            }

            stream.write(dockerImagem, function(status) {});

            return {'error' : false};
        } catch(err) {
            throw err;
        }

    }
}


module.exports = DockerCompose;