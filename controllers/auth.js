var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

module.exports = router;
