import { SignIn, AuthApiFail } from './authSlice'
import * as api from '../../api/index'

//===================== AUTH =====================//

//register user
export const RegisterUser = (userData) => async (dispatch) => {
    try {
        const response = await api.signUp(userData)
        if (response.status === 201) {
            dispatch(SignIn(response.data))
        }
        return response.status
    } catch (error) {
        dispatch(AuthApiFail(error.message))
    }
}

//login user
export const LoginUser = (userData) => async (dispatch) => {
    try {
        const response = await api.signIn(userData)
        if (response.status === 200) {
            dispatch(SignIn(response.data))
        }
        return response.status
    } catch (error) {
        dispatch(AuthApiFail(error.message))
    }
}