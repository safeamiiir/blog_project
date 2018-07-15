const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var comment = new Schema({
    // title : { type : String , required : true },
    // Email : { type : String },
    content : {type : String},
    author : { type : Object , required : true },
    articleId : { type : String , required: true },
    createDate : Date,
    // image : { Data : Buffer , contentType : String},
});


module.exports = mongoose.model('comment',comment);