const express=require("express")
const router=express.Router()
const UserModel=require("../models/UserModel.js")
const bcrypt=require("bcryptjs")

//user register route
router.post("/register",async (req,res)=>{
    //checking if already a same user exists in db
    
    try{
        const userExist=await UserModel.findOne({email: req.body.email})
       
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


router.post("/login",async (req,res)=>{
    try {
        const user= await UserModel.findOne({email: req.body.email})
        
        if(!user){
            res.send({
                success: false,
                message: "Please register yourself before logging in"
            })
        }
        //if entered email is already registered, then comparing the passwords
        const validPassword= await bcrypt.compare(req.body.password, user.password) //returns true or false
        if(!validPassword){
            res.send({
                success: false,
                message: "please enter a valid password"
            })
        }
        res.send({
            success: true,
            message: "user login successful"
        })
        
    } catch (error) {
        console.log(error)
    }
})
module.exports=router