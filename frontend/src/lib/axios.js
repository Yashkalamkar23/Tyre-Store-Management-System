import axios from "axios"
const api = axios.create({
    // baseURL : 'https://mern-bookstore-lerh.onrender.com'
    baseURL : 'http://localhost:3000'
})
export default api