import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers, fetchUser, updateUser, deleteUser } from './userService'

const initialState = {
    isError: false,
    isLoading: false,
    users: [],
    currentUser: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {

        builder  //loading state 
            .addCase(fetchUsers.pending || fetchUser.pending || updateUser.pending || deleteUser.pending, (state) => {
                state.isLoading = true
            })

        builder  //get All Users
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.users = [...action.payload]
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })

        builder  //get Current User
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.currentUser = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false
                state.currentUser = ''
                state.isError = action.payload
            })

        builder //update User
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.currentUser = { ...state.currentUser, ...action.payload }

            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })

        builder //delete User
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.currentUser = ''
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })
    }
})

export const { currentUser, users, isLoading, isError } = (state) => state.auth

export default authSlice.reducer
