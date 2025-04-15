const express=require("express")
const router=express.Router()
const UserModel=require("../models/UserModel.js")
const bcrypt=require("bcryptjs")

router.post("/register",async (req,res)=>{
    //checking if already a same user exists in db
    
    try{
        const userExist=await UserModel.findOne({mail: req.body.mail})
       
        if(userExist){
            
            res.send({
                success: true,
                message: "user already exists",
            })
        }

        //hasing the password with added salt using bycrypt npm package
        const salt=await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(req.body.password, salt)
        req.body.password=hashedPassword


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