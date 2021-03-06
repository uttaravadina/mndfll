require('dotenv').config();
var bodyParser = require('body-parser');
var rowdy = require('rowdy-logger');
var dotenv = require('dotenv');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var passport = require('./config/passportConfig');
var session = require('express-session');
var moment = require('moment');
var momentTimezone = require('moment-timezone');
var db = require("./models");
var table = require('cli-table');
var colors = require('colors');
var request = require('request');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(__dirname + '/public/'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

app.use(function(req,res,next){
  res.locals.moment = moment;
  next();
});

app.get('/', function(req, res){
  res.render('home');
});

app.get('/about', function(req, res){
  res.render('about');
});

app.use('/auth', require('./controllers/auth'));
app.use('/journal', require('./controllers/journal'));


var server = app.listen(process.env.PORT || 3000, function() {
    console.log('////********** mndf.ll **********\\\\\\\\\\'.bgWhite.black);
    console.log('* an enlightening daily journaling app  *'.bgWhite.black);
    console.log('\\\\**** Sean Swanson || WDISEA-16****//'.bgWhite.black);
});
