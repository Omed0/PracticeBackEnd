import axios from 'axios'

export const API = axios.create({ baseURL: 'http://localhost:3000/api' },
    { withCredentials: true },
    { headers: { 'Content-Type': 'application/json' } },
    { credentials: 'include' },
    { credentials: 'same-origin' },
    { headers: { 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH' } },
    { headers: { 'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length' } },
)