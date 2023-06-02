import { API } from '../api/customAxios'


API.interceptors.request.use((req) => {
    if (JSON.parse(localStorage.getItem('user')).token) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
    return req;
})