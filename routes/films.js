const helper = require('../helper');
const express = require('express');
const router = express.Router();
let films = require('../films');
const filmKeys = ['title', 'rating', 'year', 'budget', 'gross', 'poster', 'position'];

router.get('/readall', function(req, res) {
    films = films.sortByField('position', 1);
    res.send(JSON.stringify(films));
});

router.get('/read/:id', function(req, res) {
    let index = films.findIndex(i => i.id == req.params.id);
    let film;
    if(index !== -1){
        film = films[index];
    }
    res.send(JSON.stringify(film));
});

router.post('/create', function(req, res) {
    let newFilm;
    if(helper.checkParams(req.body, filmKeys)){
        newFilm = {"id": helper.randomId(), "title": req.body.title,"rating": req.body.rating, "year": req.body.year,
            "budget": req.body.budget, "gross": req.body.gross, "poster": req.body.poster, "position": req.body.position};
        films.rewritePosition(req.body.position, 1);
        films.push(newFilm);
        films.deleteSpace();
    }else{
        res.send(JSON.stringify({"error": "Fill all fields!"}));
    }
    res.send(JSON.stringify(newFilm));
});

router.post('/delete/:id', function(req, res) {
    let index = films.findIndex(i => i.id == req.params.id);
    if(index !== -1){
        films.rewritePosition(films[index].position, -1);
        films.splice(index, 1);
    }
    res.send(JSON.stringify(films));
});

router.post('/update/:id', function(req, res) {
    let index = films.findIndex(i => i.id == req.params.id);
    if(index!==-1){
        for(let keyP in req.body) {
            index = rewriteParams(keyP, index, req);
        }
        films.deleteSpace();
        index = films.findIndex(i => i.id == req.params.id);
    }
    res.send(JSON.stringify(films[index]));
});

function rewriteParams(keyP, index, req){
    if((keys.findIndex(key => key == keyP))!==-1){
        if(keyP==="position"){
            films.rewritePosition(req.body.position, 1);
            exChangePos(index, req);
            index = films.findIndex(i => i.id == req.params.id);
        }
        films[index][keyP] = req.body[keyP];
    }
    return index;
}

function exChangePos(index, req){
    let newIndex = films.findIndex(i => i.position == req.body.position);
    if(newIndex!==-1) {
        if (films[newIndex].position - films[index].position === 1) {
            films[newIndex].position = [films[index].position, films[index].position = films[newIndex].position][0];
        }
    }
}

module.exports = router;
