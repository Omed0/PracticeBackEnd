import { API } from '../../api/customAxios'
import { SignIn, AuthApiFail } from './authSlice'

//===================== AUTH =====================//

//register user
export const RegisterUser = (userData) => async (dispatch) => {
    try {
        const response = await API.post('/auth/signup', userData)
        if (response.status === 200) {
            console.log(response.data);
            dispatch(SignIn(response.data))
        } else {
            dispatch(AuthApiFail(response.data.message))
        }
    } catch (error) {
        dispatch(AuthApiFail(error))
    }
}

//login user
export const LoginUser = (userData) => async (dispatch) => {
    try {
        const response = await API.post('/auth/signin', userData)
        if (response.status === 200) {
            dispatch(SignIn(response.data))
        } else {
            dispatch(AuthApiFail(response.data.message))
        }
    } catch (error) {
        dispatch(AuthApiFail(error))
    }
}