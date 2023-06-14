import { API } from '../api/customAxios'

const auth = JSON.parse(localStorage.getItem('userInfo'));

API.interceptors.request.use((req) => {
    if (auth.token) {
        req.headers.Authorization = `Bearer ${auth.token}`
    }
    return req;
})