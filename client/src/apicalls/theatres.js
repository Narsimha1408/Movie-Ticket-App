import { axiosInstance } from "./index.js";

//theatre api calls based on server routes

export const RegisterTheatre = async (payload)=>{
    try{
        const response = await axiosInstance.post("api/theatre/add-theatre", payload)
        return response.data

    }catch(error){
        console.log(error)
    }
}

export const UpdateTheatre = async (payload)=>{

    try{
        const response = await axiosInstance.put("api/theatre/update-theatre", payload)
        return response.data

    }
    catch(error){

        console.log(error)
    }

}

export const DeleteTheatre = async (payload) => {

    try{
        const response= await axiosInstance.delete("api/theatre/delete-theatre", payload)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}