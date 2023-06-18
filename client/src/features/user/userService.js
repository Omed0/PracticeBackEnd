import * as api from '../../api/index'
import { getAllUsers, getCurrentUser, updateUser, deleteUser, getUserFail } from './userSlice'

// ===================== users =====================//
export const fetchAllUsers = () => async (dispatch) => {
    // const { lastUpdated } = useSelector(state => state.user)
    try {
        const { data } = await api.fetchUsers()
        dispatch(getAllUsers(data.allUser))

        // const updatedLastModified = response.headers.get('Last-Modified');
        // if (updatedLastModified !== lastUpdated) {
        //     dispatch(getAllUsers(response.data.users))
        // }
    } catch (error) {
        dispatch(getUserFail(error.message))
    }
}

// ===================== user =====================//
export const getUserById = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(id)
        dispatch(getCurrentUser(data.userId))
        console.log(data.userId);
    } catch (error) {
        dispatch(getUserFail(error.message))
    }
}

// ===================== update user =====================//
export const updateUserById = (id, user) => async (dispatch) => {
    if (!id) return { message: 'you can not update this user' }
    try {
        const { data } = await api.updateUser(id, user)
        dispatch(updateUser(data.user))
    } catch (error) {
        dispatch(getUserFail(error.message))
    }
}

// ===================== delete user =====================//
export const deleteUserById = (id) => async (dispatch) => {
    if (!id) return { message: 'you can not delete this user' }
    try {
        const { data } = await api.deleteUser(id)
        dispatch(deleteUser(data.deleteUserId))
    } catch (error) {
        dispatch(getUserFail(error.message))
    }
}
