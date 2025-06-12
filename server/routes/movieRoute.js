const express = require("express")
const router = express.Router()
const Movie = require("../models/MovieModel.js")

//creating routes for CRUD operations on movies

//to add a new movie
router.post("/add-movie", async (req,res)=>{
    try{
        const newMovie = new Movie(req.body)
        await newMovie.save()
        res.send({
            success: true,
            message: "New movie has been added"
        })
    }
    catch(error){
        res.send({
            success: false,
            message: error.message
        })
    }
})

//to update a movie

router.put("/update-movie/:id", async (req,res)=>{
    try{
        const movieId=req.params.id
        const movie = await Movie.findByIdAndUpdate(movieId, req.body)
        res.send({
            success: true,
            message: "Movie details has been updated"
        })
    }
    catch(error){
        res.send({
            success: false,
            message: error.message
        })
    }
})



//to delete a movie 
//we can delete a movie by getting the id from body as well, but getting the id from params is the best practice
router.delete("delete-movie/:id", async (req, res)=>{
    try{
        const movieId=req.params.id   /
        await Movie.findByIdAndDelete(movieId)
        res.send({
            success: true,
            message: "Movie has been deleted"
        })
    }
    catch(error){
        res.send({
            success: false,
            message: error.message
        })

    }
})

//to get a specific movie 

router.get("/movie/:id", async (req,res)=>{
    try{
        const movieId=req.params.id
        const movie = await Movie.findById(movieId)
        res.send({
            success: true,
            message: "Movie has been fetched",
            data: movie
        })
    }
    catch(error){
         res.send({
            success: false,
            message: error.message
        })
    }
})

//to get all movies

router.get("get-all-movies", async(req, res)=>{
    try{
        const movies = await Movie.find()
        res.send({
            success: true,
            message: "Movie has been fetched",
            data: movies
        })

    }
    catch(error){
         res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router