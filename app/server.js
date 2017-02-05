'use strict';

const express = require('express');
var DockerCompose = require('./Services/DockerCompose.js');
var DockerFile = require('./Services/DockerFile.js');
var FileProjeto = require('./Services/FileProjeto.js');

var path = require('path');

// Constants
const PORT = 8080;

// App
const app = express();
// Serviços da WIKI
require('./Services/wikiservice')(app);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.get('/gerarDocker', function (req, res) {
  try {
    var dockerCompose = new DockerCompose({'nomeProjeto':'wikibox','dependencias' : ['java', 'mysql']});
    dockerCompose.gerarDockerCompose();
    
    var dockerFile = new DockerFile({'linguagem' : 'java', 'service':'widfly','dependencias' : ['vue', 'widfly']});
    
    dockerFile.gerarDocker().then(() => {
      var fileProjeto = new FileProjeto();
      return fileProjeto.gerarZip('wikibox');
    }).then((caminho) => {

    });

    
    // return res.send({error : false});

  } catch (err) {
    return res.send({error : err});
  }
  
})


app.listen(PORT);
console.log('Running on http://localhost:3030');