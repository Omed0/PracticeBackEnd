import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isError: false,
    users: [],
    currentUser: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getAllUsers: (state, action) => {
            state.users = action.payload
        },
        getCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        updateUser: (state, action) => {
            state.users = state.users.map((user) => (user._id === action.payload._id ? action.payload : user))
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user._id !== action.payload._id)
        }
    },
})


export const { getAllUsers, getCurrentUser, updateUser, deleteUser } = userSlice.actions

export default userSlice.reducer