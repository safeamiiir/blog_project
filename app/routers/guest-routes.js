const express = require('express');
const router = express.Router();
const Article = require('../models/articles');
const mongoose = require('mongoose');                    
mongoose.Promise = require('bluebird');

router.get("/",function(req,res){
    // Article.find({},function(err,articles){
    //     return articles;
    // }).limit(9).sort({createDate : -1}).then(function(articles){
    //     res.render('../view/index.ejs',{articles : articles});
    // });
    // res.send("guest");
    res.sendFile("E:/Ducuments/Makab/Blog_Project/BlogNode/view/index.html");
});

router.get("/post",function(req,res){
    res.render("E:/Ducuments/Makab/Blog_Project/BlogNode/view/postPage.ejs");
});

router.get("/profile" , function(req , res){
    res.render("E:/Ducuments/Makab/Blog_Project/BlogNode/view/profile.ejs")
});
module.exports = router;

