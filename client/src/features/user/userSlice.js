import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers, fetchUser, updateUser, deleteUser } from './userService'

const initialState = {
    isError: false,
    isLoading: false,
    users: [],
    currentUser: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {

        builder  //get All Users
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })

        builder  //get Current User
            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.currentUser = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })

        builder //update User
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.currentUser = action.payload
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })

        builder //delete User
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.currentUser = []
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })
    }
})



export default authSlice.reducer
