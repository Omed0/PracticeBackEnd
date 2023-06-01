import { createSlice } from '@reduxjs/toolkit'
import { login, register } from './authService'


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
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
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
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = payload
            })
            .addCase(register.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.message = payload
            })
    },
})

export const selectUser = (state) => state.auth.user
export const selectIsLoading = (state) => state.auth.isLoading
export const selectIsError = (state) => state.auth.isError
export const selectIsSuccess = (state) => state.auth.isSuccess
export const selectMessage = (state) => state.auth.message

export const { reset } = authSlice.actions

export default authSlice.reducer