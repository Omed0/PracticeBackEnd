import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


const initialState = {
    post: [],
    loading: false,
    error: null,
    success: false,
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        // get specific post
        getSpecificRequest: (state) => {
            state.loading = true;
        },
        getSpecificSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.post = Array.isArray(action.payload) ? [...action.payload] : [];
        },
        getSpecificFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // update
        updateSpecificSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.post = Array.isArray(action.payload) ? [...action.payload] : [];
        },
        //delete
        deleteSpecificSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.post = Array.isArray(action.payload) ? [...action.payload] : [];
        },
        //reset
        getSpecificReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.post = [];
        },
    },
});


export const { post, success, loading, error } = useSelector(state => state.post);

export const { getPostsRequest, getPostsSuccess, getPostsFail, getPostsReset } = postSlice.actions;

export default postSlice.reducer;