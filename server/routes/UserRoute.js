const express=require("express")
const router=express.Router()
const UserModel=require("../models/UserModel.js")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const authMiddleware=require('../middlewares/authMiddleware.js')

//user register route
router.post("/register",async (req,res)=>{
    //checking if already a same user exists in db
    
    try{
        const userExist=await UserModel.findOne({email: req.body.email})
       
        if(userExist){
            
            res.send({
                success: false,
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

//user login route
router.post("/login",async (req,res)=>{
    try {
        const user= await UserModel.findOne({email: req.body.email})
        console.log(user)
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
        //crating the JWT when a user logs in
        const token = jwt.sign({userId:user._id},`${process.env.SECRET_KEY}`,{expiresIn:'1d'})

        res.send({
            success: true,
            user: user,
            message: "user login successful",
            token: token
        })
        
    } catch (error) {
        console.log(error)
    }
})


router.get("/get-current-user",authMiddleware,async (req,res)=>{
    const user= await UserModel.findById(req.body.userId).select("-password")
    console.log(user,"82")
    res.send({
        success: true,
        message: "User authorized and token validated",
        data: user,
    })
})

module.exports=router