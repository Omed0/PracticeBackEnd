import { API } from '../../api/customAxios'
import { SignIn, UserFail } from '../auth/authSlice'

//===================== AUTH =====================//

//register user
export const RegisterUser = (userData) => async (dispatch) => {
    try {
        const response = await API.post('/auth/signup', userData)
        if (response.status === 200) {
            console.log(response.data);
            dispatch(SignIn(response.data))
        } else {
            dispatch(UserFail(response.data.message))
        }
    } catch (error) {
        dispatch(UserFail(error))
    }
}

//login user
export const LoginUser = (userData) => async (dispatch) => {
    try {
        const response = await API.post('/auth/signin', userData)
        if (response.status === 200) {
            dispatch(SignIn(response.data))
        } else {
            dispatch(UserFail(response.data.message))
        }
    } catch (error) {
        dispatch(UserFail(error))
    }
}

// ===================== users =====================//
export const fetchUsers = () => async (dispatch) => {
    try {
        const { data } = await API.get('/auth')
        return data
    } catch (error) {
        dispatch(UserFail(error))
    }
}

//fetch user by id in localstorage
export const fetchUser = (id) => async (dispatch) => {
    try {
        const { data } = await API.get(`/auth/${id}`)
        return data
    } catch (error) {
        dispatch(UserFail(error))
    }
}
//dalete user by id in localstorage
export const deleteUser = () => async (dispatch) => {
    const { id } = JSON.parse(localStorage.getItem('userInfo'))
    try {
        const { data } = await API.delete(`/auth/${id}`)
        return data
    } catch (error) {
        dispatch(UserFail(error))
    }
}

//update user by id in localstorage
export const updateUser = () => async (dispatch) => {
    const { id } = JSON.parse(localStorage.getItem('userInfo'))
    try {
        const { data } = await API.put(`/auth/${id}`)
        dispatch(signIn(data))
    } catch (error) {
        dispatch(UserFail(error))
    }
}