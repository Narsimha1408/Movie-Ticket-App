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
        return response.data
    }catch(error){
        console.log(error)
    }
}