const jwt=require('jsonwebtoken')

module.exports = function (req, res, next){

    let token = req.headers.authorization.split(" ")[1]  //when you send the bearer token it will come as a string like "bearer token"
                                                         //so avoiding the 1st element in the list when splitted
    let verifiedToken= jwt.verify(token, `${process.env.SECRET_KEY}`)
    console.log(verifiedToken)
    next()                                      //while using middle wares, to get return out of this function we use next
}