import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { message, Tabs } from "antd"
import MovieList from "./MovieList"
import Theatrestable from "./TheatresTable"


const Admin = ()=>{
    const navigate=useNavigate()

    const {user} = useSelector((state)=>state.user)
    console.log(user)

    const items = [
        {
            key: '1',
            label: 'Movies',
            children: <MovieList/>,
        },
        {
            key: '2',
            label: 'Theatre Requests',
            children: <Theatrestable/>,
        },
    ];


    //checking if User directs to admin path without admins permission
    useEffect(()=>{
        if(!user.isAdmin){
        message.error(`Hey ${user.name}! You are not an authorized to admin path`)
        navigate("/profile")

        }
    },[])
    


    return (
        <>
            <h1>Welcome to Admin panel!</h1>
            <Tabs defaultActiveKey="1" items={items}/>
        </>
        
        
    )
}

export default Admin