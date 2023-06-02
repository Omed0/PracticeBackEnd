import { createSlice } from '@reduxjs/toolkit'
import { login, register, fetchUsers, fetchUser, updateUser, deleteUser } from './authService'


const initialState = {
    user: null,
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
            state.user = payload ? payload : null
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
            state.message = 'logout successfully'
            localStorage.clear()
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
                state.user = payload ? payload : null
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.message = payload
            })
        // register
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = payload ? payload : null
            })
            .addCase(register.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.message = payload
            })
    },
})

// register user
export const registerUser = (userData) => async (dispatch) => {
    try {
        const { data } = await register(userData)
        //set user in localstorage
        localStorage.setItem('user', JSON.stringify(data))
    } catch (error) {
        dispatch(userFail(error.message))
    }
}

// login user
export const loginUser = (userData) => async (dispatch) => {
    try {
        const { data } = await login(userData)
        //set user in localstorage
        localStorage.setItem('user', JSON.stringify(data))
    } catch (error) {
        dispatch(userFail(error.message))
    }
}

// logout user
export const logoutUser = () => async (dispatch) => {
    try {
        dispatch(reset())
    } catch (error) {
        dispatch(userFail(error.message))
    }
}

// fetch all user
export const fetchAllUser = () => async (dispatch) => {
    try {
        dispatch(userRequest())
        const { data } = await fetchUsers()
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(error.message))
    }
}

// fetch user by id in localstorage
export const fetchUserById = () => async (dispatch) => {
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
export const updateUserById = (userData) => async (dispatch) => {
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
export const deleteUserById = () => async (dispatch) => {
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