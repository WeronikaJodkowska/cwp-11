const express = require('express');
const helper = require('../helper');
const router = express.Router();
const file = './logger.txt';

router.get('/log', function (req, res){
    fs.readFile(file, (err, data)=>{
        if(err) data = err;
        res.end(data.toString());
    });
});

router.all('*', function(req, res, next){
    fs.appendFile(file,`Url: ${req.baseUrl}\n${helper.dateFormater()} \n\n`, (err)=>{
        next();
    });
});

module.exports = router;