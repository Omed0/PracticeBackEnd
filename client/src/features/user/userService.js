import { API } from '../../api/customAxios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { currentUser } from './userSlice'

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

// ===================== user =====================//
export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async (id) => {
        try {
            const { data } = await API.get(`/auth/${id}`)
            return data
        } catch (error) {
            return error
        }
    })

// ===================== update user =====================//
export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (id, user) => {
        const { _id } = useSelector(currentUser)
        if (_id !== id) return { message: 'you can not update this user' }
        try {
            const { data } = await API.patch(`/auth/${id}`, user)
            return data
        } catch (error) {
            return { message: 'you can not update this user', error }
        }
    })

// ===================== delete user =====================//
export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id) => {
        const { _id } = useSelector(currentUser)
        if (_id !== id) return { message: 'you can not delete this user' }
        try {
            const { data } = await API.delete(`/auth/${id}`)
            return data
        } catch (error) {
            return error
        }
    })
