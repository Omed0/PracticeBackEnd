import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    isError: false,
    userCredintial: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, { payload }) => {
            const auth = state.userCredintial = payload
            localStorage.setItem('userInfo', JSON.stringify(auth))
        },
        login: (state, { payload }) => {
            const auth = state.userCredintial = payload
            localStorage.setItem('userInfo', JSON.stringify(auth))
        },
        auth: (state) => {
            if (localStorage.getItem('userInfo')) {
                const auth = JSON.parse(localStorage.getItem('userInfo'))
                state.userCredintial = auth
            } else {
                state.isError = "You don't have Permission to access this page"
            }
        },
        userSuccess: (state, { payload }) => {
            state.users = Array.isArray(payload) ? [...payload] : [payload]
        },
        userFail: (state, { payload }) => {
            state.isError = payload
        },
        logout: (state) => {
            state.users = []
            state.isError = false
            localStorage.removeItem('userInfo')
        }
    },
})

export const { register, login, auth, userFail, logout } = authSlice.actions

export default authSlice.reducer