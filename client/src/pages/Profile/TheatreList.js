import React, { useState } from "react";
import {Button} from 'antd'
import TheatreFormComponent from "./TheatreForm";

const TheatreList=()=>{

    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div>
                <div style={{ display: 'flex', justifyContent: 'end'}}>
                    <Button type="primary" onClick={()=>{setIsModalOpen(true)}}>Add Theatres</Button>
                </div>  
                {isModalOpen && <TheatreFormComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>}
            </div>
        </>
    )
}

export default TheatreList;