//This file is for handling the routing of urls

var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');
var path = require('path');

var appDir = path.dirname(require.main.filename);

router.get('/', function(req, res) {
    res.sendFile(appDir+'/views/index.html');
});

//Api to fetch profile of a particular file
router.get('/profile/:id',function(req,res) {
    apiUrl = 'https://api.practo.com/doctors/'+req.params.id+'?with_relations=true';

    request.get({
        url : apiUrl,
        headers : {
            'X-CLIENT-ID' : config.clientId,
            'X-API-KEY' : config.token
        }
    },function(error,response,body){
        if(!error && response.statusCode == 200) {
            res.json(body);
        }
        else{
            console.log('error While fetching');
        }
    });
});

//Api to fetch doctors based on specialization and locality
router.get('/searchLocalitySpecility/:locality/:specialization/:offset',function(req,res){

    apiUrl = 'https://api.practo.com/search/?city='+req.params.locality+'&speciality='+req.params.specialization+'&offset='+req.params.offset;

    request.get({
        url : apiUrl,
        headers :{
            'X-CLIENT-ID' : config.clientId,
            'X-API-KEY' : config.token
        }
    },function(error,response,body){
  		if (!error && response.statusCode == 200) {
    		res.json(body);
  		}
  		else{
  			console.log('error While fetching');
  		}
    });
});

//Api to fetch doctors based only on locality
router.get('/searchLocality/:locality/:offset',function(req,res){

    apiUrl = 'https://api.practo.com/search/?city='+req.params.locality+'&offset='+req.params.offset;
    request.get({
        url : apiUrl,
        headers :{
            'X-CLIENT-ID' : config.clientId,
            'X-API-KEY' : config.token
        }
    },function(error,response,body){
        if (!error && response.statusCode == 200){
            res.json(body);
        }
        else{
            console.log('error While fetching');
        }
    });
});

module.exports = router;
