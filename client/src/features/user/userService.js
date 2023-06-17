import * as api from '../../api/index'
import { useSelector } from 'react-redux'
import { getAllUsers, getCurrentUser, updateUser, deleteUser } from './userSlice'

// ===================== users =====================//
export const fetchAllUsers = () => async (dispatch) => {
    const { lastUpdated } = useSelector(state => state.user)
    try {
        const response = await api.fetchUsers()
        const updatedLastModified = response.headers.get('Last-Modified');

        if (updatedLastModified !== lastUpdated) {
            dispatch(getAllUsers(response.data.users))
        }
    } catch (error) {
        return { message: 'you can not get users', error }
    }
}

// ===================== user =====================//
export const getUserById = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(id)
        dispatch(getCurrentUser(data.user))
    } catch (error) {
        return { message: 'you can not get this user', error }
    }
}

// ===================== update user =====================//
export const updateUserById = (id, user) => async (dispatch) => {
    if (!id) return { message: 'you can not update this user' }
    try {
        const { data } = await api.updateUser(id, user)
        dispatch(updateUser(data.user))
    } catch (error) {
        return { message: 'you can not update this user', error }
    }
}

// ===================== delete user =====================//
export const deleteUserById = (id) => async (dispatch) => {
    if (!id) return { message: 'you can not delete this user' }
    try {
        const { data } = await api.deleteUser(id)
        dispatch(deleteUser(data.deleteUser))
    } catch (error) {
        return { message: 'you can not delete this user', error }
    }
}
