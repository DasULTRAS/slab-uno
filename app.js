var express = require('express');

var app = express();
var server = app.listen(8080);

app.use(express.static('public'));

console.log('Server is running on Port 8080.');