var express = require('express');
var router = express.Router();

/* maria require - 20221010_오영문 */
const maria = require('../database/connect/maria');

/* common-mapper */
const mybatisMapper = require('mybatis-mapper');
const e = require('express');
mybatisMapper.createMapper(['./database/mapper/common-mapper.xml']);

/* --------------------------------------------------------
 * 로그인페이지 - auth/login (GET)
 * -------------------------------------------------------- */
router.get('/login', function(req, res){
    console.log('auth/login (GET) 호출됨');

    res.render('login', { title: '로그인'
                        , session: req.session});
});

/* --------------------------------------------------------
 * 로그인처리 - auth/login_process (POST)
 * -------------------------------------------------------- */
router.post('/login_process', function(req, res){
    console.log('auth/login_process (POST) 호출됨');

    var post = req.body;
    console.log(post);

    var output = {};

    var loginDBParam = {
        csId : post.id,
        csPwd : post.pwd
    };

    var format = {language: 'sql', indent: '  '};
    var query = mybatisMapper.getStatement('csInf', 'selectLoginInfByCsId', loginDBParam, format);

    maria.query(query, function(err, result, fields) {
        if(err) throw err
        if(result[0] !== undefined) {
            
            /* 로그인 성공 */
            /* session 정보 저장 */
            req.session.csNckNm = result[0].csNckNm; // 닉네임
            req.session.csNm = result[0].csNm;       // 고객명
            req.session.csId = result[0].csId;       // 고객ID
            req.session.emal = result[0].emal;       // 고객Email
            req.session.isLogined = true;            // 로그인여부

            req.session.save(function() {
                
                output = {
                    succYn  : "Y",
                    session : req.session
                };
                res.json(output);
            })
        } else {
            /* 로그인 실패 */
            output = {
                succYn  : "N",
                session : req.session
            };
            res.json(output);
        }
      });
});

/* --------------------------------------------------------
 * 로그아웃처리 - auth/logout (GET)
 * -------------------------------------------------------- */
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

/* --------------------------------------------------------
 * 회원가입페이지 - auth/signup (GET)
 * -------------------------------------------------------- */
router.get('/signup', function(req, res){
    console.log('auth/signup (GET) 호출됨');

    res.render('signup', {title: '회원가입', session: req.session});
});

/* --------------------------------------------------------
 * 아이디 중복체크 - auth/signup/id_confirm (POST)
 * -------------------------------------------------------- */
router.post('/signup/id_confirm', function(req, res){
    console.log("auth/signup/id_confirm (POST) 호출됨");

    var inputId = req.body.id;
    console.log("id_confirm - inputId : " + inputId);

    var db_param = {csId : inputId};

    var format = {language: 'sql', indent: '  '};
    var query = mybatisMapper.getStatement('csInf', 'selectCsIdConfirm', db_param, format);

    var output = {};

    maria.query(query, function(err, result, fields) {
        if(err) throw err
        if(result[0].cnt == 0) {
            console.log("사용가능한 아이디입니다.");
            output = {
                succYn : 'Y',
                cnt : result[0].cnt
            };

        } else {
            console.log("이미 존재하는 아이디입니다.");
            output = {
                succYn : 'N',
                cnt : result[0].cnt
            };
        }

        res.json(output);
    });
});

/* --------------------------------------------------------
 * 회원가입처리 - auth/signup_process (POST)
 * -------------------------------------------------------- */
router.post('/signup_process', function(req, res){
    console.log("auth/signup_process (POST) 호출됨");

    var inputJSON = req.body;
    var output = {};

    

    
    res.json(output);

});



module.exports = router;
