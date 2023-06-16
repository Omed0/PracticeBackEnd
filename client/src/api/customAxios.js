import axios from 'axios'

export const API = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

const auth = JSON.parse(localStorage.getItem('userInfo'));

API.interceptors.request.use((req) => {
    if (auth.token) {
        req.headers.Authorization = `Bearer ${auth.token}`
    }
    return req;
})