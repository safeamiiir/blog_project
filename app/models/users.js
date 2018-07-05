const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var user = new Schema ({
    userName : {type: String , unique : true , required : true , dropDups: true},
    email : {type: String , unique : true , required : true , dropDups: true},
    password : {type: String , required : true},
    createDate : Date,
    lastLogin : Date,
    profilePicture : {data : Buffer , contentType : String}
});

module.exports = mongoose.model('user',user);