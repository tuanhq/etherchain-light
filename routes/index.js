var express = require('express');
var router = express.Router();

var async = require('async');
var Web3 = require('web3');
var blockUtil = require('../utils/blockUtil.js');

router.get('/', function(req, res, next) {
  
  var config = req.app.get('config');

  blockUtil.listBlock(config,function (err,data) {
      if (err) {
          return next(err);
      }
      res.render('index', data);

  });
  
});

module.exports = router;
