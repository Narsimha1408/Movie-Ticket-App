const express=require("express")
const router=express.Router()
const UserModel=require("../models/UserModel.js")

router.post("/register",async (req,res)=>{
    //checking if already a same user exists in db
    
    try{
        const userExist=UserModel.findOne({mail: req.body.mail})
        if(userExist){
            res.send({
                success: true,
                message: "user already exists",
            })
        }
        const newUser = await UserModel(req.body)
        await newUser.save()
        res.send({
            success: true,
            message: "New user registered",
        })

    }
    catch(err){
        console.log(err)
    }

    

})

module.exports=router