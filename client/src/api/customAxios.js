import axios from 'axios'

export const API = axios.create({ baseURL: 'http://localhost:3000/api' },
    { Credential: true },
    { Headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' } },
    { Headers: { 'Access-Control-Allow-Methods': 'GET,PUT,PATCH,POST,DELETE' } },
    { Headers: { 'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Authorization, application/json" } },
)