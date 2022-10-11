var express = require('express');
var router = express.Router();

/* maria require - 20221006_moon */
const maria = require('../database/connect/maria');

/* common-mapper */
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./database/mapper/common-mapper.xml']);

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);

  res.render('index', { title: '꼬북', session: req.session });
});



router.get('/select', function(req, res, next) {
  // SQL parameter
  var param = {
    csNo : '202210060001'
  };

  var format = {language: 'sql', indent: '  '};
  var query = mybatisMapper.getStatement('csInf', 'selectCsInf', param, format);

  maria.query(query, function(err, rows, fields) {
    if(!err) {
      console.log("succ");
      res.send(rows);
    } else {
      console.log("err : " + err);
    }
  });
});



module.exports = router;
