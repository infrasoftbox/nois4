'use strict';

const express = require('express');
var path = require('path');

// Constants
const PORT = 8080;

// App
const app = express();
// Serviços da WIKI
require('./Service/wikiservice')(app);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.listen(PORT);
console.log('Running on http://localhost:3030');

