import { API } from '../../api/customAxios'
import { createAsyncThunk } from '@reduxjs/toolkit'


//===================== AUTH =====================//
//register user
export const register = createAsyncThunk("auth/register", async (userData) => {
    try {
        const response = await API.post('/auth/signup', userData)
        return response.data
    } catch (error) {
        return error.response.data.message
    }
})
//login user
export const login = createAsyncThunk("auth/login", async (userData) => {
    try {
        const response = await API.post('/auth/signin', userData)
        return response.data
    } catch (error) {
        return error.response.data.message
    }
})

// ===================== users =====================//
export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
    try {
        const response = await API.get(`/auth`);
        if (response?.status === 200) return response.data;
        return `${response.status} : ${response.statusText}`;
    }
    catch (error) {
        return error.message
    }
})
//fetch user by id in localstorage
export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
    const { id } = JSON.parse(localStorage.getItem('userInfo'))
    try {
        const response = await API.get(`/auth/${id}`)
        if (id && response.status === 200) return response.data
        return `${response.status} : ${response.statusText}`
    } catch (error) {
        return error.response.data.message
    }
})
//dalete user by id in localstorage
export const deleteUser = createAsyncThunk("auth/deleteUser", async () => {
    const { id } = JSON.parse(localStorage.getItem('userInfo'))
    try {
        const response = await API.delete(`/auth/${id}`)
        if (id && response.status === 200) return response.data
        return `${response.status} : ${response.statusText}`
    } catch (error) {
        return error.response.data.message
    }
})
//update user by id in localstorage
export const updateUser = createAsyncThunk("auth/updateUser", async (userData) => {
    const { id } = JSON.parse(localStorage.getItem('userInfo'))
    try {
        const response = await API.patch(`/auth/${id}`, userData)
        if (id && response.status === 200) return response.data
        return `${response.status} : ${response.statusText}`
    } catch (error) {
        return error.response.data.message
    }
})