let express = require('express');
let engine = require('ejs-locals');
let app = express();
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/format1',function(req,res){
    res.render('format1', {'title': '',});
})

app.get('/', function (req, res) {
    res.render('index', {'title': '首頁',});
})

let port = 3000;
app.listen(port);