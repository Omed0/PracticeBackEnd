import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isError: false,
    users: [],
    currentUser: '',
    lastUpdated: null, // Store the timestamp or ETag here
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getAllUsers: (state, action) => {
            state.isError = false
            state.users = action.payload
            state.lastUpdated = Date.now()
        },
        getCurrentUser: (state, action) => {
            state.isError = false
            state.currentUser = Object.assign({}, state.users.find((user) => user._id === action.payload))
        },
        updateUser: (state, action) => {
            state.isError = false
            state.users = state.users.map((user) => (user._id === action.payload._id ? action.payload : user))
            state.lastUpdated = Date.now()
        },
        deleteUser: (state, action) => {
            state.isError = false
            state.users = state.users.filter((user) => user._id !== action.payload._id)
            state.lastUpdated = Date.now()
        },
        currentUserReset: (state) => {
            state.isError = false
            state.currentUser = ''
        },
        getUserFail: (state, action) => {
            state.isError = action.payload;
        },
    },
})


export const { getAllUsers, getCurrentUser, updateUser, deleteUser, currentUserReset, getUserFail } = userSlice.actions

export default userSlice.reducer