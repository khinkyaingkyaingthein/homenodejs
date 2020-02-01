var express = require('express');
var router = express.Router();
var User = require('../model/user');
var Post = require('../model/post');
var bcrypt = require('bcryptjs');

router.get('/',function(req,res,next){
  res.send('respond with a resource');
})
router.get('/adduser',function(req,res,next){
  res.render('user/add-user');
})
router.post('/adduser',function(req,res,next){
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/listuser');
  })
})
router.get('/listuser',function(req,res,next){
  User.find(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('user/list-user',{user:rtn});
  })
})
router.get('/detailuser/:id',function(req,res,next){
  console.log(req.params.id);
  User.findById(req.params.id,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    Post.find({author:req.params.id},function(err2,rtn2){
        res.render('user/detail-user',{user:rtn,post:rtn2});
    })
  })
})
router.get('/updateuser/:uid',function(req,res,next){
  console.log(req.params.uid);
  User.findById(req.params.uid,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('user/update-user',{user:rtn});
  })
})
router.post('/updateuser',function(req,res,rtn){
  var update = {
    name:req.body.name,
    email:req.body.email,
    password:bcrypt.hashSync(req.body.pwd,bcrypt.genSaltSync(8),null)
  }
  User.findByIdAndUpdate(req.body.id,{$set:update},function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/listuser');
  })
})
router.get('/deleteuser/:id',function(req,res,next){
  User.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/listuser');
  })
})
router.post('/duemail',function(req,res){
  User.findOne({email:req.body.email},function(err,rtn){
    if(err) throw err;
    (rtn != null)? res.json({status:true}):res.json({status:false});
  })
})
module.exports = router;
