var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileupload = require("express-fileupload")
const { createClient } = require('redis')
const connectRedis = require('connect-redis')
const redisClient = createClient({legacyMode: true})
// var configSession = require("./config/session")

var flash = require("express-flash");
var session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/adminRouter');
var categoryRouter = require('./routes/category');
var bookRouter = require('./routes/book');
//var userRouter = require('./routes/user');
var issueBookRouter = require('./routes/issuebook');
var returnBookRouter = require('./routes/returnbook');
var settingsRouter = require('./routes/settings');
var productRouter = require("./routes/productRouter")
var sectionRouter = require("./routes/sectionRouter")
var userRouter = require("./routes/userRouter")
var eventIssueRouter = require("./routes/eventRouter")
var clientRouter = require("./routes/clientRouter")
var loginRouter = require("./routes/loginRouter")

const RedisStore = connectRedis(session)
redisClient.connect().catch(e => console.log('Não conectado', e))

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  store: new RedisStore({ client: redisClient}),
  secret: process.env.SESSEION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 1000 * 60 * 60
  }
}))

app.use(flash());
app.use(fileupload({
  createParentPath: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// addin assets for admin routes <- criada por mim
app.use("/admin",express.static(path.join(__dirname, 'public')));
app.use("/admin/:any",express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', adminRouter);
app.use('/', categoryRouter);
app.use('/', bookRouter);
app.use('/', issueBookRouter);
app.use('/', returnBookRouter);
app.use('/', settingsRouter);
app.use('/', productRouter);
app.use('/', userRouter);
app.use('/', sectionRouter);
app.use('/', eventIssueRouter);
app.use('/', clientRouter);
app.use('/', loginRouter);

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
