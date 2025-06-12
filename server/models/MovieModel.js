const mongoose=require("mongoose");

const Movie = new mongoose.Schema({
    title: {
        type: String,
        required: True
    },
    description: {
        type: String,
        required: True
    },
    duration: {
        type: Number,
        required: True
    },
    genre:{
        type: String,
        required: True
    },
    language:{
        type: String,
        required: True
    },
    releaseDate:{
        type: Date,
        required: True
    },
    poster:{
        type: String,
        required: True
    }
})

module.exports=mongoose.model("movieCollection", Movie)