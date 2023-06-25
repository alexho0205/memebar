var express = require('express');
var router = express.Router();

// route for /login or /login/
router.get('/', function (req, res) {
    res.render('login/login');
});

// route for /login/confirm
router.get('/confirm', function (req, res) {
    res.send('confirm');
});

// 驗證帳號密碼
router.post('/',function(req,res){
    // const { email, password } = req.body;

    console.log(req);

});


module.exports = router;