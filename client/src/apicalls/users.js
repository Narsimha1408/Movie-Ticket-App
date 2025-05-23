import { axiosInstance } from "./index.js";

export const RegisterUser = async (value)=>{
    try{
        const response = await axiosInstance.post("api/user/register", value)
        return response.data

    }catch(error){
        console.log(error)
    }
}

export const LoginUser = async (value)=>{
    try{
        const response= await axiosInstance.post("api/user/login",value)
        console.log(response.data)
        return response.data
        
    }catch(error){
        console.log(error)
    }
}

export const getCurrentUser  = async ()=>{
    try{
        console.log(localStorage.getItem('token'),"check")
        const response = await axiosInstance.get("api/user/get-current-user")
        return response.data
    }catch(error){
        console.log(error)
    }
}