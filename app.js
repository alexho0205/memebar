let express = require('express');
let engine = require('ejs-locals');
let app = express();
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'))

// use session
const session = require('express-session')
app.use(session({
  secret: '^0g8i19bk&ERlVAZl^6RJHO',
  resave: false,
  saveUninitialized: true
}))

// routes
let loginRouter = require('./routes/login')
app.use('/login',loginRouter);

app.get('/format1',function(req,res){
    res.render('format1', {'title': '',});
})

app.get('/format2',function(req,res){
  res.render('format2', {'title': '',});
})

app.get('/', function (req, res) {
    res.render('index', {'title': '首頁',});
})


let port = 3000;
app.listen(port);