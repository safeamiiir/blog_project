const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var user = new Schema ({
    fname : String ,
    lname : String ,
    userName : {type: String , unique : true , required : true , dropDups: true},
    email : {type: String , unique : true , required : true , dropDups: true},
    phoneNumber : String ,
    password : {type: String , required : true},
    createDate : Date,
    lastLogin : Date,
    bio : String, //Masoud
    profilePicture : {data : Buffer , contentType : String , url : String}
});

module.exports = mongoose.model('user',user);