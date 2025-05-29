const express=require("express")
const router=express.Router()
const theatreModel=require("../models/TheatreModel.js")

//creating the post route to create the theatre

router.post("/add-theatre",async (req,res)=>{
    try{
        const newTheatre = new theatreModel(req.body)
        await newTheatre.save()
        res.send({
            success: true,
            message: "New theatre has been added succesfully"
        })

    }catch(error){
        res.send({
            success: false,
            message: error.message 
        })
    }
})

//creating the route to update the theatre

router.put("/update-theatre", async (req,res)=>{
    try{
        await theatreModel.findByIdAndUpdate(req.body.theatreId, req.body)
        res.send({
            success: true,
            message: "Theatre details has been updated succesfully"
        })
    }catch(error){
        res.send({
            success: false,
            message: error.message,
        })
            
    }

})

//creating the route to delete the theatre

router.put("/delete-theatre", async (req,res)=>{
    try{
        await theatreModel.findByIdAndDelete(req.body.theatreId)
        res.send({
            success: true,
            message: "Theatre has been deleted succesfully"
        })
    }catch(error){
        res.send({
            success: false,
            message: error.message,
        })
            
    }

})

//route to get all the theatres by the owner once he is on the profile page

router.get("/get-all-theatres-by-owner", async (req,res)=>{

    try{
        const allTheatres = await theatreModel.find({owner: req.query.owner}) //in the front end : used params, thats why.. req.query
        console.log(allTheatres)
        res.send({
            success: true,
            message: "Theatres fetched successfuly!",
            data : allTheatres
        })
    }
    catch(error){
        res.send({
            success: false,
            message: error.message,
        })
    }

})



module.exports = router
