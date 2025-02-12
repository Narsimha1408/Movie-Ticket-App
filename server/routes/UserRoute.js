const express=require("express")
const router=express.Router()
const UserModel=require("../models/UserModel.js")

router.post("/register",async (req,res)=>{
    const newUser = await UserModel(req.body)
    await newUser.save()

    res.send({
        success: true,
        message: "New user registered",
    })

})

module.exports=router