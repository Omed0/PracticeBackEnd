import { API } from '../../api/customAxios'
import { createAsyncThunk } from '@reduxjs/toolkit'


//register user
export const register = createAsyncThunk("auth/register", async (userData) => {
    try {
        const response = await API.post('/user/signup', userData)
        return response.data
    } catch (error) {
        return error.response.data.message
    }
})

//login user
export const login = createAsyncThunk("auth/login", async (userData) => {
    try {
        const response = await API.post('/user/signin', userData)
        return response.data
    } catch (error) {
        return error.response.data.message
    }
})


// export const fetchPosts = () => API.get('/post');
// export const createPost = (newPost) => API.post('/post', newPost);
// export const likePost = (id) => API.patch(`/post/${id}/likePost`);
// export const updatePost = (id, updatedPost) => API.patch(`/post/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/post/${id}`);

// export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
//     const response = await axios.get(BASE_URL)
//     console.log(response.data)
//     return response?.data
// })

// export const deletePost = createAsyncThunk("post/deletePost", async (initialPost) => {
//     const { id } = initialPost
//     try {
//         const response = await axios.delete(`${BASE_URL}/${id}`);
//         if (response?.status === 200) return initialPost;
//         return `${response.status} : ${response.statusText}`;
//     } catch (error) {
//         return error.message
//     }
// })
