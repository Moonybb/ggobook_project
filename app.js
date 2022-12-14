var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* 20221010_오영문 : .env 설정 */
require('dotenv').config({ path: "config/env/.env.development.local"});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var vendorsRouter = require('./routes/vendors'); // 20221003_오영문 : vendors 라우터 추가
var authRouter = require('./routes/auth'); // 20221010_오영문 : auth 라우터 추가

var app = express();

/* mariaDB connect */
const maria = require('./database/connect/maria');
maria.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* node_modules static 폴더로 지정 : 20221017_오영문 */
app.use('./node_modules', express.static(path.join(__dirname+'/node_modules')));

/* session 설정 : 20221010_오영문 */
var session = require('express-session');
var mySqlStore = require('express-mysql-session')(session);
var options = {
    host: process.env.MARIA_HOST,
    port: process.env.MARIA_PORT,
    user: process.env.MARIA_USER,
    password: process.env.MARIA_PASSWORD,
    database: process.env.MARIA_DB
};
var sessionStore = new mySqlStore(options);

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* router */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vendors', vendorsRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
