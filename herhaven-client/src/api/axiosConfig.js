import axios from "axios";

// Set backend base URL
const API_BASE_URL = "http://localhost:8080"; 

// Create Axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    
});


export default axiosInstance;
