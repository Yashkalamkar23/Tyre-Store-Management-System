import axios from "axios"
const api = axios.create({
     baseURL : 'https://tyre-store-management-system.onrender.com'
    // baseURL : 'http://localhost:3000'
})
export default api
