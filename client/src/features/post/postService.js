import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/customAxios";


//===================== POSTS =====================//
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    try {
        const response = await API.get(`/blogs`);
        if (response?.status === 200) return response.data;
        return `${response.status} : ${response.statusText}`;
    }
    catch (error) {
        return error.message
    }
})

export const createPost = createAsyncThunk("post/createPost", async (initialPost) => {
    try {
        const response = await API.post(`/blogs`, initialPost);
        if (response?.status === 201) return response.data;
        return `${response.status} : ${response.statusText}`;
    } catch (error) {
        return error.message
    }
})

// fetch single post by id
export const specificPost = createAsyncThunk("post/specificPost", async (initialPost) => {
    const { id } = initialPost
    try {
        const response = await API.get(`blogs/${id}`);
        if (response?.status === 200) return response.data;
        return `${response.status} : ${response.statusText}`;
    } catch (error) {
        return error.message
    }
})

// delete single post by id
export const deletePost = createAsyncThunk("post/deletePost", async (initialPost) => {
    const { id } = initialPost
    try {
        const response = await API.delete(`blogs/${id}`);
        if (response?.status === 200) return initialPost;
        return `${response.status} : ${response.statusText}`;
    } catch (error) {
        return error.message
    }
})

// update single post by id
export const updatePost = createAsyncThunk("post/updatePost", async (initialPost) => {
    const { id } = initialPost
    try {
        const response = await API.patch(`blogs/${id}`, initialPost);
        if (response?.status === 200) return response.data;
        return `${response.status} : ${response.statusText}`;
    } catch (error) {
        return error.message
    }
})