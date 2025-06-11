import { useState, useEffect} from "react";
import { GetAllTheatresForAdmin } from "../../apicalls/theatres";
import { message, Button, Table} from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";


const Theatrestable = ()=>{
    const dispatch=useDispatch()
    const [Theatres, setTheatres] = useState([])

    const getData= async ()=>{
        try{
            dispatch(showLoading()) //show loader icon
            const response = await GetAllTheatresForAdmin()
            if(response.success){
                const allTheatres = response.data
                console.log(allTheatres)
                setTheatres(allTheatres.map(function(item){
                    return {...item, key: `theatre${item._id}`}
                }))
                message.success(response.message)

            }else{
                message.error(response.message)
            }
        }
        catch(error){
            message.error(error.message)
        }
        finally{
            dispatch(hideLoading()) // hiding the loader icon
        }

    }

    useEffect(()=>{
        getData()
    },[])

    const handleStatusChange=()=>{

    }
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
            title: 'Owner',
            dataIndex: 'owner',
            render: (text, data) =>{   //this data paremeter holds the data of Theatres which is passed for dataSource prop
                                        // in a table element
                return data.owner?.name;
            }
        },

        {
            title:'Status',
            dataIndex: 'status',
            render: (text, data)=>{
                if(data.status){
                    return "Approved"
                }else{
                    return "Pending/ Blocked"
                }
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, data)=>{
                return (
                    <div>
                        {data.status ? <Button onClick={()=>handleStatusChange(data)}>Block</Button> : <Button onClick={()=>handleStatusChange(data)}>Approve</Button>}
                    </div>
                )
            }

        }



    ]


    return (
        <>
        <p>this is Theatres table</p>
        <Table columns={columns} dataSource={Theatres} />
        </>
    )
}

export default Theatrestable;