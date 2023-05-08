import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


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
    extraReducers: {
        // login
        [login.pending]: (state) => {
            state.isLoading = true
        },
        [login.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = payload
        },
        [login.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.isError = true
            state.message = payload
        },
        // register
        [register.pending]: (state) => {
            state.isLoading = true
        },
        [register.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = payload
        },
        [register.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.isError = true
            state.message = payload
        },
    },

})

export const { reset } = authSlice.actions

export default authSlice.reducer