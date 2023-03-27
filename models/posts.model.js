const mongoose = require("mongoose");

// posts models

// title ==> String
// body ==> String
// device ==> String
// no_of_comments ==> Number

const postsSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    no_of_comments : Number,
    userID: String
})

const PostSModel = mongoose.model("post", postsSchema)


module.exports= PostSModel