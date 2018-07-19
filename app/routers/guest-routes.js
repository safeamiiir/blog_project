const express = require('express');
const router = express.Router();
const Article = require('../models/articles');
const Comment = require('../models/comments');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

router.get("/", function(req,res){

    Article.count(function(err, count) {
        console.log("Number Of Articles : ",count);

        Article.find().sort("-createDate").exec(
            function (err, art) {
                // console.log( "\n\n here \n\n",art,"\n\n here \n\n ");
                // res.render("E:/Ducuments/Makab/Blog_Project/BlogNode/view/index.ejs"); //win,Masoud
                // res.render("C:/Users/Alireza/Desktop/Blog_Project/view/index.ejs"); //win,Alireza
                res.render("/Users/amir/WebstormProjects/Blog_Project/view/index.ejs", {
                    art: art,
                    artNum: 7
                })
            }
        );

    });
});

router.get("/post/:postID",function(req,res){
    // res.render("E:/Ducuments/Makab/Blog_Project/BlogNode/view/postPage.ejs"); // Win,Masoud
    // res.render("C:/Users/Alireza/Desktop/Blog_Project/view/postPage.ejs"); // Win,Alireza
    console.log(" Post ID :",req.params.postID);
    Article.findOne({ _id : req.params.postID },function(err, art) {
        // console.log(" \n\n\n\n Heeeey ! Look At The Data : \n" , art , " \n\n\n\n");
        Comment.count({articleId : req.params.postID },function(err, count) {
            console.log("Number Of Comment : ", count);
            Comment.find({  articleId : req.params.postID }).sort("-createDate").exec(
                function (err, com) {
                    // console.log( "\n\n here \n\n",com,"\n\n here \n\n ");
                    res.render('/Users/amir/WebstormProjects/Blog_Project/view/postPage.ejs', {
                        art: art,
                        com: com,
                        cmtNum: count
                    })
                }
            );
        });

    });

});
router.get("/profile", function (req,res) {
    res.send( " مقاله ای جهت نمایش موجود نیست  ");
});
router.get("/profile/:userName" , function(req , res){
    console.log("userName : ",req.params.userName);
    Article.count({ author : req.params.userName },function(err, count) {
        console.log("Number Of Articles : ",count);

        Article.find({ author : req.params.userName }).sort("-createDate").exec(
            function (err, art) {
                console.log( "\n\n here \n\n",art,"\n\n here \n\n ");
                // res.render("E:/Ducuments/Makab/Blog_Project/BlogNode/view/profile.ejs"); // Win,Masoud
                // res.render("C:/Users/Alireza/Desktop/Blog_Project/view/profile.ejs"); // Win,Alireza
                res.render('/Users/amir/WebstormProjects/Blog_Project/view/profile.ejs', {
                    art: art,
                    userName: req.params.userName,
                    artNum: count
                })
            }
        );
    });
});
module.exports = router;

