var express = require('express');
const { response, request } = require('../app');
var router = express.Router();

var authData = {
    id: 'moony',
    password: '111111',
    nickname: 'moony'
}

/* 로그인페이지 */
router.get('/login', function(req, res){
    var title = 'Login';
    // var list = template.list(req.list);
    
    res.render('login', { title: '꼬북' });
});

/* 로그인처리 */
router.post('/login_process', function(req, res){
    var post = req.body;
    var id = post.id;
    var password = post.pwd;
    
    if(id === authData.id && password === authData.password) {
        res.send('Welcome!');
    } else {
        res.send('Who?');
    }
});

module.exports = router;
