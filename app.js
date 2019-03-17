var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

const videoRouter = require('./routes/video');
const playlistRouter = require('./routes/playlist');

var app = express();

mongoose.connect('mongodb://localhost/videoplaylist', {
  useNewUrlParser: true
}, (error) => {
  if (error) {
    throw new Error('Error while connecting to database');
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/video', videoRouter);
app.use('/api/v1/playlist', playlistRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
console.log("error is as", err);
  // render the error page
  res.status(err.status || 500).send({message: err.message});
});

module.exports = app;
