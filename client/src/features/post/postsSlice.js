import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    posts: [],
    loading: false,
    error: null,
    success: false,
    selectedPost: [],
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

            if (state.selectedPost) {
                state.selectedPost = state.posts.find(post => post._id === state.selectedPost._id);
            }
        },
        selectPost: (state, action) => {
            const postId = action.payload._id;
            state.selectedPost = state.posts.find(post => post._id === postId);
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
        },
    },
});

export const { posts, success, loading, error, selectedPost } = useSelector(state => state.posts);

export const { getPostsRequest, getPostsSuccess, getPostsFail, getPostsReset, selectPost } = postsSlice.actions;

export default postsSlice.reducer;

