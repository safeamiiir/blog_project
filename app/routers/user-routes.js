const User = require('../models/users');
const Article = require('../models/articles');
const Comment = require('../models/comments');
const express = require('express');
const _ = require('lodash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();

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
                    artNum: 7,
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

    var user = new User({
        // fname : req.body.fname,
        // lname : req.body.lname,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        createDate: date,
        lastLogin: date
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
        likes : req.body.likes
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

    Article.count({ author : req.user.userName },function(err, count) {
        console.dir(err);
        console.dir(count);

            Article.find({ author : req.user.userName }).sort("-createDate").exec(
                function (err, art) {
                    // console.log( "\n\n here \n\n",art,"\n\n here \n\n ");
                    res.render('/Users/amir/WebstormProjects/Blog_Project/view/user/dashboard/dashboard.ejs', {
                        art: art,
                        artNum: count
                    })
                }
            );
        // }
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
        likes : req.body.likes
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


});


//.............................................. Logout ...........................................
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

//.............................................. Settings ...........................................
router.get('/settings', isLogedIn, function (req, res) {
    res.sendFile("/Users/amir/WebstormProjects/Blog_Project/view/user/dashboard/settings.html");
});

module.exports = router;






