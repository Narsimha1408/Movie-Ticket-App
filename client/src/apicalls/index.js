//creating axios instance
import axios from "axios";
console.log("axios", localStorage.getItem('token'))

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
});

// 👇 This runs before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;


// export const clearAuthHeader = () => {
//     axiosInstance.defaults.headers.Authorization = "";
// };
