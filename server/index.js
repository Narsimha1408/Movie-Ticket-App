//setting up express
const express=require("express")
require('dotenv').config()
//setting up mongoose for mongoDB
const mongoose=require("mongoose")
//seting up env 

const userRoutes = require("./routes/UserRoute.js")
const theatreRoutes = require("./routes/theatreRoute.js") 
const movieRoutes=require("./routes/movieRoute.js")

const app=express()
const PORT = 5008

mongoose.connect("mongodb+srv://narsimhacharyulu:narsimha1408@cluster0.x2dyt.mongodb.net/cluster0?retryWrites=true&w=majority&appName=cluster0")
        .then(()=>console.log("Data base connected"))
        .catch((err)=>console.log(err))

//adding middle wares
app.use(express.json())
app.use(express.urlencoded())

//configuring routes from routes file
app.use("/api/user", userRoutes)
app.use("/api/theatre", theatreRoutes)
app.use("/api/movie", movieRoutes)

app.listen(PORT,()=>{
    console.log("server connected")
})