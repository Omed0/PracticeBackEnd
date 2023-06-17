import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    error: null,
    currentPost: '',
    lastUpdated: null,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        createPost: (state, action) => {
            state.error = null;
            state.posts = [...state.posts, action.payload];
            state.lastUpdated = null;
        },
        getAllPosts: (state, action) => {
            state.error = null;
            state.posts = action.payload;
            state.lastUpdated = Date.now();
        },
        getCurrentPost: (state, action) => {
            state.error = null;
            state.currentPost = state.posts.find((post) => post._id === action.payload);
        },
        updateCurrentPost: (state, action) => {
            state.error = null;
            state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
            state.currentPost = action.payload;
        },
        deleteCurrentPost: (state, action) => {
            state.error = null;
            state.posts = state.posts.filter((post) => post._id !== action.payload);
            state.currentPost = '';
        },
        getPostsFail: (state, action) => {
            state.error = action.payload;
        },
        currentPostRest: (state) => {
            state.error = null;
            state.currentPost = '';
        },

    },
});


export const { createPost, getAllPosts, getCurrentPost, updateCurrentPost, deleteCurrentPost, getPostsFail, currentPostRest } = postsSlice.actions;

export default postsSlice.reducer;

