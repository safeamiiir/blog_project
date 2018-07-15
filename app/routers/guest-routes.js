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

router.get("/post/:postID",function(req,res){
    // res.render("E:/Ducuments/Makab/Blog_Project/BlogNode/view/postPage.ejs"); // Win,Masoud
    // res.render("C:/Users/Alireza/Desktop/Blog_Project/view/postPage.ejs"); // Win,Alireza
    console.log(" Post ID :",req.params.postID);
    Article.findOne({ _id : req.params.postID },function(err, art) {
        console.log(" \n\n\n\n Heeeey ! Look At The Data : \n" , art , " \n\n\n\n");
        res.render("/Users/amir/WebstormProjects/Blog_Project/view/postPage.ejs", {
            art:art
        });
    });
});
router.get("/profile", function (req,res) {
    res.send( " مقاله ای جهت نمایش موجود نیست  ");
});
router.get("/profile/:userName" , function(req , res){
    // res.render("E:/Ducuments/Makab/Blog_Project/BlogNode/view/profile.ejs"); // Win,Masoud
    // res.render("C:/Users/Alireza/Desktop/Blog_Project/view/profile.ejs"); // Win,Alireza

    console.log("userName : ",req.params.userName);
    Article.count({ author : req.params.userName },function(err, count) {
        console.log("Number Of Articles : ",count);

        Article.find({ author : req.params.userName }).sort("-createDate").exec(
            function (err, art) {
                console.log( "\n\n here \n\n",art,"\n\n here \n\n ");
                res.render('/Users/amir/WebstormProjects/Blog_Project/view/profile.ejs', {
                    art: art,
                    userName: req.params.userName,
                    artNum: count
                })
            }
        );
        // }
    });
});
module.exports = router;

