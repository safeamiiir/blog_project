const User = require('../models/users');
const Article = require('../models/articles');
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
        console.log("isAuthenticated")
        return next();
    } else {
        console.log("isnotAuthenticated")
        return res.redirect('logInSignUp');
    }
}

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/user/dashboard')
    } else {
        res.redirect('/user/logInSignUp')
    }
});



router.get('/logInSignUp', function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('dashboard');
    }
    // res.sendFile('E:/Ducuments/Makab/Blog_Project/BlogNode/view/user/logInSignUp.html') //Win,Masoud
    // res.sendFile('C:/Users/Alireza/Desktop/Blog_Project/view/user/logInSignUp.html') //Win,Alireza
    res.sendFile('/Users/amir/WebstormProjects/Blog_Project/view/user/logInSignUp.html') //Mac


});

router.get('/signUp', function (req, res) {
    // res.sendFile('E:/Ducuments/Makab/Blog_Project/BlogNode/view/user/logInSignUp.html') //Win,Masoud
    // res.sendFile('C:/Users/Alireza/Desktop/Blog_Project/view/user/logInSignUp.html') //Win,Alireza
    res.sendFile('/Users/amir/WebstormProjects/Blog_Project/view/user/logInSignUp.html') //mac

});





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


router.get('/test', isLogedIn , function(req,res){
    console.log("test.....................");
    res.send('test..........');
});

//.............................................. LOG IN ...........................................

// router.post('/logIn', passport.authenticate('localLogin', {
//     successRedirect: '/user/test',
//     failureRedirect: '/user/test'
// }))


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
    res.render('/Users/amir/WebstormProjects/Blog_Project/view/user/dashboard/dashboard.ejs');
});


//.............................................. ADD Article  ...........................................
router.get('/addart', isLogedIn, function (req,res) {
    // res.render('/Users/amir/WebstormProjects/Blog_Project/view/user/dashboard/addArticle.ejs');  //Mac
    res.sendfile('/Users/amir/WebstormProjects/Blog_Project/view/user/dashboard/addArticle.html')
});



//.............................................. Show Article  ...........................................
router.get('/showart', isLogedIn, function (req,res) {

    Article.find({ author : req.user.userName }).sort("-createDate").exec(
        function (err, art) {
            console.log( "\n\n here \n\n",art,"\n\n here \n\n ");
            res.send(art);
        }
    );

});


module.exports = router;






