import React, { useEffect, useState } from "react";
import {Button, message} from 'antd';
import { EditFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import TheatreFormComponent from "./TheatreForm";
import { useSelector } from "react-redux";
import { GetAllTheatres } from "../../apicalls/theatres";
import { Table, } from 'antd';
import DeleteTheatreModel from "./DeleteTheatreModel";

const TheatreList=()=>{
    const {user} = useSelector((state)=>state.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [theatres, setTheatres] = useState(null);
    const [formType, setFormType] = useState("add");
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)


    const getTheatresData= async ()=>{
        try{
            const response = await GetAllTheatres({owner: user._id})
            console.log(response)

            if(response.success){
                const allTheatres = response.data

                //adding key which is used for antd table
                setTheatres(allTheatres.map((item)=>{    
                    return {...item, key: `theatre${item._id}`}
                }))
            }else{
                message.error(response.message)
            }
            
        }
        catch(error){
            message.error(error.message);
        }

    }

    //these cols are antd format by default
    const columns=[
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Phone Number',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Status',
          dataIndex: 'status',
          render: (status, data)=>{
            let color = data.status ? "green" : "red"
            return <span style={{"color": color}}>
                {data.status ? "Approved" : "Pending/ Blocked" }
            </span>
          }
        },
        {
            title : 'Action',
            dataIndex: 'action',
            render: (text, data) =>{
                console.log(data)
                return (
                    <div className="d-flex gap-10">
                        <Button onClick={()=>{setIsModalOpen(true); setFormType("edit"); setSelectedTheatre(data)}}><EditOutlined/></Button>
                        <Button onClick={()=>{setIsDeleteModalOpen(true); setSelectedTheatre(data)}}><DeleteOutlined/></Button>
                    </div>
                )
            }
        }


    ]

    //getting the theatres list when component mounted
    useEffect(() => {
        if (user) {
        getTheatresData();
        }
    }, [user]);

    return (
        <>
            <div>
                <div style={{ display: 'flex', justifyContent: 'end'}}>
                    <Button type="primary" onClick={()=>{setIsModalOpen(true); setFormType("add")}}>Add Theatres</Button>
                </div>  
                {/* adding antd table */}

                <Table columns={columns} dataSource={theatres} />

                {/* Form modal when you click on add theatres or edit theatres */}
                {isModalOpen && <TheatreFormComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} getTheatresData={getTheatresData} formType={formType} selectedTheatre={selectedTheatre} setSelectedTheatre={setSelectedTheatre}/>}

                {/* Modal when you click on delete theatre */}
                {
                    isDeleteModalOpen && <DeleteTheatreModel isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} selectedTheatre={selectedTheatre} setSelectedTheatre={setSelectedTheatre} getTheatresData={getTheatresData}/>
                }
            </div>
        </>
    )
}

export default TheatreList;