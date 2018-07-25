const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var comment = new Schema({
    content : {type : String},
    author : { type : Object , required : true },
    articleId : { type : String , required: true },
    createDate : Date,
    authorProfilePicUrl : String
});


module.exports = mongoose.model('comment',comment);