import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createPost, fetchPosts, specificPost, updatePost, deletePost } from "./postService";

var initialState = {
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
        dispatch(postRequest());
        const { data } = await createPost(initialPost);
        dispatch(postSuccess(data));
    } catch (error) {
        dispatch(postFail(error.message));
    }
};

// fetch all posts
export const fetchPostsAction = () => async (dispatch) => {
    try {
        dispatch(postRequest());
        const { data } = await fetchPosts();
        dispatch(postSuccess(data));
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



export const { postRequest, postSuccess, postFail, postReset } = postSlice.actions;

export default postSlice.reducer;

