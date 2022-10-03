var express = require('express');
var router = express.Router();
var path = require('path'); 

router.use('/bootstrap', express.static(path.join(__dirname,"../node_modules/bootstrap/dist")));
// router.use('/js',express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
// router.use('/css',express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
router.use('/jquery', express.static(path.join(__dirname,"../node_modules/jquery/dist")));

module.exports = router;