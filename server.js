const express = require('express');
const mongoose = require('mongoose');  
const morgan = require('morgan');             
const bodyParser = require('body-parser');    
const methodOverride = require('method-override'); 
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const database = require('./app/config/database');
const router = require('./app/routers/router');


const port = process.env.PORT || 8181;
const app = express();   

//connect to database BlogDB...
mongoose.connect(database.url);


//settings...
app.set('view engine', 'ejs');
app.set('views', 'views');
console.log(__dirname);
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));

app.use(cookieParser());

app.use(bodyParser.urlencoded({'extended': 'true'}));           
app.use(bodyParser.json());                                     
app.use(bodyParser.json({type: 'application/vnd.api+json'})); 

app.use(methodOverride());

app.use(session({
    secret: '20A1S19E5D4A1R15M13S1918',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 81234567}
}));

app.use(passport.initialize());
app.use(passport.session());
// define router =================
router(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

