import { createSlice } from "@reduxjs/toolkit";
import { deleteBlog, updateBlog } from "./postService";

const initialState = {
    posts: [],
    error: null,
    currentPost: '',
    updatePost: '',
    deletePost: '',
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        getAllPosts: (state, action) => {
            state.error = null;
            state.posts = Array.isArray(action.payload) ? [...action.payload] : [];
        },
        getCurrentPost: (state, action) => {
            state.error = null;
            state.currentPost = action.payload;
        },
        getPostsFail: (state, action) => {
            state.error = action.payload;
        },
        currentPostRest: (state) => {
            state.error = null;
            state.currentPost = '';
        },
        updateCurrentPost: (state, action) => {
            if (action.payload.id) {
                state.error = null;
                state.updatePost = action.payload;
                updateBlog(state.updatePost.id, state.updatePost);
                state.currentPost = state.currentPost.map((post) => {
                    if (post._id === state.updatePost.id) {
                        return { ...post, ...state.updatePost };
                    }
                    return post;
                });
            }
        },
        deleteCurrentPost: (state, action) => {
            if (action.payload.id) {
                state.error = null;
                state.deletePost = state.posts.filter((post) => post._id !== action.payload.id);
                deleteBlog(state.deletePost.id);
            }
        },

    },
});

export const { posts, error, currentPost, updatePost, deletePost } = (state) => state.posts;

export const { getAllPosts, getCurrentPost, getPostsFail, getPostReset } = postsSlice.actions;

export default postsSlice.reducer;

