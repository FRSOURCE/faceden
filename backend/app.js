let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 's148.cyber-folks.pl',
  user: 'goethe_eden-faceden',
  password: '#-k^g%IaoK-AS5q2',
  database: 'goethe_eden-faceden'
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const questionsRouter = require('./routes/questions');
const indexRouter = require('./routes/index');

var app = express();

let basePath = process.env.IS_PROD ? '/api-faceden' : ''

if (basePath) app.set('base', basePath);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(basePath + '/questions', questionsRouter);
app.use(basePath + '/', indexRouter);

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
