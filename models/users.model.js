const mongoose = require("mongoose");

// name ==> String
// email ==> String
// gender ==> String
// password ==> String
// age ==> Number
// city ==> String
// is_married ==> boolean

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: Number,
    city: String,
    is_married: Boolean

},{
    versionKey:false
})

const UsersModel = mongoose.model("user", usersSchema)

module.exports = UsersModel

