import React from "react";
import {Button} from 'antd'
import TheatreFormComponent from "./TheatreForm";

const TheatreList=()=>{



    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end'}}>
                <Button type="primary">Add Theatres</Button>
            </div>  
            <TheatreFormComponent></TheatreFormComponent>
        </>
    )
}

export default TheatreList;