var express = require('express');
var router = express.Router();

/* maria require - 20221010_오영문 */
const maria = require('../database/connect/maria');

/* common-mapper */
const mybatisMapper = require('mybatis-mapper');
const e = require('express');
mybatisMapper.createMapper(['./database/mapper/common-mapper.xml']);


/* 로그인페이지 - auth/login (GET) */
router.get('/login', function(req, res){
    console.log('auth/login (GET) 호출됨');

    res.render('login', { title: '로그인', session: req.session});
});

/* 로그인처리 - auth/login_process (POST) */
router.post('/login_process', function(req, res){
    console.log('auth/login_process (POST) 호출됨');
    
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
            req.session.csNckNm = result[0].csNckNm; // 닉네임
            req.session.csNm = result[0].csNm;       // 고객명
            req.session.csId = result[0].csId;       // 고객ID
            req.session.emal = result[0].emal;       // 고객Email
            req.session.isLogined = true;            // 로그인여부

            req.session.save(function() {
                res.redirect('/');
            })
        } else {
            // 로그인 실패
            res.send('입력하신 정보와 일치하는 회원정보가 존재하지 않습니다.');
        }
      });
});

/* 로그아웃처리 - auth/logout (GET) */
router.get('/logout', function(req, res){
    console.log('auth/logout (GET) 호출됨');

    if(req.session.isLogined) {
        console.log('로그인상태 확인');
        
        req.session.destroy(function(err){
            console.log('session 삭제.. 로그아웃됨');
            res.redirect('/');
        });
    } else {
        console.log('로그인상태 아님');
        res.redirect('/auth/login');
    }
});

/* 회원가입페이지 - auth/signup (GET) */
router.get('/signup', function(req,res){
    console.log('auth/signup (GET) 호출됨');

    res.render('signup', {title: '회원가입', session: req.session});
});



module.exports = router;
