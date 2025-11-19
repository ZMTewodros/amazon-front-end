import axios from "axios"
const axiosInstance=axios.create({
       // For local host 👇
    // baseURL:"http://127.0.0.1:5001/clone-1-32115/us-central1/api"

    // deployed version amazon server on render.com 👇
    baseURL:"https://amazon-back-end-8kwz.onrender.com/"

})
export {axiosInstance}