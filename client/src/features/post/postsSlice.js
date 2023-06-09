import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    error: null,
    selectedPost: null,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        getPostsSuccess: (state, action) => {
            state.posts = Array.isArray(action.payload) ? [...action.payload] : [];
        },
        getSelectPost: (state, action) => {
            state.selectedPost = action.payload;
        },
        getPostsFail: (state, action) => {
            state.error = action.payload;
        },
        getPostReset: (state, action) => {
            if (action.payload.id) {
                state.selectedPost = null;
            }
        },
    },
});


export const { getPostsSuccess, getSelectPost, getPostsFail, getPostReset } = postsSlice.actions;

export default postsSlice.reducer;

