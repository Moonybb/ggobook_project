var express = require('express');
const { response, request } = require('../app');
var router = express.Router();

/* maria require - 20221010_오영문 */
const maria = require('../database/connect/maria');

/* common-mapper */
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./database/mapper/common-mapper.xml']);


/* 로그인페이지 */
router.get('/login', function(req, res){
    var title = 'Login';
    res.render('login', { title: '꼬북' });
});

/* 로그인처리 */
router.post('/login_process', function(req, res){
    var post = req.body;

    console.log(post);

    var loginParam = {
        csId : post.id,
        csPwd : post.pwd
    };

    var format = {language: 'sql', indent: '  '};
    var query = mybatisMapper.getStatement('csInf', 'selectLoginInfByCsId', loginParam, format);

    maria.query(query, function(err, result, fields) {
        if(err) throw err
        if(result[0] !== undefined) {
            /* session 정보 저장 */
            req.session.uid = result[0].id;
            req.session.author_id = result[0].author_id;
            req.session.isLogined = true;

            req.session.save(function() {
                res.redirect('/');
            })
        } else {
            // 로그인 실패
            res.send('입력하신 정보와 일치하는 회원정보가 존재하지 않습니다.');
            
        }
      });
});

module.exports = router;
