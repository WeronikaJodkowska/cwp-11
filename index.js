const express = require('express');
const app = express();

const acrors = require('./routes/actors');
const films = require('./routes/films');
const api = require('./routes/api');
const images = require('./routes/images');
const validator = require('./validator');


const bodyParser = require('body-parser');
let setContType = function(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/*/((update)|(delete)|(read))', validator);
app.use('/api/films/*', setContType);
app.use('/api/actors/*', setContType);
app.use('*', api);
app.use('/api', api);
app.use('/api/actors', acrors);
app.use('/api/films', films);
app.use('/images/actors', images);


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});



