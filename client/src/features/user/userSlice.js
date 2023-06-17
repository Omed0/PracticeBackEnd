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
            state.users = action.payload
            state.lastUpdated = Date.now()
        },
        getCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        updateUser: (state, action) => {
            state.users = state.users.map((user) => (user._id === action.payload._id ? action.payload : user))
            state.lastUpdated = Date.now()
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user._id !== action.payload._id)
            state.lastUpdated = Date.now()
        }
    },
})


export const { getAllUsers, getCurrentUser, updateUser, deleteUser } = userSlice.actions

export default userSlice.reducer