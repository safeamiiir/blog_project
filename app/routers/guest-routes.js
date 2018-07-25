const express = require('express');
const router = express.Router();
const User = require('../models/users');
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
                    artNum: count
                })
            }
        );

    });
});

router.get("/post/:postID/:author/:artName",function(req,res){
    console.log(" Post ID :",req.params.postID);
    Article.findOne({ _id : req.params.postID },function(err, art) {
        // console.log(" \n\n\n\n Heeeey ! Look At The Data : \n" , art , " \n\n\n\n");
        Comment.count({articleId : req.params.postID },function(err, count) {
            console.log("Number Of Comment : ", count);
            Comment.find({  articleId : req.params.postID }).sort("-createDate").exec(
                function (err, com) {
                    User.find({userName: req.params.author}, function (err, user) {
                        console.log("usernameeeeeee", user[0].userName); //masoud
                        // console.log( "\n\n here \n\n",art,"\n\n here \n\n ");
                        var outputPic = user[0].profilePicture;
                        console.log("profile pic url:", outputPic.url);
                        //  fs.writeFileSync("E:/Ducuments/Makab/Blog_Project/BlogNode/public/img/from_db",outputPic.data);
                        res.render('/Users/amir/WebstormProjects/Blog_Project/view/postPage.ejs', {
                            art: art,
                            com: com,
                            cmtNum: count,
                            userName: user[0].userName, //masoud
                            bio : user[0].bio,
                            profilePic : outputPic.url
                        });
                    });
                }
            );
        });

    });

});

router.get("/profile/:userName" , function(req , res){
    console.log("userName : ",req.params.userName);
    Article.count({
        author: req.params.userName
    }, function (err, count) {
        console.dir(err);
        console.dir(count);
        Article.find({
            author: req.params.userName
        }).sort("-createDate").exec(
            function (err, art) {
                User.find({
                    userName: req.params.userName
                }, function (err, user) { //masoud
                    console.log("usernameeeeeee", user[0].userName); //masoud
                    // console.log( "\n\n here \n\n",art,"\n\n here \n\n ");
                    var outputPic = user[0].profilePicture;
                    console.log("profile pic url:", outputPic.url);
                    //  fs.writeFileSync("E:/Ducuments/Makab/Blog_Project/BlogNode/public/img/from_db",outputPic.data);
                    res.render('/Users/amir/WebstormProjects/Blog_Project/view/profile.ejs', {
                        art: art,
                        artNum: count,
                        userName: user[0].userName, //masoud
                        bio : user[0].bio,
                        profilePic: outputPic.url //masoud
                    });
                });
            }
        )
    });
});
module.exports = router;

