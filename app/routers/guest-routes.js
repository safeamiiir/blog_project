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
    // res.sendFile("E:/Ducuments/Makab/Blog_Project/BlogNode/view/index.html"); //win,Masoud
    // res.sendFile("C:/Users/Alireza/Desktop/Blog_Project/view/index.html"); //win,Alireza
    res.sendFile("/Users/amir/WebstormProjects/Blog_Project/view/index.html"); //mac
});

router.get("/post",function(req,res){
    // res.render("E:/Ducuments/Makab/Blog_Project/BlogNode/view/postPage.ejs"); // Win,Masoud
    // res.render("C:/Users/Alireza/Desktop/Blog_Project/view/postPage.ejs"); // Win,Alireza
    res.render("/Users/amir/WebstormProjects/Blog_Project/view/postPage.ejs");  // Mac
});

router.get("/profile" , function(req , res){
    // res.render("E:/Ducuments/Makab/Blog_Project/BlogNode/view/profile.ejs"); // Win,Masoud
    // res.render("C:/Users/Alireza/Desktop/Blog_Project/view/profile.ejs"); // Win,Alireza
    res.render("/Users/amir/WebstormProjects/Blog_Project/view/profile.ejs"); // Mac
});
module.exports = router;

