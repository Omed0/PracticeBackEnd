import { createPost, getAllPosts, getCurrentPost, updateCurrentPost, deleteCurrentPost, getPostsFail } from "./postsSlice";
import * as api from '../../api/index.js'

//===================== POSTS =====================//
//create post
export const createNewPost = (postData) => async (dispatch) => {
    try {
        const { data } = await api.createBlog(postData);
        dispatch(createPost(data))
    } catch (error) {
        dispatch(getPostsFail(error.message))
    }
}

// fetch all posts
export const fetchPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchBlogs();
        dispatch(getAllPosts(data.blogs))
    } catch (error) {
        dispatch(getPostsFail(error.message))
    }
}

// fetch single post by id
export const specificPost = (id) => async (dispatch) => {
    try {
        const { data } = await api.specificBlog(id);
        dispatch(getCurrentPost(data.blog))
    } catch (error) {
        dispatch(getPostsFail(error.message))
    }
}

// update single post by id
export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
        const { data } = await api.updateBlog(id, updatedPost);
        dispatch(updateCurrentPost(data.updateBlog))
    } catch (error) {
        dispatch(getPostsFail(error.message))
    }
}

// delete single post by id
export const deletePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteBlog(id);
        dispatch(deleteCurrentPost(data.blog._id))
    } catch (error) {
        dispatch(getPostsFail(error.message))
    }
}
