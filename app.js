var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// comentario
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site

var app = express();

//import the mongoose module
let mongoose = require("mongoose");

//set up default mongoose connection

//local mongodb server
//let mongoDB ="mongodb://127.0.0.1/my_database";//local mongodb server


//mongodb atlas server coud mongo db
let dev_db_url ="mongodb+srv://david:Nissan2021@cluster0-mbrlq.mongodb.net/local_library?retryWrites=true&w=majority";
let mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB,{useNewUrlParser: true});

//get the default connection
let db= mongoose.connection;

//bind connection to error event (to get notification of connection errors)

db.on("error",console.error.bind(console,"MongoDB connection error: "));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

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
