import { API } from "../../api/customAxios";
import { getPostsSuccess, getPostsFail, getSelectPost, getPostReset } from "./postsSlice";


//===================== POSTS =====================//
//create post
export const createPost = (postData) => async (dispatch) => {
    try {
        const { data } = await API.post("/blogs", postData);
        dispatch(getPostsSuccess(data))
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}

// fetch all posts
export const fetchPosts = () => async (dispatch) => {
    try {
        const { data } = await API.get("/blogs");
        dispatch(getPostsSuccess(data[1]))
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}

// fetch single post by id
export const specificPost = (id) => async (dispatch) => {
    try {
        const { data } = await API.get(`/blogs/${id}`);
        dispatch(getSelectPost(data))
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}

// delete single post by id
export const deletePost = (id) => async (dispatch) => {
    try {
        const { data } = await API.delete(`/blogs/${id}`);
        dispatch(getPostsSuccess(data))
        dispatch(getPostReset(data))
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}

// update single post by id
export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
        const { data } = await API.patch(`/blogs/${id}`, updatedPost);
        dispatch(getPostsSuccess(data))
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}