const cors = require('cors')
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
app.use(cors({
  origin: 'https://eden.mvu.pl',
}));
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
