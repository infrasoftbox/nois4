var Promise = require('promise');
var exec = require('child_process').exec;
var MyGit = require("nodegit");

var Git = function (optionsGit) {
    this.optionsGit = optionsGit;

    this.baixarRepositorio = function () {
        var _this = this;

        console.log('here')
        return new Promise((success, error) => {
            exec("pwd", function (error, stdout, stderr) {
                var diretorio = stdout.replace(/\n/g, '') + "";
                
                exec('sh ../configuration/gitlab/configurarepo.sh '+_this.optionsGit.repositorio+" " + diretorio + "/docker", function (err, stdout, stderr) {
                    if (err) handleError();
                    success();
                });

                // exec("configura " + _this.optionsGit.repositorio, function (error, stdout, stderr) {
                //     console.log(error, stdout, stderr);
                //     success();
                // })
            })
        })
    }
}

module.exports = Git;