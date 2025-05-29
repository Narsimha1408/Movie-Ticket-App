import React, { useEffect, useState } from "react";
import {Button} from 'antd';
import { EditFilled } from '@ant-design/icons'
import TheatreFormComponent from "./TheatreForm";
import { useSelector } from "react-redux";
import { GetAllTheatres } from "../../apicalls/theatres";

const TheatreList=()=>{
    const {user} = useSelector((state)=>state.user)
    const [isModalOpen, setIsModalOpen] = useState(false)


    const getTheatresData= async ()=>{
        try{
        const theatresData = await GetAllTheatres({owner: user._id})
            console.log(theatresData)
        }
        catch(error){
            console.log(error)
        }



    }
    useEffect(() => {
        if (user) {
        getTheatresData();
        }
    }, [user]);
    return (
        <>
            <div>
                <div style={{ display: 'flex', justifyContent: 'end'}}>
                    <Button type="primary" onClick={()=>{setIsModalOpen(true)}}>Add Theatres</Button>
                </div>  
                <div>
                    <button onClick={()=>{setIsModalOpen(true)}}><EditFilled /></button>
                </div>
                {isModalOpen && <TheatreFormComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} getTheatresData={getTheatresData}/>}
            </div>
        </>
    )
}

export default TheatreList;