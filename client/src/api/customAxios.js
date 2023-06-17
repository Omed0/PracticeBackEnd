import axios from 'axios'

export const API = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})


API.interceptors.request.use((req) => {
    const auth = JSON.parse(localStorage.getItem('userInfo'));

    if (auth?.token) {
        req.headers.Authorization = `Bearer ${auth.token}`
    }
    return req;
})