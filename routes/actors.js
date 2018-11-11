const helper = require('../helper');
const express = require('express');
let router = express.Router();
let actors = require('../actors');
const actorKeys = ['name', 'birth', 'films', 'liked', 'photo'];


router.get('/readall', function(req, res) {
    actors = actors.sortByField('liked', -1);
    res.send(JSON.stringify(actors));
});

router.get('/read/:id', function(req, res) {
    let index = actors.findIndex(i => i.id == req.params.id);
    let actor = actors[index] || {"error": "No such actor"};
    res.send(JSON.stringify(actor));
});


router.post('/create', function(req, res) {
    let newActor;
    if(helper.checkParams(req.body, actorKeys)){
        newActor = {"id": helper.randomId(), "name": req.body.name,"birth": req.body.birth, "films": req.body.films,
            "liked": req.body.liked, "photo": req.body.photo};
        actors.push(newActor);
    }else{
        newActor = {"error": "Fill all fields!"};
    }
    res.send(JSON.stringify(newActor));
});

router.post('/delete/:id', function(req, res) {
    let index = actors.findIndex(i => i.id == req.params.id);
    if(index !== -1){
        actors.splice(index, 1);
    }
    res.send(JSON.stringify(actors));
});

router.post('/update/:id', function(req, res) {
    let index = actors.findIndex(i => i.id == req.params.id);
    if(index!==-1){
        for(let keyP in req.body) {
            if ((keys.findIndex(key => key == keyP)) !== -1) {
                if (keyP === "position") actors[index] = req.body[keyP];
            }
        }
    }
    res.send(JSON.stringify(actors[index]));
});

module.exports = router;