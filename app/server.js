'use strict';

const express = require('express');
var DockerCompose = require('./Services/DockerCompose.js');
var DockerFile = require('./Services/DockerFile.js');
var FileProjeto = require('./Services/FileProjeto.js');

// Constants
const PORT = 8080;

// App
const app = express();
// Serviços da WIKI
require('./Service/wikiservice')(app);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.get('/gerarDocker', function (req, res) {
  try {
    var dockerCompose = new DockerCompose({'nomeProjeto':'wikibox','dependencias' : ['java', 'mysql']});
    dockerCompose.gerarDockerCompose();
    
    var dockerFile = new DockerFile({'linguagem' : 'java', 'service':'widfly','dependencias' : ['vue']});
    dockerFile.gerarDocker();

    ziparProjeto
  
    return res.send({error : false});

  } catch (err) {
    return res.send({error : err});
  }
  
})


app.listen(PORT);
console.log('Running on http://localhost:3030');

