import React, { useEffect } from "react";
import { getCurrentUser } from "../apicalls/users";
import { Link, useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import { setUser } from "../redux/userSlice";
//import {clearAuthHeader} from "../apicalls/index"
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu, message } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
const { Header } = Layout;

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  console.log(user, "protected route first")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("token")
    // clearAuthHeader()
    dispatch(setUser(null))
  }


  const navItems = [
    //antd way of creating menu in top navigation
    {
      label: "Home",
      icon: <HomeOutlined />,
    },
    {
      label: `${user ? user.name : " "}`,
      icon: <UserOutlined />,

      children: [
        {
          label: (
            <span
              onClick={() => {
                user.isAdmin ? navigate("/admin") : navigate("/profile");
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link to="/login" onClick={handleLogout}>
              {" "}
              Log out
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  console.log(user);
  const getValidUser = async () => {
    try {
      console.log("iam running", user)
      dispatch(showLoading()); //before the data get fetched
      const response = await getCurrentUser(); //getting the current user deatils
      if (response.success) {
        dispatch(setUser(response.data)); //setting the users data in the redux
        console.log("iam running 2", response, user)
      } else {
        dispatch(setUser(null));
        message.error(response.message);
        
      }
      dispatch(hideLoading()); //hiding the loader when data fetched
      
    } catch (error) {
      dispatch(hideLoading());
      dispatch(setUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    user && (
      <>
        <Layout>
          <Header
            clasName="d-flex justify-content-between"
            style={{
              display: "flex",
              alignItems: "center",
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
            }}
          >
            <h3 className="demo-logo text-white m-0">BookYourTicket</h3>
            <Menu theme="dark" items={navItems} mode="horizontal">
              {" "}
            </Menu>
          </Header>

          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>

        </Layout>
      </>
    )
  );
};

export default ProtectedRoute;
