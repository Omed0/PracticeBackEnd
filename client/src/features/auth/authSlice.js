import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isError: false,
    userCredintial: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SignIn: (state, action) => {
            state.userCredintial = Array.isArray(action.payload) ? action.payload[0] : action.payload
            localStorage.setItem('userInfo', JSON.stringify(state.userCredintial))
        },
        Auth: (state) => {
            if (localStorage.getItem('userInfo')) {
                const auth = JSON.parse(localStorage.getItem('userInfo'))
                state.userCredintial = Array.isArray(auth) ? auth[0] : auth
            } else {
                state.isError = "You don't have Permission to access this page"
            }
        },

        UserFail: (state, action) => {
            state.userCredintial = []
            state.isError = action.payload
        },
        Logout: (state) => {
            state.isError = false
            state.userCredintial = []
            localStorage.removeItem('userInfo')
        }
    },
})

export const { SignIn, Auth, UserFail, Logout } = authSlice.actions

export default authSlice.reducer