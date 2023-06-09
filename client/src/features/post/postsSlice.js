import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading: false,
    error: null,
    success: false,
    selectedPost: null,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        getPostsRequest: (state) => {
            state.loading = true;
        },
        getPostsSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.posts = Array.isArray(action.payload) ? [...action.payload] : [];
        },
        getSelectPost: (state, action) => {
            state.selectedPost = state.posts.find(post => post._id === action.payload._id);
        },
        getPostsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getPostsReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.posts = [];
            state.selectedPost = null;
        },
    },
});


export const { getPostsRequest, getPostsSuccess, getSelectPost, getPostsFail, getPostsReset } = postsSlice.actions;

export default postsSlice.reducer;

