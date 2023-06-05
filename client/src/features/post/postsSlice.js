import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    posts: [],
    loading: false,
    error: null,
    success: false,
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

export const { posts, success, loading, error } = useSelector(state => state.posts);

export const { getPostsRequest, getPostsSuccess, getPostsFail, getPostsReset } = postsSlice.actions;

export default postsSlice.reducer;

