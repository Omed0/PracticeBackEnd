import { API } from '../../api/customAxios'
import { createAsyncThunk } from '@reduxjs/toolkit'


// ===================== users =====================//
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        try {
            const { data } = await API.get('/auth')
            return data
        } catch (error) {
            return error
        }
    })

//fetch user by id in localstorage
export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async () => {
        const { id } = JSON.parse(localStorage.getItem('userInfo'))
        try {
            const { data } = await API.get(`/auth/${id}`)
            return data
        } catch (error) {
            return error
        }
    })

//dalete user by id in localstorage
export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async () => {
        const { id } = JSON.parse(localStorage.getItem('userInfo'))
        try {
            const { data } = await API.delete(`/auth/${id}`)
            return data
        } catch (error) {
            return error
        }
    })

//update user by id in localstorage
export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (user) => {
        const { id } = JSON.parse(localStorage.getItem('userInfo'))
        try {
            const { data } = await API.patch(`/auth/${id}`, user)
            return data
        } catch (error) {
            return error
        }
    })