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

router.delete("/delete-theatre", async (req,res)=>{
    try{
        const {theatreId} = req.body
        console.log(theatreId)
        await theatreModel.findByIdAndDelete(theatreId)
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


//route to get all theatres added by multiple users for admin page

router.get("/get-all-theatres-for-admin", async (req,res)=>{
    try{
        const allTheatresForAdmin = await theatreModel.find().populate('owner')
        res.send({
            success: true,
            message: "All theatres fetched!",
            data: allTheatresForAdmin
        })
    }
    catch(err){
        res.send({
            success: false,
            message: err.message,
        })
    }
})



module.exports = router
