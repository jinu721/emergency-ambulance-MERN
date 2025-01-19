import axios from 'axios'
const BACKEND_BASE_URI = 'http://localhost:5000'
export const axiosUserInstance = axios.create({
    baseURL: `${BACKEND_BASE_URI}/api/users`
})
export const axiosAdminInstance = axios.create({
    baseURL: `${BACKEND_BASE_URI}/api/admin`
})
export const axiosDriverInsance = axios.create({
    baseURL: `${BACKEND_BASE_URI}/api/drivers`
})
export const axiosAmbulanceInstance = axios.create({
    baseURL: `${BACKEND_BASE_URI}/api/ambulances`
})
export const axiosBookingInstance = axios.create({
    baseURL: `${BACKEND_BASE_URI}/api/bookings`
})