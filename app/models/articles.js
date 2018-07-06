const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var article = new Schema({
    title : { type : String , required : true },
    abstract : { type : String },
    content : {type : String},
    author : { type : Object , required : true },
    createDate : Date,
    lastEdit : Date,
    // image : { Data : Buffer , contentType : String},
    likes : Number
});


module.exports = mongoose.model('article',article);