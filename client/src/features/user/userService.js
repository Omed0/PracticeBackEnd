import * as api from '../../api/index'
import { useSelector } from 'react-redux'
import { getAllUsers, getCurrentUser, updateUser, deleteUser, currentUser } from './userSlice'

// ===================== users =====================//
export const fetchUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers()
        dispatch(getAllUsers(data.allUser))
    } catch (error) {
        return { message: 'you can not get users', error }
    }
}

// ===================== user =====================//
export const fetchUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(id)
        dispatch(getCurrentUser(data.user))
    } catch (error) {
        return { message: 'you can not get this user', error }
    }
}

// ===================== update user =====================//
export const updateUser = (id, user) => async (dispatch) => {
    const { _id } = useSelector(currentUser)
    if (_id !== id) return { message: 'you can not update this user' }
    try {
        const { data } = await api.updateUser(id, user)
        dispatch(updateUser(data.user))
    } catch (error) {
        return { message: 'you can not update this user', error }
    }
}

// ===================== delete user =====================//
export const deleteUser = (id) => async (dispatch) => {
    const { _id } = useSelector(currentUser)
    if (_id !== id) return { message: 'you can not delete this user' }
    try {
        const { data } = await api.deleteUser(id)
        dispatch(deleteUser(data.deleteUser))
    } catch (error) {
        return { message: 'you can not delete this user', error }
    }
}
