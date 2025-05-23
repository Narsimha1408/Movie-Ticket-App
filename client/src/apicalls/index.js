//creating axios instance
import axios from "axios";
const token = localStorage.getItem('token');
console.log("Token before setting Axios headers:", token);

export const axiosInstance = axios.create({
    
    headers: {'Content-Type':'application/json', Authorization : `Bearer ${localStorage.getItem('token')}`}
})