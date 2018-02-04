var express = require('express');
var router = express.Router();

var async = require('async');
var Web3 = require('web3');
var blockUtil = require('../utils/blockUtil.js');
module.exports = function (io,config) {
  io.on("connection",function (socket) {
      console.log("co con nection");
      var web3 = new Web3();
      web3.setProvider(config.provider);
      web3.eth.filter("latest", function(error, result){
          blockUtil.listBlock(config,function (err,data) {
              if (!err) {
                  io.sockets.emit("update-lastest-block",data);
              }
          });
      });
      /*blockUtil.listBlock(config,function (err,data) {
          if (err) {
              return next(err);
          }
          io.sockets.emit("update-lastest-block",data);

      });*/

  });
   return router.get('/', function(req, res, next) {

        var config = req.app.get('config');

        blockUtil.listBlock(config,function (err,data) {
            if (err) {
                return next(err);
            }
            res.render('index', data);

        });

    });
}
