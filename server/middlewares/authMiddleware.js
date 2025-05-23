const jwt=require('jsonwebtoken')

module.exports = function (req, res, next){
    try{
        console.log(req.headers.authorization, "check check server")
        let token = req.headers.authorization.split(" ")[1]  //when you send the bearer token it will come as a string like "bearer token"
        console.log(token,"6")                                                  //so avoiding the 1st element in the list when splitted
        let verifiedToken= jwt.verify(token, `${process.env.SECRET_KEY}`)
        console.log(verifiedToken, "server")
        req.body.userId= verifiedToken.userId       //to access this in route iam initializing it to req.body
        next()                                      //while using middle wares, to get return out of this function we use next
    }
    catch(error){
        console.log(error.message)
        res.send({
            success: false,
            message: "Authorization failed, Invalid token"
        })
    }
}