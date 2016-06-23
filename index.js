var express = require('express');
var app = express();
var router = express.Router();
var config = require('./config/config');

app.use(express.static(__dirname + '/public/'));

// Add headers for CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8085');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(require('./controllers'));
app.listen(config.port);

