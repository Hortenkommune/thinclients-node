var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');

var indexRouter = require('./routes/index');
var groupRouter = require('./routes/group');
var thinclientRouter = require('./routes/thinclient');
var configRouter = require('./routes/config');
var thinstationHostsRouter = require('./routes/thinstation.hosts');
var thinstationCfgRouter = require('./routes/thinstation.conf.network');

var app = express();
mongoose.connect(process.env.MONGO_CONN_STRING, { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("connected to db");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
var hbs = require('hbs');
hbs.registerHelper("select", function(value, options) {
  return options.fn(this)
    .split('\n')
    .map(function(v) {
      var t = 'value="' + value + '"'
      return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
    })
    .join('\n')
})

app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'thinstation')));

app.use('/', indexRouter);
app.use('/group', groupRouter);
app.use('/thinclient', thinclientRouter);
app.use('/config', configRouter);
app.use('/thinstation.hosts', thinstationHostsRouter);
app.use('/./thinstation.hosts', thinstationHostsRouter);
app.use('/thinstation.conf.network', thinstationCfgRouter);
app.use('/./thinstation.conf.network', thinstationCfgRouter);

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
