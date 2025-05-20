import React, { useEffect } from 'react'
import { getCurrentUser } from '../apicalls/users'
import { Link, useNavigate } from 'react-router-dom'
import { showLoading, hideLoading } from '../redux/loaderSlice'
import { setUser } from '../redux/userSlice'
import { useDispatch, useSelector} from 'react-redux'
import { Layout, Menu } from 'antd';
import {HomeOutlined, UserOutlined, ProfileOutlined, LogoutOutlined} from '@ant-design/icons'
const { Header, Footer, Sider, Content } = Layout;



const ProtectedRoute=({children})=>{
    
    const {user} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const navItems=[   //antd way of creating menu in top navigation
        {
            label: 'Home',
            icon: <HomeOutlined />,
        },
        {
            label: `${user? user.name: " "}`,
            icon: <UserOutlined />,

            children: [{
                label: 'My Profile',
                icon: <ProfileOutlined />,
            },
            {
                label: (<Link to="/login" onClick={()=>localStorage.removeItem('token')}> Log out</Link>),
                icon: <LogoutOutlined />
            }
        
        ]
        },

    ] 



    console.log(user)
    const getValidUser = async ()=>{
        try{
            dispatch(showLoading()) //before the data get fetched
            const response = await getCurrentUser() //getting the current user deatils 
            
            dispatch(setUser(response.data)) //setting the users data in the redux
            dispatch(hideLoading()) //hiding the loader when data fetched
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            getValidUser() 
        }else{
            navigate('/login')
        }
    },[])

  return (
    user && (
        <>
            <Layout>
                <Header clasName="d-flex justify-content-between" 
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'sticky',
                    top:0,
                    zIndex:1,
                    width:"100%",
                    }}>
                    <h3 className='demo-logo text-white m-0'>BookYourTicket</h3>
                    <Menu theme='dark' items={navItems} mode="horizontal"> </Menu> 
                </Header>
            </Layout>

        </>
    )
  )
}

export default ProtectedRoute