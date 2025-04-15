//creating a model and schema for user

const mongoose=require("mongoose")

const UserSchema= new mongoose.Schema({
    name: {type: String, required: true},
    mail: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
    
}, {timestamps:true})

module.exports = mongoose.model("userCollection", UserSchema)

