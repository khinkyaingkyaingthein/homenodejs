var express = require('express');
var router = express.Router();
var User = require('../../model/user');
var Post = require('../../model/post');
var bcrypt = require('bcryptjs');

router.get('/list',function(req,res){
  User.find(function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else{
      res.status(200).json({
        users:rtn
      });
    }
  })
})

module.exports = router;