//creating a model for theatre 

const mongoose=require("mongoose")

const Theatre = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userCollection',
    },
    status:{
        type: Boolean,
        required: true, 
        default: false,
        
    }
})
                            //collection name, schema name
module.exports=mongoose.model("theatreCollection", Theatre)