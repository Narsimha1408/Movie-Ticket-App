import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { message } from "antd"

const Admin = ()=>{
    const navigate=useNavigate()

    const {user} = useSelector((state)=>state.user)
    console.log(user)


    //checking if User directs to admin path without admins permission
    useEffect(()=>{
        if(!user.isAdmin){
        message.error(`Hey ${user.name}! You are not an authorized to admin path`)
        navigate("/profile")

        }
    },[])
    


    return (
        <div>his is Admins page</div>
    )
}

export default Admin