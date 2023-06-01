import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login, register, fetchAllUser, fetchUser, updateUser, deleteUser } from './authService'


// get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userRequest: (state) => {
            state.isLoading = true
        },
        userSuccess: (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = payload
        },
        userFail: (state, { payload }) => {
            state.isLoading = false
            state.isError = true
            state.message = payload
        },
        reset: (state) => {
            state.user = null
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            localStorage.removeItem('user')
        }
    },
    extraReducers(builder) {
        // login
        builder.
            addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = payload
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.message = payload
            })
        // register
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = payload
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.message = payload
            })
    },
})

// register user
export const registerUser = createAsyncThunk('auth/register', async (userData) => {
    try {
        const { data } = await register(userData)
        return data;
    } catch (error) {
        return error.response.data.message
    }
})

// login user
export const loginUser = createAsyncThunk('auth/login', async (userData) => {
    try {
        const { data } = await login(userData)
        return data;
    } catch (error) {
        return error.response.data.message
    }
})

// fetch all user
export const fetchAllUser = () => async (dispatch) => {
    try {
        dispatch(userRequest())
        const { data } = await fetchAllUser()
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(error.message))
    }
}

// fetch user by id in localstorage
export const fetchUser = () => async (dispatch) => {
    const { id } = JSON.parse(localStorage.getItem('user'))
    try {
        dispatch(userRequest())
        const { data } = await fetchUser(id)
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(error.message))
    }
}

// update user by id in localstorage
export const updateUser = (userData) => async (dispatch) => {
    const { id } = JSON.parse(localStorage.getItem('user'))
    try {
        dispatch(userRequest())
        const { data } = await updateUser(id, userData)
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(error.message))
    }
}

// delete user by id in localstorage
export const deleteUser = () => async (dispatch) => {
    const { id } = JSON.parse(localStorage.getItem('user'))
    try {
        dispatch(userRequest())
        const { data } = await deleteUser(id)
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(error.message))
    }
}

export const { isError, isLoading, isSuccess, message } = (state) => state.auth

export const { reset, userFail, userRequest, userSuccess } = authSlice.actions

export default authSlice.reducer