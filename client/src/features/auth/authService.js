import { API } from '../../api/customAxios'
import { register, login, auth, logout, userFail } from '../auth/authSlice'

//===================== AUTH =====================//

//register user
export const RegisterUser = (userData) => async (dispatch) => {
    try {
        const { data } = await API.post('/auth/signup', userData)
        dispatch(register(data))
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}

//login user
export const LoginUser = (userData) => async (dispatch) => {
    try {
        const { data } = await API.post('/auth/signin', userData)
        dispatch(login(data))
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}

// ===================== users =====================//
export const fetchUsers = () => async (dispatch) => {
    try {
        const { data } = await API.get('/auth')
        dispatch(getPostsSuccess(data))
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}

//fetch user by id in localstorage
export const fetchUser = (id) => async (dispatch) => {
    try {
        const { data } = await API.get(`/auth/${id}`)
        dispatch(getPostsSuccess(data))
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}
//dalete user by id in localstorage
export const deleteUser = () => async (dispatch) => {
    const { id } = JSON.parse(localStorage.getItem('userInfo'))
    try {
        const { data } = await API.delete(`/auth/${id}`)
        dispatch(getPostsSuccess(data))
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}

//update user by id in localstorage
export const updateUser = () => async (dispatch) => {
    const { id } = JSON.parse(localStorage.getItem('userInfo'))
    try {
        const { data } = await API.put(`/auth/${id}`)
        dispatch(getPostsSuccess(data))
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}