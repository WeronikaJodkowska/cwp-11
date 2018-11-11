const express = require('express');
const router = express.Router();

router.all('*', function(req, res, next){
    if( req.params.id === undefined){
        res.end(JSON.stringify({error: "No id"}));
    }else{
        next();
    }
});

module.exports = router;