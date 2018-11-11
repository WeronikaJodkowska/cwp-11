const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/:img', function (req, res, next){
    let img = 'noPhoto.jpg';
    fs.access(`./routes/images/${req.params.img}`, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (!err) img = req.params.img;
        res.sendFile(img, {root: './routes/images/'}, function (err) {
            if (err) {
                next(err);
            }
        });
    });
});

module.exports = router;