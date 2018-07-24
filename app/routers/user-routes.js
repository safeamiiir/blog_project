const User = require('../models/users');
const Article = require('../models/articles');
const Comment = require('../models/comments');
const express = require('express');
const _ = require('lodash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

// var Admin = require('../models/Admin');
// var Article = require('../models/article');
// var express = require('express');
// var _ = require('lodash');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var router = express.Router();

////////////////////////////////// Needed Vars ///////////////////////////////////////
var arttticle = [];
var curentArticleId = 0;
////////////////////////////////// Needed Vars ///////////////////////////////////////




////////////////////////////////// Index For Authenticated Users ///////////////////////////////////////
router.get("/index",isLogedIn,function(req,res){

    Article.count(function(err, count) {
        console.log("Number Of Articles : ",count);

        Article.find().sort("-createDate").exec(
            function (err, art) {
                // console.log( "\n\n here \n\n",art,"\n\n here \n\n ");
                // res.render("E:/Ducuments/Makab/Blog_Project/BlogNode/view/index.ejs"); //win,Masoud
                // res.render("C:/Users/Alireza/Desktop/Blog_Project/view/index.ejs"); //win,Alireza
                res.render("/Users/amir/WebstormProjects/Blog_Project/view/indexUser.ejs", {
                    art: art,
                    artNum: count,
                    userName:req.user.userName
                })
            }
        );

    });
});


//////////////////// View Profile For Authenticated Users (whit No Article) /////////////////////////
router.get("/profile",isLogedIn, function (req,res) {
    res.render('/Users/amir/WebstormProjects/Blog_Project/view/profileNoArt.ejs', {
        userName:req.user.userName
    });
});

/////////////////////////////////////  Authentication /////////////////////////////////////////////
passport.use('localLogin', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
}, function (username, password, done) {
    console.log("loginStrategy");
    User.findOne({
        userName: username
    }, function (err, user) {

        if (err) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>err');
            return done(err);
        }

        if (!user) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>!user');
            return done(null, false, {})
        }

        if (user.password !== password) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>pass');
            return done(null, false, {})
        }

        console.log('+++++++++++++++++++++user');
        return done(null, user)
    })
}));




passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


function isLogedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("isAuthenticated");
        return next();
    } else {
        console.log("isnotAuthenticated");
        return res.redirect('logInSignUp');
    }
}


////////////////////////////////// Root (Index) ///////////////////////////////////////
router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/user/dashboard')
    } else {
        res.redirect('/user/logInSignUp')
    }
});


////////////////////////////////// Login Or Sign  Up ///////////////////////////////////////
router.get('/logInSignUp', function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('dashboard');
    }
    // res.sendFile('E:/Ducuments/Makab/Blog_Project/BlogNode/view/user/logInSignUp.html') //Win,Masoud
    // res.sendFile('C:/Users/Alireza/Desktop/Blog_Project/view/user/logInSignUp.html') //Win,Alireza
    res.sendFile('/Users/amir/WebstormProjects/Blog_Project/view/user/logInSignUp.html') //Mac

});

////////////////////////////////// For Sign Up ///////////////////////////////////////
router.get('/signUp', function (req, res) {
    // res.sendFile('E:/Ducuments/Makab/Blog_Project/BlogNode/view/user/logInSignUp.html') //Win,Masoud
    // res.sendFile('C:/Users/Alireza/Desktop/Blog_Project/view/user/logInSignUp.html') //Win,Alireza
    res.sendFile('/Users/amir/WebstormProjects/Blog_Project/view/user/logInSignUp.html') //mac

});




////////////////////////////////// For Sign Up ///////////////////////////////////////
router.post('/signUp', function (req, res) {
    console.log("create-user");

    var date = new Date(Date.now());
    console.log(date);
    var profilePath = "/Users/amir/WebstormProjects/Blog_Project/public/img/fromUser/default.png"; //masoud
    var imgData = fs.readFileSync(profilePath); //masoud
    var user = new User({
        fname : "وارد نشده است",
        lname : "وارد نشده است",
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        phoneNumber : "وارد نشده است" ,
        createDate: date,
        lastLogin: date,
        bio: "بیوگرافی",  //masoud
        profilePicture: {  //masoud
            data: imgData,
            contentType: 'image/png',
            url: profilePath.substring(48, )
        }

    });
    user.save(function (err, user) {
        if (err) {
            // assert.equals(err.errors['username'].message, "Path `name` is required.");
            // console.log(err.errors);
            // console.log(err);
            _.forEach(err.errors, function (val, key) {
                console.log("valErr >>>>> " + key + " : " + err.errors[key].properties.type);
            });
            console.log(err);
            return res.send(500, err.message);
        } else {
            res.redirect('dashboard')
        }
    });
});

router.post('/addingart', function (req,res) {

    console.log("add-article");

    var date = new Date(Date.now());
    console.log(date);

    var article = new Article({
        title : req.body.title,
        content : req.body.content,
        abstract : req.body.abstract,
        author : req.user.userName,
        createDate : date,
        lastEdit : date,
        // image : { Data : Buffer , contentType : String}
    });
    article.save(function (err,article) {
        if (err) {
            _.forEach(err.errors, function (val, key) {
                console.log("valErr >>>>> " + key + " : " + err.errors[key].properties.type);
            });
            console.log(err);
            return res.send(500, err.message);
        }
        else {
            console.log("article has successfully Added To DB !");
        }

    })
});


//.............................................. LOG IN ...........................................
router.post('/logIn', passport.authenticate('localLogin', { failureRedirect: '/logInSignUp' }), function(req, res) {
    if(!req.session.accessToken){
        console.log(req.session);
        console.log(req.url);
        // res.sendFile('E:/Ducuments/Makab/Blog_Project/BlogNode/view/user/dashboard/dashboard.html'); // Win,Masoud
        // res.sendFile('C:/Users/Alireza/Desktop/Blog_Project/view/user/dashboard/dashboard.html'); // Win,Alireza
        res.sendFile('/Users/amir/WebstormProjects/Blog_Project/view/user/dashboard/dashboard.html'); //Mac
        // res.redirect('/user/dashboard');
    }
    //return res.redirect('/user/dashboard')
  });



//.............................................. DASHBOARD ...........................................
router.get('/dashboard', isLogedIn, function (req, res) {
    console.log(req.url);
    // req.headers.referer = 'http/localhost:8181/user/dashboard';
    console.log('>>>>>>>>.dashboardddd');
    // res.set('Content-Type','text/html');
    // res.sendFile('E:/Ducuments/Makab/Blog_Project/BlogNode/view/user/dashboard/dashboard.html'); // Win,Masoud
    // res.sendFile('C:/Users/Alireza/Desktop/Blog_Project/view/user/dashboard/dashboard.html'); // Win,Alireza
    // res.sendFile('/Users/amir/WebstormProjects/Blog_Project/view/user/dashboard/dashboard.html');  //Mac

    // Article.count({ author : req.user.userName },function(err, count) {
    //     console.dir(err);
    //     console.dir(count);
    //
    //         Article.find({ author : req.user.userName }).sort("-createDate").exec(
    //             function (err, art) {
    //                 // console.log( "\n\n here \n\n",art,"\n\n here \n\n ");
    //                 res.render('/Users/amir/WebstormProjects/Blog_Project/view/user/dashboard/dashboard.ejs', {
    //                     art: art,
    //                     artNum: count
    //                 })
    //             }
    //         );
    //     // }
    // });
    Article.count({
        author: req.user.userName
    }, function (err, count) {
        console.dir(err);
        console.dir(count);

        Article.find({
            author: req.user.userName
        }).sort("-createDate").exec(
            function (err, art) {
                User.find({
                    userName: req.user.userName
                }, function (err, user) { //masoud
                    console.log("usernameeeeeee", user[0].userName); //masoud
                    // console.log( "\n\n here \n\n",art,"\n\n here \n\n ");
                    var outputPic = user[0].profilePicture;
                    console.log("profile pic url:", outputPic.url);
                    //  fs.writeFileSync("E:/Ducuments/Makab/Blog_Project/BlogNode/public/img/from_db",outputPic.data);
                    res.render('/Users/amir/WebstormProjects/Blog_Project/view/user/dashboard/dashboard.ejs', {
                        art: art,
                        artNum: count,
                        userName: user[0].userName, //masoud
                        profilePic: outputPic.url //masoud
                    });
                });
            }
        )
    });


});


//.............................................. ADD Article  ...........................................
router.get('/addart', isLogedIn, function (req,res) {
    Article.count({ author : req.user.userName },function(err, count) {
        console.dir(err);
        console.dir(count);

        Article.find({ author : req.user.userName }).sort("-createDate").exec(
            function (err, art) {
                // console.log( "\n\n here \n\n",art,"\n\n here \n\n ");
                res.render('/Users/amir/WebstormProjects/Blog_Project/view/user/dashboard/addArticle.ejs', {
                    art: art,
                    artNum: count
                })
            }
        );
        // }
    });
});



//.............................................. Show Article  ...........................................
// router.get('/showart', isLogedIn, function (req,res) {
//
//     Article.find({ author : req.user.userName }).sort("-createDate").exec(
//         function (err, art) {
//             // console.log( "\n\n here \n\n",art,"\n\n here \n\n ");
//             res.render('/Users/amir/WebstormProjects/Blog_Project/view/user/dashboard/dashboard.ejs', {
//                 art: art
//             })
//         }
//     );
//
// });    // NOT USIIIIIIIIIIIIIIIIING !!!!!!!!!!!!!!!!!!!


//.............................................. DeleteArticle ...........................................
router.post('/deleteArticle', function (req,res) {

    console.log("article Detele Clicked in server side & its ID is :" , req.body.id , " \n\n");

    Article.deleteOne({ _id : req.body.id },function(err, del) {
        console.dir(del);
    });
});



//.............................................. EditArticle ...........................................
router.post('/editArticle',  function(req, res) {

    console.log("article edit Clicked in server side & its ID is :" , req.body.id , " \n\n");
    curentArticleId = req.body.id;
    Article.findOne({ _id : req.body.id },function(err, arttt) {
        console.log(" \n\n\n\n Heeeey ! Look At The Data : \n" , arttt , " \n\n\n\n");
        res.send(200);
        arttticle.title = arttt.title;
        arttticle.abstract = arttt.abstract;
        arttticle.content = arttt.content;
        arttticle.author = arttt.author;
    });
});
router.get('/editingArticle', isLogedIn, function (req, res) {
    res.render('/Users/amir/WebstormProjects/Blog_Project/view/user/dashboard/editArticle.ejs', {
        art : {
            title: arttticle.title,
            abstract: arttticle.abstract,
            content: arttticle.content,
            author : arttticle.author},
        success: true
    });
});

router.post('/editingart', function (req,res) {

    console.log("add-article");

    var date = new Date(Date.now());

    console.log( "curentArticleId Issss ::::" , curentArticleId);

    Article.findByIdAndUpdate(curentArticleId, {
        title : req.body.title,
        content : req.body.content,
        abstract : req.body.abstract,
        author : req.user.userName,
        lastEdit : date,
    }, function(err, up) {
        if (err) throw err;

        // we have the updated user returned to us
        console.log(up);
    });

});

//.............................................. Add Comment ...........................................
router.post('/addingcom', isLogedIn, function (req, res) {
    console.log("add-comment");
    var date = new Date(Date.now());

    console.log(" Content : ", req.body.content);
    console.log(" author : ", req.user.userName);
    console.log(" Date : ", date);
    console.log(" Post ID : ",req.body.articleId );
    var comment = new Comment({
        content: req.body.content,
        author: req.user.userName,
        articleId : req.body.articleId,
        createDate: date
    });

    comment.save(function (err, cmnt) {
        if (err) {
            _.forEach(err.errors, function (val, key) {
                console.log("valErr >>>>> " + key + " : " + err.errors[key].properties.type);
            });
            console.log(err);
            return res.send(500, err.message);
        } else {
            // res.redirect('dashboard')
            console.log(cmnt);
        }
    });

    ///*/*?*?*?*?*?*?*?*?*//In Article!!
    // console.log("In Likes");
    // console.log( 'likedIdddddd ' ,req.body.id);
    Article.findOne({ _id : req.body.articleId },function(err, art) {
//         // console.log(" \n\n\n\n comtlikecomtlike : \n" , art , " \n\n\n\n");
        if ( isLogedIn )
            art.comments.push({ 'commenter' :  req.user.userName , 'commentedDate' : date });
        else
            art.comment.push({ 'commenter' :  'guest' , 'commentedDate' : date});
        art.save();
    });
//
    ///*/*?*?*?*?*?*?*?*?*//In Article!!
});


//.............................................. ADD Likes ...........................................
router.post('/likeIt', function (req, res) {
    // console.log("In Likes");
    // console.log( 'likedIdddddd ' ,req.body.id);
    var date = new Date(Date.now());
    Article.findOne({ _id : req.body.id },function(err, art) {
        // console.log(" \n\n\n\n Heeeey ! Look At The Data : \n" , art , " \n\n\n\n");
        if ( isLogedIn )
            art.likes.push({ 'liker' :  req.user.userName , 'likedDate' : date });
        else
            art.likes.push({ 'liker' :  'guest' , 'likedDate' : date});
        art.save();
    });

});

//.............................................. ADD Visits (User) ...........................................
router.post('/visitIt', function (req, res) {
    // console.log("In Likes");
    // console.log( 'likedIdddddd ' ,req.body.id);
    var date = new Date(Date.now());
    Article.findOne({ _id : req.body.id },function(err, art) {
        // console.log(" \n\n\n\n Heeeey ! Look At The Data : \n" , art , " \n\n\n\n");
            art.visits.push({ 'visitor' :  req.user.userName , 'visitedDate' : date });
        art.save();
    });

});
//.............................................. ADD Visits(Guest) ...........................................
router.post('/visitItG', function (req, res) {
    // console.log("In Likes");
    // console.log( 'likedIdddddd ' ,req.body.id);
    var date = new Date(Date.now());
    Article.findOne({ _id : req.body.id },function(err, art) {
        // console.log(" \n\n\n\n Heeeey ! Look At The Data : \n" , art , " \n\n\n\n");
            art.visits.push({ 'visitor' :  'guest' , 'visitedDate' : date});
        art.save();
    });

});

//.............................................. StatisticsAjax ...........................................
router.post('/statistics', function (req, res) {
        Article.find({ author : req.user.userName },function (err, art) {
            // var out = [];
            for ( var articleIndex = 0; articleIndex < art.length; articleIndex++ ){
        //  out[indexx] = {'period' : art[index].likes[indexx].likedDate.getFullYear() + '-' + ( art[index].likes[indexx].likedDate.getMonth() + 1 ) + '-' + art[index].likes[indexx].likedDate.getDate() , 'likes' : art[index].likes.length , 'comments' : 2  };
                console.log('This is articles Visits Total Number :::::: ', art[articleIndex].visits.length);
                console.log('This is articles Likes Total Number :::::: ', art[articleIndex].likes.length);
                console.log('This is articles Comments Total Number :::::: ', art[articleIndex].comments.length);
            }
        //     console.log('out : ',out);
        //     res.send(out);

    });

});

//.............................................. TOTAL NUM StatisticsAjax ...........................................
router.post('/statisticsTotal', function (req, res) {

    Article.find({ author : req.user.userName },function (err, art) {
    var out = {};
    var outNums = {};
    // Total Numbers Handler Starts :
    for ( var articleIndex0 = 0; articleIndex0 < art.length; articleIndex0++ ){
        outNums = { 'visits' : art[articleIndex0].visits.length , 'likes' : art[articleIndex0].likes.length, 'comments' : art[articleIndex0].comments.length };
    }
        console.log('outNums',outNums);
        out.totalNum = outNums;
        // console.log('out1 :' ,out);
            // Query Started And gets All Articles !

            // VISITS Handler Starts :
            var visitDate = [];  // makes dates like [ 2018-07-01 , 2018-07-02 , ... ]

            for ( var articleIndex = 0; articleIndex < art.length; articleIndex++ ){
                for(var visitIndex = 0; visitIndex < art[articleIndex].visits.length; visitIndex++ ){
                    var tmp = art[articleIndex].visits[visitIndex].visitedDate.getFullYear() + '-' + (art[articleIndex].visits[visitIndex].visitedDate.getMonth()+1) + '-' + art[articleIndex].visits[visitIndex].visitedDate.getDate();
                    visitDate.push(tmp);
                }
            }
            // console.log(visitDate);
            // Count each Visits Date and its number of occurrence.
            var visitedDateCounted = [];
            var visitedTmpCounted = [];
            for(var i = 0; i < visitDate.length; i++){
                var countV = 0;
                for ( var j = i; j <  visitDate.length; j++ ){
                    if (visitedTmpCounted.includes(visitDate[i])){
                        break;
                    }
                    if (visitDate[i] === visitDate[j]){
                        countV ++;
                    }
                }
                if ( visitedTmpCounted.includes(visitDate[i]) === false ){
                    visitedTmpCounted.push(visitDate[i]);
                    visitedDateCounted.push({ 'visitDate' : visitDate[i] , 'count' : countV});
                }
            }
            console.log('visitedDateCounted',visitedDateCounted);
            out.visits =  visitedDateCounted;//// ENDS
            // console.log('outVisit :' ,out);



            // LIKES Handler Starts :
            var likeDate = [];  // makes dates like [ 2018-07-01 , 2018-07-02 , ... ]

            for ( var articleIndexx = 0; articleIndexx < art.length; articleIndexx++ ){
                for(var likeIndexx = 0; likeIndexx < art[articleIndexx].likes.length; likeIndexx++ ){
                    var tmpp = art[articleIndexx].likes[likeIndexx].likedDate.getFullYear() + '-' + (art[articleIndexx].likes[likeIndexx].likedDate.getMonth()+1) + '-' + art[articleIndexx].likes[likeIndexx].likedDate.getDate();
                    likeDate.push(tmpp);
                }
            }
            // console.log(likeDate);
            // Count each Visits Date and its number of occurrence.
            var likedDateCounted = [];
            var likedTmpCounted = [];
            for(var ii = 0; ii < likeDate.length; ii++){
                var countL = 0;
                for ( var jj = ii; jj <  likeDate.length; jj++ ){
                    if (likedTmpCounted.includes(likeDate[ii])){
                        break;
                    }
                    if (likeDate[ii] === likeDate[jj]){
                        countL ++;
                    }
                }
                if ( likedTmpCounted.includes(likeDate[ii]) === false ){
                    likedTmpCounted.push(likeDate[ii]);
                    likedDateCounted.push({ 'likeDate' : likeDate[ii] , 'count' : countL});
                }
            }
            console.log('likedDateCounted', likedDateCounted);
            out.likes = likedDateCounted;//// ENDS
            // console.log('outLike :' ,out);




            // COMMENTS Handler Starts :
            var commentDate = [];  // makes dates like [ 2018-07-01 , 2018-07-02 , ... ]

            for ( var articleIndexxx = 0; articleIndexxx < art.length; articleIndexxx++ ){
                for(var commentIndexxx = 0; commentIndexxx < art[articleIndexxx].comments.length; commentIndexxx++ ){
                    var tmppp = art[articleIndexxx].comments[commentIndexxx].commentedDate.getFullYear() + '-' + (art[articleIndexxx].comments[commentIndexxx].commentedDate.getMonth()+1) + '-' + art[articleIndexxx].comments[commentIndexxx].commentedDate.getDate();
                    commentDate.push(tmppp);
                }
            }
            // console.log(commentDate);
            // Count each Visits Date and its number of occurrence.
            var commentedDateCounted = [];
            var commentedTmpCounted = [];
            for(var iii = 0; iii < commentDate.length; iii++){
                var countC = 0;
                for ( var jjj = iii; jjj <  commentDate.length; jjj++ ){
                    if (commentedTmpCounted.includes(commentDate[iii])){
                        break;
                    }
                    if (commentDate[iii] === commentDate[jjj]){
                        countC ++;
                    }
                }
                if ( commentedTmpCounted.includes(commentDate[iii]) === false ){
                    commentedTmpCounted.push(commentDate[iii]);
                    commentedDateCounted.push({ 'commentDate' : commentDate[iii] , 'count' : countC});
                }
            }
            console.log('commentedDateCounted', commentedDateCounted);
            out.comments = commentedDateCounted;//// ENDS
            // console.log('outComment :' ,out);
    console.log("outtttttt : ",out);
    res.send(out);
    });
});


//.............................................. Logout ...........................................
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

//.............................................. Settings ...........................................
router.get('/settings', isLogedIn, function (req, res) {
    User.find({userName : req.user.userName}, function(err, user){
        res.render("/Users/amir/WebstormProjects/Blog_Project/view/user/dashboard/settings.ejs",{
            user : user //masoud
        });
    })

});


//save the profile picture whome sent from user to node.js server    masoud
const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "/Users/amir/WebstormProjects/Blog_Project/public/img/fromUser");
    },
    filename: function (req, file, callback) {
        callback(null, req.user.userName + "_profile.png");
    }
});
//create the multer object...
var upload = multer({
    storage: Storage
}).array("imgUploader", 3); //Field name and max count

router.post('/settingUploadPic', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Something went wrong!");
        }
        //update the profile picture
        var profilePath = "/Users/amir/WebstormProjects/Blog_Project/public/img/fromUser/" + req.user.userName + "_profile.png";
        var imgData = fs.readFileSync(profilePath);

        var myquery = {
            userName: req.user.userName
        };
        var newvalues = {
            $set: {
                profilePicture: {
                    data: imgData,
                    contentType: 'image/png',
                    url: profilePath.substring(48, )
                }

            }
        };


        User.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
        });
        // return res.end("File uploaded sucessfully!.");
    });
});

router.post('/settingsUpdate' ,function(req,res){
    console.log(req.body);
    User.find({userName : req.body.userName}, function(err,user){
        if(user.length == 0){
            console.log("it's ok and update");
            var myquery = {
                userName: req.user.userName
            };
            var newvalues = {
                $set: {
                    fname : req.body.fname,
                    lname : req.body.lname,
                    userName : req.body.userName,
                    email : req.body.email,
                    phoneNumber : req.body.phoneNumber,
                    password : req.body.password,
                }

            };
            User.updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
            });
            return res.end("Your username changed successfully");
        }
        if(user.length > 0 && user[0].userName !== req.user.userName){
            return res.end("The Username is already exist");
        }
        if(user.length > 0 && user[0].userName === req.user.userName){
            var myquery = {
                userName: req.user.userName
            };
            var newvalues = {
                $set: {
                    fname : req.body.fname,
                    lname : req.body.lname,
                    userName : req.body.userName,
                    email : req.body.email,
                    phoneNumber : req.body.phoneNumber,
                    password : req.body.password,
                }

            };
            User.updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
            });
        }
    })

});


module.exports = router;






