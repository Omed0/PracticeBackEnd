import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createPost, fetchPosts, specificPost, updatePost, deletePost } from "./postService";

const initialState = {
    post: [],
    loading: false,
    error: null,
    success: false,
    message: '', // for error message or success message
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        postRequest: (state) => {
            state.loading = true;
        },
        postSuccess: (state, { payload }) => {
            state.loading = false;
            state.success = true;
            state.post = payload;

        },
        postFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.message = payload;
        },
        postReset: (state) => {
            state.success = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
                state.post = payload;
            })
            .addCase(createPost.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
                state.post = payload;
            })
            .addCase(fetchPosts.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
    }
});

// create post
export const createPostAction = (initialPost) => async (dispatch) => {
    try {
        await dispatch(createPost(initialPost))
    } catch (error) {
        dispatch(postFail(error.message));
    }
};

// fetch all posts
export const fetchPostsAction = () => async (dispatch) => {
    try {
        await dispatch(fetchPosts());
    } catch (error) {
        dispatch(postFail(error.message));
    }
};

// user by id
export const specificPostAction = (id) => async (dispatch) => {
    try {
        dispatch(postRequest());
        const { data } = await specificPost(id);
        dispatch(postSuccess(data));
    } catch (error) {
        dispatch(postFail(error.message));
    }
};

export const updatePostAction = (id, post) => async (dispatch) => {
    try {
        dispatch(postRequest());
        const { data } = await updatePost(id, post);
        dispatch(postSuccess(data));
    } catch (error) {
        dispatch(postFail(error.message));
    }
};

export const deletePostAction = (id) => async (dispatch) => {
    try {
        dispatch(postRequest());
        const { data } = await deletePost(id);
        dispatch(postSuccess(data));
    } catch (error) {
        dispatch(postFail(error.message));
    }
};

const selectAllPosts = (state) => state.post.post;
const selectLoading = (state) => state.post.loading;
const selectError = (state) => state.post.error;
const selectSuccess = (state) => state.post.success;
const selectMessage = (state) => state.post.message;

export const getAllBlogs = useSelector(selectAllPosts);
export const getLoading = useSelector(selectLoading);
export const getError = useSelector(selectError);
export const getSuccess = useSelector(selectSuccess);
export const getMessage = useSelector(selectMessage);


export const { postRequest, postSuccess, postFail, postReset } = postSlice.actions;

export default postSlice.reducer;

