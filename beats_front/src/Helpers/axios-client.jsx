import axios from 'axios'

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axios.interceptors.request.use(request => {
    const token = localStorage.getItem("sessionID")
    request.headers.Authorization = `Bearer ${token}`
})

axios.interceptors.response.use((response) => {

    return response
}, (error) => {
    const {responseError} = error

    if(responseError) {
        localStorage.removeItem('sessionID')
    }

    throw error 
})


export default axiosClient