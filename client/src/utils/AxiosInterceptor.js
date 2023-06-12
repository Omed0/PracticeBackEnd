import { API } from '../api/customAxios'

const auth = JSON.parse(localStorage.getItem('userInfo'));

API.interceptors.request.use((req) => {
    if (auth[0].token) {
        req.headers.Authorization = `Bearer ${auth[0].token}`
    }
    return req;
})