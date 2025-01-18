import axios from 'axios'
const BACKEND_BASE_URI = 'http://192.168.112.67:5000'
export const axiosUserInstance = axios.create({
    baseURL: `${BACKEND_BASE_URI}/api/users`
})
export const axiosAdminInstance = axios.create({
    baseURL: `${BACKEND_BASE_URI}/api/admin`
})