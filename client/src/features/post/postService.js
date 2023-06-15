import { API } from "../../api/customAxios";
import { getAllPosts, getPostsFail, getCurrentPost } from "./postsSlice";

//===================== POSTS =====================//
//create post
export const createPost = (postData) => async (dispatch) => {
    try {
        const { data } = await API.post("/blog", postData);
        return data.message;
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}

// fetch all posts
export const fetchPosts = () => async (dispatch) => {
    try {
        const { data } = await API.get("/blog");
        dispatch(getAllPosts(data))
        return data.message;
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}

// fetch single post by id
export const specificPost = (id) => async (dispatch) => {
    try {
        const { data } = await API.get(`/blog/${id}`);
        dispatch(getCurrentPost(data))
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}

// update single post by id
export const updateBlog = (id, updatedPost) => async (dispatch) => {
    try {
        const { data } = await API.patch(`/blog/${id}`, updatedPost);
        return data.message;
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}

// delete single post by id
export const deleteBlog = (id) => async (dispatch) => {
    try {
        const { data } = await API.delete(`/blog/${id}`);
        return data.message;
    } catch (error) {
        dispatch(getPostsFail(error))
    }
}
