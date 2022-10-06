var express = require('express');
var router = express.Router();

/* maria require - 20221006_moon */
const maria = require('../database/connect/maria');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '꼬북' });
});

router.get('/select', function(req, res, next) {
  maria.query('select * from tm_cs', function(err, rows, fields) {
    if(!err) {
      console.log("succ");
      res.send(rows);
    } else {
      console.log("err : " + err);
    }
  });
});

module.exports = router;
